import {
  getTypeName,
  ParserField,
  TypeSystemDefinition,
} from 'graphql-js-tree';
import * as d3 from 'd3';
import { WorkerEvents } from '@/worker/validation.worker';

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
}

export function storeCoordinates(
  nodes: NumberNode[],
  connections: NumberConnection[],
  iterations: number,
  alpha: number,
) {
  const simulation = d3
    .forceSimulation(nodes)
    .alpha(alpha)
    .force(
      'link',
      d3.forceLink(connections).id((d) => {
        return (d as NumberNode).id;
      }),
    )
    .force('x', d3.forceX().strength(0.1))
    .force('y', d3.forceY().strength(0.3))
    .force('collide', () => createCollisionForce(nodes)(1, 2))
    .stop();
  for (let i = 0; i < iterations; i++) {
    simulation.tick();
  }

  return simulation;
}

export const sortNodesTs = ({
  nodes,
  options: { existingNumberNodes, ignoreAlphaCalculation, alpha },
}: WorkerEvents['simulateSort']['args']) => {
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
    const nodeHeight = 67 + n.args.length * 27;
    const fieldLengths = Math.max(
      ...n.args.map((a) => {
        const fieldArguments = a.args;
        const fieldArgumentsLengths = fieldArguments.map(
          (fa) => fa.name.length + getTypeName(fa.type.fieldType).length,
        );
        const fieldArgumentCumulated = fieldArgumentsLengths.reduce(
          (a, b) => a + b,
          0,
        );
        return (
          (a.data.type !== TypeSystemDefinition.UnionMemberDefinition
            ? a.name.length
            : 0) +
          getTypeName(a.type.fieldType).length +
          fieldArgumentCumulated
        );
      }),
    );
    const nameLength = n.name.length + getTypeName(n.type.fieldType).length;
    const nodeWidth = Math.max(fieldLengths, nameLength) * 8.5 + 24;
    return {
      ...existingNode,
      height: nodeHeight,
      width: nodeWidth,
      id: n.id,
      parserField: n,
    } as NumberNode;
  });
  const connections: NumberConnection[] = [];
  const idempotentInsert = (n: ParserField, tname: string) => {
    const relatedNode = nodes.find((n) => n.name === tname);
    if (relatedNode) {
      if (relatedNode.id === n.id) return;
      if (
        connections.find(
          (c) => c.source === n.id && c.target === relatedNode.id,
        )
      ) {
        return;
      }
      if (
        connections.find(
          (c) => c.source === relatedNode.id && c.target === n.id,
        )
      ) {
        return;
      }
      connections.push({
        source: n.id,
        target: relatedNode.id,
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

  const a = removedAdded > 1 ? 1 : removedAdded === 1 ? 0.45 : modifyAlpha;

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
    (d) => d.y,
  );

  function force(alpha: number, iterations = 1) {
    for (let index = 0; index < iterations; index++) {
      for (const d of nodes) {
        quad.visit((q) => {
          let updated = false;
          if ('data' in q && q.data && q.data !== d) {
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
