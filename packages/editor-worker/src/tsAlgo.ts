import {
  getTypeName,
  ParserField,
  TypeSystemDefinition,
  compileType,
  TypeExtension,
} from "graphql-js-tree";
import * as d3 from "d3";
import { WorkerEvents } from "@/worker/validation.worker";

export interface NumberNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  index: number;
  parserField: ParserField;
}

export interface NumberConnection {
  source: string;
  target: string;
  connectionType?: string;
}

export function storeCoordinates(
  nodes: NumberNode[],
  connections: NumberConnection[],
  iterations: number,
  alpha: number
) {
  const simulation = d3
    .forceSimulation(nodes)
    .alpha(alpha)
    .force(
      "link",
      d3.forceLink(connections).id((d) => {
        return (d as NumberNode).id;
      })
    )
    .force("collide", () => createCollisionForce(nodes)(1, 2))
    .stop();
  for (let i = 0; i < iterations; i++) {
    simulation.tick();
  }

  return simulation;
}

export const sortNodesTs = ({
  nodes,
  options: {
    existingNumberNodes,
    ignoreAlphaCalculation,
    alpha,
    maxFields = Infinity,
    maxWidth = Infinity,
  },
}: WorkerEvents["simulateSort"]["args"]) => {
  let exisitingNodes = 0;
  let modifiedNodes = 0;
  const numberNodes = nodes.map((n) => {
    const existingNode = existingNumberNodes?.find((enn) => enn.id === n.id);
    if (existingNode) {
      exisitingNodes += 1;
      if (JSON.stringify(existingNode.parserField) !== JSON.stringify(n)) {
        modifiedNodes += 1;
      }
    }
    const fieldCount = Math.min(n.args.length, maxFields);
    const nodeHeight = 43 + fieldCount * 26 + 12;
    const fieldLengths =
      Math.max(
        ...n.args.map((a) => {
          const fieldArguments = a.args;
          const fieldArgumentsLengths = fieldArguments.map(
            (fa) => fa.name.length + compileType(fa.type.fieldType).length
          );
          const fieldArgumentCumulated = fieldArguments.length
            ? fieldArgumentsLengths.reduce((a, b) => a + b, 2)
            : 0;
          return (
            (a.data.type !== TypeSystemDefinition.UnionMemberDefinition
              ? a.name.length
              : 0) +
            compileType(a.type.fieldType).length +
            2 +
            fieldArgumentCumulated
          );
        })
      ) * 8;
    const nameLength =
      8 * (n.name.length + compileType(n.type.fieldType).length + 1);
    const nodeWidth = Math.min(Math.max(fieldLengths, nameLength), maxWidth);
    return {
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000),
      ...existingNode,
      height: nodeHeight,
      width: nodeWidth,
      id: n.id,
      parserField: n,
    } as NumberNode;
  });
  const connections: NumberConnection[] = [];
  const idempotentInsert = (n: ParserField, tname: string) => {
    const relatedNode = nodes.find(
      (n) =>
        n.name === tname && !Object.keys(TypeExtension).includes(n.data.type)
    );
    const interfaces = n.interfaces.map((interfaceName) =>
      nodes.find((n) => n.name === interfaceName)
    );
    const baseNodeForExtension =
      Object.keys(TypeExtension).includes(n.data.type) &&
      nodes.find(
        (baseNode) =>
          n.name === baseNode.name &&
          !Object.keys(TypeExtension).includes(baseNode.data.type)
      );
    if (relatedNode) {
      if (relatedNode.id === n.id) return;
      if (
        connections.find(
          (c) => c.source === n.id && c.target === relatedNode.id
        )
      ) {
        return;
      }
      if (
        connections.find(
          (c) => c.source === relatedNode.id && c.target === n.id
        )
      ) {
        return;
      }
      connections.push({
        source: n.id,
        target: relatedNode.id,
      });
    }
    for (const interfaceNode of interfaces) {
      if (interfaceNode) {
        if (interfaceNode.id === n.id) return;
        if (
          connections.find(
            (c) => c.source === n.id && c.target === interfaceNode.id
          )
        ) {
          return;
        }
        if (
          connections.find(
            (c) => c.source === interfaceNode.id && c.target === n.id
          )
        ) {
          return;
        }
        connections.push({
          source: n.id,
          target: interfaceNode?.id,
          connectionType: "interface",
        });
      }
    }
    if (baseNodeForExtension) {
      if (baseNodeForExtension.id === n.id) return;
      if (
        connections.find(
          (c) => c.source === n.id && c.target === baseNodeForExtension.id
        )
      ) {
        return;
      }
      if (
        connections.find(
          (c) => c.source === baseNodeForExtension.id && c.target === n.id
        )
      ) {
        return;
      }
      connections.push({
        source: n.id,
        target: baseNodeForExtension?.id,
        connectionType: "extend",
      });
    }
  };
  for (const n of nodes) {
    n.args.forEach((a) => {
      idempotentInsert(n, getTypeName(a.type.fieldType));
      a.args.forEach((aa) => {
        idempotentInsert(n, getTypeName(aa.type.fieldType));
      });
    });
  }
  const removedAdded = Math.abs(exisitingNodes - numberNodes.length);

  const modifyAlpha = modifiedNodes / numberNodes.length;

  const a =
    removedAdded > 1
      ? 1
      : removedAdded === 1
      ? 1 / numberNodes.length
      : modifyAlpha;

  const retAlpha = a;

  return {
    numberNodes,
    connections,
    alpha: ignoreAlphaCalculation ? (alpha ? alpha : retAlpha) : retAlpha,
  };
};
export function createCollisionForce(nodes: NumberNode[]) {
  const padding = 200;
  const quad = d3.quadtree(
    nodes,
    (d) => d.x,
    (d) => d.y
  );

  function force(alpha: number, iterations = 1) {
    for (let index = 0; index < iterations; index++) {
      for (const d of nodes) {
        quad.visit((q) => {
          let updated = false;
          if ("data" in q && q.data && q.data !== d) {
            let x = d.x - q.data.x,
              y = d.y - q.data.y,
              l,
              lx,
              ly;
            const xSpacing = padding + (q.data.width + d.width) / 2,
              ySpacing = padding + (q.data.height + d.height) / 2,
              absX = Math.abs(x),
              absY = Math.abs(y);

            if (absX < xSpacing && absY < ySpacing) {
              l = Math.sqrt(x * x + y * y);

              lx = (absX - xSpacing) / l;
              ly = (absY - ySpacing) / l;

              // the one that's barely within the bounds probably triggered the collision
              if (Math.abs(lx) > Math.abs(ly)) {
                lx = 0;
              } else {
                ly = 0;
              }
              d.x -= x *= lx * alpha;
              d.y -= y *= ly * alpha;
              q.data.x += x;
              q.data.y += y;

              updated = true;
            }
          }
          return updated;
        });
      }
    }
  }

  return force;
}

export const calcDimensions = (numberNodes: NumberNode[]) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  numberNodes.forEach((pn) => {
    const lastMinX = pn.x - pn.width;
    const lastMinY = pn.y - pn.height;
    if (lastMinX < minX) {
      minX = lastMinX;
    }
    if (lastMinY < minY) {
      minY = lastMinY;
    }
    const lastMaxX = pn.x + pn.width;
    const lastMaxY = pn.y + pn.height;
    if (lastMaxX > maxX) {
      maxX = lastMaxX;
    }
    if (lastMaxY > maxY) {
      maxY = lastMaxY;
    }
  });
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};
