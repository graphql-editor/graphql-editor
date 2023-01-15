import {
  ParserField,
  createParserField,
  TypeDefinition,
} from 'graphql-js-tree';

const updateNodeByInterface =
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
      node.args[sameFieldInNode] = createParserField({ ...ia });
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
      console.log(
        nodeWithThisInterface.name,
        'Implements',
        updateInterfaceNode.name,
      );
      nodeWithThisInterface.args = nodeWithThisInterface.args
        .map((a) => {
          if (a.name !== fieldName || !a.fromInterface) return a;
          if (a.fromInterface.length === 1) return null;
          return {
            ...a,
            fromInterface: a.fromInterface.filter(
              (ai) => ai !== updateInterfaceNode.name,
            ),
          };
        })
        .filter(filterNotNull);
    });
};

export const updateInterfaceNode = (nodes: ParserField[], n: ParserField) => {
  const updateWithInterface = updateNodeByInterface(n);
  nodes
    .filter((n) => n.interfaces.includes(n.name))
    .forEach(updateWithInterface);
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
export const implementInterfaceOnNode = (
  nodes: ParserField[],
  node: ParserField,
  interfaceNode: ParserField,
) => {
  const interfacesToPush: string[] = [];
  computeConnectedInterfaces(nodes, [interfaceNode.name], interfacesToPush);
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
  const interfacesToDeImplement: string[] = [];
  computeConnectedInterfaces(nodes, [interfaceName], interfacesToDeImplement);
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

function filterNotNull<T>(t: T | null): t is T {
  return t !== null;
}
