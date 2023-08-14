export const mergedLibs = {
  code: `
	type Person{
		name: String!
		age: Int @deprecated
	}
`,
  libraries: `
    type Person{
        lastName: String
    }
    type Animal{
      kind: String
    }
    type Query{
      health: String
    }
    type Mutation{
      health: String
    }
`,
};
