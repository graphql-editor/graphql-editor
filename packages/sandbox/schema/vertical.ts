export const verticalSchema = `
type Question implements Node{
	content: String!
	invertScale: Boolean
	_id: String!
}

enum AnswerEnum{
	STRONGLY_AGREE
	SOMEWHAT_AGREE
	NEUTRAL
	SOMEWHAT_DISAGREE
	STRONGLY_DISAGREE
}

type Survey implements Node{
	name: String!
	surveyBlocks: [SurveyBlock!]!
	_id: String!
}

type Answer implements Node{
	toQuestion: Question!
	value: AnswerEnum!
	_id: String!
}

type SurveyResult implements Node{
	answers: [Answer!]!
	_id: String!
}

type AdminMutation{
	surveyOps(
		_id: String!
	): SurveyOps
	createSurvey(
		survey: CreateSurvey!
	): String
}

type QuestionOps{
	update: String
	delete: String
}

type SurveyBlock implements Node{
	survey(
		_id: String!
	): Survey
	name: String!
	questions: [Question!]
	_id: String!
}

type AdminQuery{
	surveys: [Survey!]
	survey(
		_id: String!
	): Survey
	results: [SurveyResult!]
}

type Query{
	admin: AdminQuery
	client: ClientQuery
}

type Mutation{
	admin: AdminMutation
}

type SurveyOps{
	update: String
	delete: String
	createSurveyBlock(
		surveyBlock: CreateSurveyBlock!
	): String
	surveyBlockOps(
		_id: String!
	): SurveyBlockOps
}

type SurveyBlockOps{
	update: String
	delete: String
	createQuestion: String
	questionOps(
		_id: String!
	): QuestionOps
}

input CreateSurvey{
	name: String!
}

input UpdateSurvey{
	name: String!
}

interface Node{
	_id: String!
}

input CreateSurveyBlock{
	name: String!
}

input UpdateSurveyBlock{
	name: String
}

input CreateQuestion{
	content: String!
	invertScale: Boolean
}

input UpdateQuestion{
	content: String
	invertScale: Boolean
}

type ClientQuery{
	getSurvey(
		_id: String!
	): Survey
	getResult(
		_id: String!
	): SurveyResult
}

type ClientMutation{
	submitAnswer(
		surveyResultId: String!
		questionId: String!
		answer: AnswerEnum!
	): String
}
schema{
	query: Query,
	mutation: Mutation
}
`;
