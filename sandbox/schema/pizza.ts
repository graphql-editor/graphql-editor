export const pizza = `# graphqleditor.com

# graphqleditor.com

# graphqleditor.com

# graphqleditor.com

# graphqleditor.com

# graphqleditor.com

type Query{
	pizzas: [Pizza!]
}

type Pizza{
	name: String!
	ingredients: [Ingredient!]
	image: S3Object
}

type Ingredient{
	name: String!
	price: Int!
}

type Mutation{
	addPizza(
		name: String!
		ingredientIds: [String!]
	): Pizza
	addIngredient(
		ingredient: createIngredient
	): Ingredient
}

input createIngredient{
	name: String!
	price: Int!
}
schema{
	query: Query,
	mutation: Mutation
}`;
export const pizzaLibrary = `scalar S3Object`;
