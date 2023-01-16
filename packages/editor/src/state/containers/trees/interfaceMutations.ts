import { filterNotNull } from '@/state/containers/trees/shared';
import {
  ParserField,
  createParserField,
  TypeDefinition,
} from 'graphql-js-tree';

const updateNodeByInterfaceAddField =
  (interfaceNode: ParserField) => (node: ParserField) => {
    interfaceNode.args.forEach((ia) => {
      const sameFieldInNode = node.args.findIndex((na) => na.name === ia.name);
      if (sameFieldInNode === -1) {
        node.args.push(
          createParserField({
            ...ia,
            fromInterface: [interfaceNode.name],
          }),
        );
        return;
      }
    });
  };

export const deleteFieldFromInterface = (
  nodes: ParserField[],
  updatedInterfaceNode: ParserField,
  fieldName: string,
) => {
  nodes
    .filter((n) => n.interfaces.includes(updatedInterfaceNode.name))
    .forEach((nodeWithThisInterface) => {
      nodeWithThisInterface.args = nodeWithThisInterface.args
        .map((a) => {
          if (a.name !== fieldName || !a.fromInterface) return a;
          if (a.fromInterface.length === 1) return null;
          return {
            ...a,
            fromInterface: a.fromInterface.filter(
              (ai) => ai !== updatedInterfaceNode.name,
            ),
          };
        })
        .filter(filterNotNull);
    });
};

export const updateInterfaceNodeAddField = (
  nodes: ParserField[],
  interfaceNode: ParserField,
) => {
  const updateWithInterface = updateNodeByInterfaceAddField(interfaceNode);
  nodes
    .filter((n) => n.interfaces.includes(interfaceNode.name))
    .forEach(updateWithInterface);
};
const replaceField =
  (oldField: ParserField, newField: ParserField) => (node: ParserField) => {
    const fieldToChange = node.args.findIndex(
      (na) => na.name === oldField.name,
    );
    const argToChange = node.args[fieldToChange];
    if (node.args[fieldToChange] && argToChange.fromInterface) {
      node.args[fieldToChange] = createParserField({
        ...newField,
        fromInterface: [...argToChange.fromInterface],
      });
    }
  };

export const changeInterfaceField = (
  nodes: ParserField[],
  interfaceNode: ParserField,
  oldField: ParserField,
  newField: ParserField,
) => {
  const updateWithOldField = replaceField(oldField, newField);
  nodes
    .filter((n) => n.interfaces.includes(interfaceNode.name))
    .forEach(updateWithOldField);
};

export const renameInterfaceNode = (
  nodes: ParserField[],
  newName: string,
  oldName: string,
) => {
  nodes
    .filter((n) => n.interfaces.includes(oldName))
    .forEach((n) => {
      n.interfaces = n.interfaces
        .filter((i) => i !== oldName)
        .concat([newName]);
      n.args.forEach((a) => {
        a.fromInterface = a.fromInterface
          ?.filter((fi) => fi !== oldName)
          .concat([newName]);
      });
    });
};
const getAllConnectedInterfaces = (
  nodes: ParserField[],
  interfaces: string[],
) => {
  const computedInterfaces: string[] = [];
  const computeConnectedInterfaces = (
    nodes: ParserField[],
    interfaces: string[],
    interfacesToPush: string[],
  ) => {
    const allInterfaces = nodes.filter(
      (ni) => ni.data.type === TypeDefinition.InterfaceTypeDefinition,
    );
    interfacesToPush.push(
      ...interfaces.filter((ii) => !interfacesToPush.includes(ii)),
    );
    for (const i of interfaces) {
      const hasInterface = allInterfaces.find(
        (interfaceObject) => interfaceObject.name === i,
      )!;
      if (hasInterface?.interfaces && hasInterface.interfaces.length) {
        computeConnectedInterfaces(
          nodes,
          hasInterface.interfaces,
          interfacesToPush,
        );
      }
    }
  };
  computeConnectedInterfaces(nodes, interfaces, computedInterfaces);
  return computedInterfaces;
};
export const implementInterfaceOnNode = (
  nodes: ParserField[],
  node: ParserField,
  interfaceNode: ParserField,
) => {
  const interfacesToPush = getAllConnectedInterfaces(nodes, [
    interfaceNode.name,
  ]);
  node.interfaces.push(...interfacesToPush);
  const argsToPush =
    interfaceNode.args?.filter(
      (a) => !node.args?.find((na) => na.name === a.name),
    ) || [];
  node.args = node.args.map((a) => {
    if (
      interfaceNode.args.find((interfaceArg) => interfaceArg.name === a.name)
    ) {
      return {
        ...a,
        fromInterface: (a.fromInterface || []).concat([interfaceNode.name]),
      };
    }
    return a;
  });
  node.args = node.args?.concat(
    argsToPush.map((atp) => ({
      ...atp,
      fromInterface: [interfaceNode.name],
    })),
  );
};

export const deImplementInterfaceOnNode = (
  nodes: ParserField[],
  node: ParserField,
  interfaceName: string,
) => {
  const interfacesToDeImplement = getAllConnectedInterfaces(nodes, [
    interfaceName,
  ]);
  node.interfaces = node.interfaces.filter(
    (ni) => !interfacesToDeImplement.includes(ni),
  );
  node.args = node.args
    .map((a) => {
      if (!a.fromInterface?.length) return a;
      a.fromInterface = a.fromInterface.filter(
        (fi) => !interfacesToDeImplement.includes(fi),
      );
      if (a.fromInterface.length === 0) return null;
      return a;
    })
    .filter(filterNotNull);
};

export const deleteInterfaceExtensionNode = (
  nodes: ParserField[],
  node: ParserField,
) => {};

export const deleteInterfaceNode = (
  nodes: ParserField[],
  node: ParserField,
) => {};
