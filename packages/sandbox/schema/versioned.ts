export const versionedUsersLibraryLatest = `
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
`;
export const versionedUsersLibrary01 = `
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
}

"""
All mutations of users system
"""
type UserMutation{
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
`;
