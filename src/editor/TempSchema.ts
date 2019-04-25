export const TempSchema = `
type Team{
	"""
	Team name
	"""
	name : String!
	"""
	type object node
	"""
	members : [Member!]
	"""
	ID object node
	"""
	ID : ID
}

"""
type object node
"""
type Member{
	"""
	String object node
	"""
	nickname : String!
	"""
	ID object node
	"""
	ID : ID
}

"""
input object node
"""
input createTeam{
	"""
	String object node
	"""
	name : String!
}

"""
input object node
"""
input updateTeam{
	"""
	String object node
	"""
	name : String
	"""
	String object node
	"""
	teamId : String!
}

"""
input object node
"""
input addTeamMember{
	"""
	String object node
	"""
	nickname : String!
	"""
	String object node
	"""
	teamId : String!
	"""
	enum object node
	"""
	role : role!
}

"""
enum object node
"""
enum role{
	"""
	EnumValue object node
	"""
	OWNER,
	"""
	EnumValue object node
	"""
	ADMIN,
	"""
	EnumValue object node
	"""
	EDITOR,
	"""
	EnumValue object node
	"""
	VIEWER
}

"""
input object node
"""
input removeTeamMember{
	"""
	String object node
	"""
	nickname : String!
	"""
	String object node
	"""
	teamId : String!
}

"""
input object node
"""
input removeTeam{
	"""
	String object node
	"""
	teamId : String!
}

"""
input object node
"""
input updateTeamMember{
	"""
	String object node
	"""
	teamId : String!
	"""
	enum object node
	"""
	role : role
	"""
	String object node
	"""
	nickname : String
}

"""
type object node
"""
type TeamOps{
	"""
	type object node
	"""
	addMember(member:addTeamMember) : Member
	"""
	type object node
	"""
	updateMember(member:updateTeamMember) : Member
	"""
	Boolean object node
	"""
	removeMember(member:removeTeamMember) : Boolean
	"""
	type object node
	"""
	updateTeam(team:updateTeam) : Team
	"""
	Boolean object node
	"""
	removeTeam(team:removeTeam) : Boolean
}

`;
