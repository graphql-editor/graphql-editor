export const usersLibraryNew = `
"""
All queries of users system
"""
type UserQuery{
	"""
	Log user in
	"""
	login(
		user: UserBasicData!
	): LoggedInData
	"""
	Check if logged in user is admin<br>
	"""
	isAdmin: Boolean
	"""
	Check if there is admin already
	"""
	isAdminClaimPossible: Boolean
}

"""
All mutations of users system
"""
type UserMutation{
	"""
	Make user a superadmin on a first call. Then you need to be an admin to call this
	"""
	makeAdmin(
		"""
		username of admin user<br>
		"""
		username: String!
	): Boolean
	"""
	Register a new user<br>
	"""
	register(
		user: UserBasicData!
	): LoggedInData
}

type LoggedInData{
	token: String
}

input UserBasicData{
	username: String!
	password: String!
}

input NewInput {
	hello: String!
	bye: String!
}

directive @aws_api_key on FIELD_DEFINITION | OBJECT
directive @aws_iam on FIELD_DEFINITION | OBJECT
directive @aws_oidc on FIELD_DEFINITION | OBJECT
directive @aws_lambda on FIELD_DEFINITION | OBJECT
directive @aws_cognito_user_pools(cognito_groups: [String!]) on FIELD_DEFINITION | OBJECT
directive @aws_auth(cognito_groups: [String!]!) on FIELD_DEFINITION
directive @aws_subscribe(mutations: [String!]) on FIELD_DEFINITION
directive @key(name: String, fields: [String!]!, queryField: String) repeatable on OBJECT
directive @default(value: String) on FIELD_DEFINITION
`;
