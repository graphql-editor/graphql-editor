export const googleDirections = `
# GraphQL from graph at:
# graphqleditor.com

type Query{
	_: Boolean
	users: [User!]
	direction(
		coordinates: PlaceCoordinatesInput!
		travelMode: AllowTravelModes!
	): Direction
}

type User{
	id: ID!
	username: String!
	email: String!
}

input PlaceCoordinatesInput{
	startLat: Float!
	startLng: Float!
	endLat: Float!
	endLng: Float!
}

enum AllowTravelModes{
	transit
	driving
	walking
}

type Direction{
	fare: Fare
	tripData: TripData!
	steps: [StepNode!]
}

type Fare{
	currency: String!
	formattedFare: String!
	fareValue: Float!
}

type TripData{
	arrival: PointDetails!
	departure: PointDetails!
	tripDistance: TypedData!
	tripDuration: TypedData!
}

union PointDetails = TransitPointDetails | OtherPointDetails

type TransitPointDetails{
	formatedTime: String!
	timeZone: String!
	timeValue: Int!
	address: String!
	location: Coords!
}

type Coords{
	latitude: Float!
	longitude: Float!
}

type OtherPointDetails{
	address: String!
	location: Coords!
}

type TypedData{
	formattedValue: String!
	rawValue: Int!
}

interface StepNode{
	stepTravelMode: String!
	stepDistance: TypedData!
	stepDuration: TypedData!
	startLocation: Coords!
	endLocation: Coords!
	polyline: String!
	stepInstruction: String!
}

type Mutation{
	_: Boolean
	signUp(
		username: String!
		email: String!
		password: String!
	): User!
	signIn(
		email: String!
		password: String!
	): Token!
	updateUser(
		username: String
	): Boolean!
}

type Token{
	token: String!
}

type Subscription{
	_: Boolean
}

enum CacheControlScope{
	PUBLIC
	PRIVATE
}

scalar Date

type DriveStep implements StepNode{
	stepTravelMode: String!
	stepDistance: TypedData!
	stepDuration: TypedData!
	startLocation: Coords!
	endLocation: Coords!
	polyline: String!
	stepInstruction: String!
	maneuver: String
}

type TransitData{
	headSign: String!
	tripName: String!
	url: String
	tripShortName: String
	stopsCount: Int
	vehicleIcon: String!
	vehicleName: String!
	vehicleType: String!
}

type TransitStep implements StepNode{
	stepTravelMode: String!
	stepDistance: TypedData!
	stepDuration: TypedData!
	startLocation: Coords!
	endLocation: Coords!
	polyline: String!
	stepInstruction: String!
	arrival: TransitPointDetails!
	departure: TransitPointDetails!
	transitData: TransitData!
}

scalar Upload

type WalkStep implements StepNode{
	stepTravelMode: String!
	stepDistance: TypedData!
	stepDuration: TypedData!
	startLocation: Coords!
	endLocation: Coords!
	polyline: String!
	stepInstruction: String!
	walkSteps: [WalkStep!]
}

directive @rateLimit(
	max: Int
	window: String
	message: String
	identityArgs: [String]
	arrayLengthField: String
) on FIELD_DEFINITION

directive @authentication on OBJECT | FIELD_DEFINITION

directive @cacheControl(
	maxAge: Int
	scope: CacheControlScope
) on FIELD_DEFINITION | OBJECT | INTERFACE
schema{
	query: Query,
	mutation: Mutation,
	subscription: Subscription
}
`;
