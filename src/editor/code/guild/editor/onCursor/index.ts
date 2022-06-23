import { Maybe, RuleKind, State } from 'graphql-language-service';

const findPrevState = (state: State): Maybe<string> | undefined => {
  const allowedKinds: RuleKind[] = [
    'ObjectTypeDef',
    'InterfaceDef',
    'InputDef',
    'EnumDef',
    'UnionDef',
    'DirectiveDef',
    'ExtendDef',
  ];
  if (state.kind) {
    if (allowedKinds.includes(state.kind)) {
      return state.name;
    }
  }
  if (state.prevState) {
    return findPrevState(state.prevState);
  }
};

export const findCurrentNodeName = (state: State) => {
  return findPrevState(state);
};
