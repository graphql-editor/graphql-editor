export const pizza = `

type Query{
	pizzas: [Pizza!]
}

type Pizza implements Nameable & Imaged{
	name: String!
	ingredients: [Ingredient!]
	image: S3Object
}

interface Nameable{
	name: String!
}
interface Imaged{
	name: String!
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
