import { Maybe, RuleKind, State } from "graphql-language-service";

const findPrevState = (
  state: State
):
  | Maybe<string>
  | Maybe<{ operation: "Query" | "Mutation" | "Subscription" }>
  | undefined => {
  const allowedKinds: RuleKind[] = [
    "ObjectTypeDef",
    "InterfaceDef",
    "InputDef",
    "EnumDef",
    "UnionDef",
    "DirectiveDef",
    "ExtendDef",
  ];
  if (state.kind) {
    if (allowedKinds.includes(state.kind)) {
      return state.name;
    }
  }
  if (
    state.kind === "Query" ||
    state.kind === "Mutation" ||
    state.kind === "Subscription"
  ) {
    return { operation: state.kind };
  }
  if (state.prevState) {
    return findPrevState(state.prevState);
  }
};

export const findCurrentNodeName = (state: State) => {
  return findPrevState(state);
};
