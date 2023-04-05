export const billabeeSchema = `
type Query{
	userQuery: UserQuery
	memberQuery(
		teamId: String!
	): MemberQuery
	adminMemberQuery(
		teamId: String!
	): AdminMemberQuery
	publicQuery: PublicQuery
}

type Mutation{
	publicMutation: PublicMutation
	"""
	mutation for loggegd users
	"""
	userMutation: UserMutation
	"""
	mutation for logged admins
	"""
	adminMemberMutation(
		teamId: String!
	): AdminMemberMutation
	"""
	mutation for logged team members
	"""
	memberMutation(
		teamId: String!
	): MemberMutation
	"""
	entry point for Weebhooks.
	"""
	webhook: String
}

type MemberMutation{
	createVacation(
		vacation: CreateVacation!
	): String
	deleteVacation(
		_id: String!
	): Boolean!
	logOps(
		_id: String!
	): UserLogOps
	logTimeOrEdit(
		log: CreateOrUpdateLog!
	): Boolean!
	logTime(
		log: [CreateLog!]!
	): [String!]
}

type AdminMemberMutation{
	"""
	gei users generateInviteToken
	"""
	generateInviteToken(
		"""
		string format mm/dd/rrrr
		"""
		tokenOptions: InviteTokenInput!
	): GenerateInviteTokenResponse!
	removeUserFromTeam(
		data: RemoveUserFromTeamInput!
	): RemoveUserFromTeamResponse!
	sendInvitationToTeam(
		invitation: SendTeamInvitationInput!
	): SendInvitationToTeamResponse!
	deleteInviteToken(
		id: String!
	): Boolean!
	createClient(
		createClient: CreateClient!
	): String!
	createProject(
		createProject: CreateProject!
	): String!
	clientOps(
		id: String!
	): ClientOps
	projectOps(
		id: String!
	): ProjectOps
	userOps(
		id: String!
	): UserOps
	deleteVacation(
		_id: String!
	): Boolean!
	confirmVacation(
		_id: String!
	): Boolean!
	createHourlyBilling(
		billing: CreateHourlyBilling!
	): String!
	createFixedBilling(
		billing: CreateFixedBilling!
	): String!
	hourlyBillingOps(
		id: String!
	): HourlyBillingOps
	fixedBillingOps(
		id: String!
	): FixedBillingOps
	editAccount(updateAccount:UpdateAccontInput!): UpdateUserResponse!
	generateBillingPortal(
		returnUrl: String!
	): String!
	generateCheckoutSession(
		productIds: [String!]!
		success_url: String!
		cancel_url: String!
	): String!
}

input ChangePasswordWithTokenInput{
	username: String!
	forgotToken: String!
	newPassword: String!
}

input ChangePasswordWhenLoggedInput{
	username: String!
	oldPassword: String!
	newPassword: String!
}

type StripeProduct{
	product_id: String!
	price_id: String!
	name: String!
	description: String
	interval: String!
	interval_count: Int
	price_value: String
	currency: String
	trial_period_days: Int
}

type Client implements Node & Archivable{
	_id: String!
	name: String!
	email: String
	projects: [Project!]!
	createdAt: DateTime!
	updatedAt: DateTime!
	archivedAt: DateTime
	teamId: String!
	involvedUsers: Int
}

type ClientOps{
	remove: Boolean
	update(
		clientUpdate: ClientUpdate
	): Boolean
	archive: Boolean
	unArchive: Boolean
}

type FixedBilling implements Node & Billing{
	_id: String!
	project: Project
	value: Float!
	currency: Currency!
	createdAt: DateTime!
	updatedAt: DateTime!
	teamId: String!
}

type FixedBillingOps{
	remove: Boolean
	update(
		billingUpdate: UpdateFixedBilling
	): Boolean
}

type HourlyBilling implements Node & Billing{
	_id: String!
	project: Project!
	"""
	User of an admin account who logs time
	"""
	user: User!
	value: Float!
	createdAt: DateTime!
	updatedAt: DateTime!
	currency: Currency!
	archivedAt: DateTime
	teamId: String!
}

type HourlyBillingOps{
	remove: Boolean
	update(
		billingUpdate: UpdateHourlyBilling
	): Boolean
	refreshBillable(
		from: Date
	): Boolean
}

type InviteToken{
	token: String!
	expires: String!
	domain: String!
	owner: String!
	teamId: String
	_id: String!
}


input SendTeamInvitationInput{
	username: String!
	teamId: String!
}

input RemoveUserFromTeamInput{
	userId: String!
	teamId: String!
}

type Project implements Node & Archivable{
	_id: String!
	name: String!
	client: Client!
	createdAt: DateTime!
	updatedAt: DateTime!
	archivedAt: DateTime
	color: Colors
	teamId: String!
	private: Boolean
	typeBilling: TypeBilling
	amountUsers: [String!]
	tasks: [String!]
}

type ProjectOps{
	remove: Boolean!
	update(
		projectUpdate: ProjectUpdate!
	): Boolean!
	archive: Boolean!
	unArchive: Boolean!
	addTask(
		task: String!
	): Boolean!
	removeTask(
		task: String!
	): Boolean!
	addAmountUser(
		_id: String!
	): Boolean!
	removeAmountUser(
		_id: String!
	): Boolean!
}

input RegisterInput{
	username: String!
	password: String!
	invitationToken: String
	nickname: String!
}

type PublicMutation{
	register(
		user: RegisterInput!
	): RegisterResponse!
	verifyEmail(
		verifyData: VerifyEmailInput!
	): VerifyEmailResponse!
	changePasswordWhenLogged(
		changePasswordData: ChangePasswordWhenLoggedInput!
	): ChangePasswordWhenLoggedResponse!
	changePasswordWithToken(
		token: ChangePasswordWithTokenInput!
	): ChangePasswordWithTokenResponse!
	integrateSocialAccount(
		userData: SimpleUserInput!
	): IntegrateSocialAccountResponse!
	
}

input ProviderLoginInput{
	code: String!
}

type ProviderLoginQuery{
	apple: ProviderResponse
	github: ProviderResponse
	google: ProviderResponse
	microsoft: ProviderResponse
}

input SimpleUserInput{
	username: String!
	password: String!
}

input VerifyEmailInput{
	token: String!
}

type PublicQuery{
	login: LoginQuery!
	getGoogleOAuthLink(
		setup: GetOAuthInput!
	): String!
	getMicrosoftOAuthLink(
		setup: GetOAuthInput!
	): String!
	getGithubOAuthLink(
		setup: GetOAuthInput!
	): String!
	getAppleOAuthLink(
		setup: GetOAuthInput!
	): String!
	requestForForgotPassword(
		username: String!
	): Boolean!
}

input GetOAuthInput{
	scopes: [String]
	state: String
}

type MemberQuery{
	logs(
		dateFilter: DateFilter
		logsFilter: MemberLogsFilter
	): [TimeLog]!
	projects(filter: ProjectsFilterInput): [Project]!
	projectById(
		_id: String!
	): Project!
	users: [User]!
	userById(
		_id: String!
	): User!
	myVacations(
		dateFilter: DateFilter!
	): [Vacation!]!
}

enum InvitationTeamStatus{
	Waiting
	Taken
}

type InvitationTeamToken{
	teamId: String!
	recipient: String!
	status: InvitationTeamStatus!
	_id: String!
	teamName: String!
}

type AdminMemberQuery{
	billingById(
		_id: String!
	): Billing!
	billings: [Billing!]!
	clientById(
		_id: String!
	): Client!
	clients(filter: ClientsFilterInput):  [Client!]!
	logs(
		dateFilter: DateFilter!
		adminFilter: AdminFilter
	): [TimeLog!]!
	vacations(
		dateFilter: DateFilter!
		users: [String!]
	): [Vacation!]!
	showTeamInvitations(
		sentFromMyTeam: Boolean
		status: InvitationTeamStatus
	): [InvitationTeamToken!]!
	showInviteTokens:  [InviteToken!]!
	getStripeProducts: [StripeProduct!]
}

input ClientsFilterInput{
	filterDate: DateFilter
	filterClients: String
	sort: SortInput
}

input ProjectsFilterInput{
	filterDate: DateFilter
	filterClients: String
	sort: SortInput
}

input SortInput{
	field: SortField!
	"""
	True for ASC, false for DESC
	"""
	order: Boolean!
}

enum SortField{
	CREATED_AT
	CLIENT_NAME
	PROJECT_NAME
}




input FileInput{
	filename: String!
	contentType: String!
}

"""
Time log of a user time
"""
type TimeLog implements Node{
	_id: String!
	date: Date!
	user: User!
	"""
	How many minutes from the date are logged
	"""
	minutes: Int!
	description: String
	project: Project!
	task: String
	createdAt: DateTime!
	updatedAt: DateTime!
	billable: TimeLogBilled
	archivedAt: DateTime
	start: Time
	addBill: Boolean
	teamId: String!
}

"""
Stripe subscription with it's fields
"""
type Subscription{
	_id: String!
	scubscriptionId: String!
	customerId: String!
	status: String!
	currency: String!
	amount: Int!
	cancelAtPeriodEnd: Boolean!
	canceledAt: Int
	billingPeriodEnds: Int!
	username: String!
	productId: String!
	name: String!
}

type Team{
	_id: String!
	name: String!
	owner: String
	members: [TeamMember!]!
    customerId: String
	role: String
	email: String
}

type TeamMember{
	_id: String!
	username: String!
}

type UserMember{
	user: User!
	team: Team!
}

"""
User of an admin account who logs time
"""
type User{
	_id: String!
	"""
	to jest email
	"""
	username: String!
	nickname: String!
	"""
	User of an admin account who logs time
	"""
	userHourlySystem: HourlySystem!
	archivedAt: DateTime
	avatarUrl: String
	teams: [Team!]!
	adminIn: [String!]!
	emailConfirmed: Boolean!
}

type UserMutation{
	"""
	gei users joinToTeam
	"""
	joinToTeam(
		teamId: String!
	): JoinToTeamResponse!
	"""
	gei users joinToTeamWithInvitationToken
	"""
	joinToTeamWithInvitationToken(
		token: String!
	): JoinToTeamWithInvitationTokenResponse!
	"""
	gei users createTeam
	"""
	createTeam(
		teamName: String!
	): CreateTeamResponse!
	"""
	gei users editUser
	"""
	editUser(
		updatedUser: UpdateUserInput!
	): UpdateUserResponse!
	changeHourlySystem(
		hourlySystem: HourlySystem!
	): Boolean!
	squashAccounts(
		password: String
	): SquashAccountsResponse!
}

input UpdateUserInput{
	nickname: String
	avatar: FileInput
}

input UpdateAccontInput{
	name: String
	logo: FileInput
}

type UserOps{
	remove: Boolean!
	archive: Boolean!
	unArchive: Boolean!
	addAdmin: Boolean!
	delAdmin: Boolean!
	createVacation(
		vacation: CreateVacation!
	): String
	
}

type UserQuery{
	me: User!
	showTeamInvitations(
		status: InvitationTeamStatus!
	): [InvitationTeamToken!]!
}

input AdminFilter{
	user_ids: [String!]
	client_ids: [String!]
	project_ids: [String!]
	asCurrency: Currency
}

input MemberLogsFilter{
	client_ids: [String!]
	project_ids: [String!]
	billability: Boolean
	description: String
}

input ClientUpdate{
	name: String
	email: String
	projects: [String!]
}

input CreateClient{
	name: String!
	email: String
}

input CreateFixedBilling{
	value: Float!
	currency: Currency!
	project: String!
}

input UpdateFixedBilling{
	value: Float
	currency: Currency
	project: String
}

input CreateHourlyBilling{
	value: Float!
	currency: Currency!
	project: String!
	user: String!
}

input CreateOrUpdateLog{
	_id: String
	minutes: Int!
	date: Date!
	project: String!
	task: String
	description: String
	start: Time
	addBill: Boolean
}

input CreateLog{
	"""
	How many minutes from the date are logged
	"""
	minutes: Int!
	date: Date!
	project: String!
	task: String
	description: String
	start: Time
	addBill: Boolean
}

input UpdateHourlyBilling{
	value: Float
	currency: Currency
	project: String
	user: String
}

input CreateProject{
	name: String!
	client: String!
	color: Colors
	private: Boolean
	typeBilling: TypeBilling
}

input DateFilter{
	from: Date!
	to: Date
}

input InviteTokenInput{
	expires: DateTime
	domain: String
	teamId: String
}

input LoginInput{
	username: String!
	password: String!
}

type LoginQuery{
	password(
		user: LoginInput!
	): LoginResponse!
	provider(
		params: ProviderLoginInput!
	): ProviderLoginQuery!
}

type LoginResponse{
	login: String
	hasError: LoginErrors
}

input ProjectUpdate{
	name: String
	client: String
	color: Colors
	private: Boolean
	typeBilling: TypeBilling
}

input RegisterAccount{
	"""
	to nazwa firmy
	"""
	name: String!
	"""
	to unikalna nazwa usera
	"""
	nickname: String!
	password: String!
	"""
	to jest email
	"""
	username: String!
}

input RegisterUserAccount{
	"""
	to jest email
	"""
	username: String!
	password: String!
	invitationToken: String!
}

"""
string format "rrrr-mm-dd"
"""
scalar Date

scalar DateTime

"""
bi
"""
interface Billing{
	project: Project
	value: Float!
	currency: Currency!
	teamId: String!
}

interface Node{
	_id: String!
	createdAt: DateTime!
	updatedAt: DateTime!
}

type RegisterResponse{
	hasError: RegisterErrors
	registered: Boolean
}

enum Currency{
	PLN
	EUR
	USD
}

enum RegisterErrors{
	INVITE_DOMAIN_INCORRECT
	LINK_EXPIRED
	PASSWORD_WEAK
	USERNAME_EXISTS
	USERNAME_INVALID
	INVITE_TOKEN_NOT_FOUND
}


type UserLogOps{
	delete: Boolean
	update(
		log: UpdateLog!
	): Boolean
}

input UpdateLog{
	"""
	How many minutes from the date are logged
	"""
	minutes: Int
	date: Date
	project: String
	description: String
	start: Time
	addBill: Boolean
	task: String
}

type TimeLogBilled{
	amountBilled: Float!
	currency: Currency!
}

input TimeLogBilledInput{
	amountBilled: Float!
	currency: Currency!
}

interface Archivable{
	archivedAt: DateTime
}

"""
12:00
"""
scalar Time

input CreateVacation{
	date: String!
}

type Vacation{
	createdAt: String!
	updatedAt: String!
	administrable: Boolean
	confirmed: Boolean
	_id: String!
	user: User!
	date: String!
	team: String!
}

enum ProviderErrors{
	CANNOT_RETRIVE_PROFILE_FROM_GOOGLE_TRY_REFRESH_TOKEN
	CANNOT_FIND_EMAIL_FOR_THIS_PROFIL
	CANNOT_RETRIVE_USER_INFORMATION_FROM_APPLE
	CODE_IS_NOT_EXIST_IN_ARGS
	CANNOT_RETRIVE_SUB_FIELD_FROM_JWT_TOKEN
	CANNOT_RETRIVE_TOKEN_FROM_MICROSOFT
}

type ProviderResponse{
	"""
	same value as accessToken, for delete in future, 
	improvise, adapt, overcome, frontend!
	"""
	jwt: String
	accessToken: String
	refreshToken: String
	providerAccessToken: String
	"""
	field describes whether this is first login attempt for this username
	"""
	register: Boolean
	hasError: ProviderErrors
}

type UpdateUserResponse{
	putUrl: String
	update: Boolean!
}

type FileUploadResponse{
	fileKey: String!
	putUrl: String!
}

enum LoginErrors{
	CONFIRM_EMAIL_BEFOR_LOGIN
	INVALID_LOGIN_OR_PASSWORD
	CANNOT_FIND_CONNECTED_USER
	YOU_PROVIDED_OTHER_METHOD_OF_LOGIN_ON_THIS_EMAIL
}

enum HourlySystem{
	_12
	_24
}

enum Colors{
_81D5E7
_00C3EC
_F57C78
_EC5E59
_33FF91
_40D437
_FCFF7C
_D4E208
_FFA160
_F47421
_7C68F4
_8290FF
_F56BB0
_E74C99
_F6C375
_FAA219
}

enum TypeBilling{
	FIXED
	HOURLY
}

enum VerifyEmailError{
	TOKEN_CANNOT_BE_FOUND
}

type VerifyEmailResponse{
	result: Boolean
	hasError: VerifyEmailError
}

enum ChangePasswordWhenLoggedError{
	CANNOT_CHANGE_PASSWORD_FOR_USER_REGISTERED_VIA_SOCIAL
	OLD_PASSWORD_IS_INVALID
	PASSWORD_WEAK
}

type ChangePasswordWhenLoggedResponse{
	result: Boolean
	hasError: ChangePasswordWhenLoggedError
}

enum ChangePasswordWithTokenError{
	CANNOT_CHANGE_PASSWORD_FOR_USER_REGISTERED_VIA_SOCIAL
	TOKEN_IS_INVALID
	PASSWORD_IS_TOO_WEAK
}

type ChangePasswordWithTokenResponse{
	result: Boolean
	hasError: ChangePasswordWithTokenError
}

enum GenerateInviteTokenError{
	YOU_ARE_NOT_THE_OWNER_OF_A_TEAM_OR_TEAM_DOES_NOT_EXIST
}

type GenerateInviteTokenResponse{
	result: String
	hasError: GenerateInviteTokenError
}

enum RemoveUserFromTeamError{
	YOU_ARE_NOT_THE_OWNER_OF_A_TEAM_OR_TEAM_DOES_NOT_EXIST
	YOU_CANNOT_KICK_YOURSELF_FROM_THE_TEAM
	USER_NOT_FOUND
}

type RemoveUserFromTeamResponse{
	result: Boolean
	hasError: GenerateInviteTokenError
}

enum SendInvitationToTeamError{
	USER_ALREADY_HAS_YOUR_INVITATION
	YOU_CANNOT_SEND_INVITATION_TO_YOURSELF
	USER_IS_NOT_OWNER_OF_THE_TEAM
	CANNOT_FIND_USER
	USERNAME_IS_TOO_AMBIGUOUS
}

type SendInvitationToTeamResponse{
	result: Boolean
	hasError: SendInvitationToTeamError
}

enum JoinToTeamError{
	TEAM_INVITATION_DOES_NOT_EXIST_OR_CAPTURED
	MEMBER_ALREADY_EXISTS_IN_THE_TEAM
}

type JoinToTeamResponse{
	result: Boolean
	hasError: JoinToTeamError
}

enum CreateTeamError{
	TEAM_NOT_CREATED
}

type CreateTeamResponse{
	result: String
	hasError: CreateTeamError
}

enum SquashAccountsError{
	YOU_HAVE_ONLY_ONE_ACCOUNT
	YOUR_ACCOUNTS_DO_NOT_HAVE_CONFIRMED_EMAIL
	INCORRECT_PASSWORD
}

type SquashAccountsResponse{
	result: Boolean
	hasError: SquashAccountsError
}

enum JoinToTeamWithInvitationTokenError{
	INVITATION_TOKEN_NOT_FOUND
	TEAM_IN_INVITATION_TOKEN_NOT_SPECIFIED
	MEMBER_ALREADY_EXISTS_IN_THE_TEAM
	INVITATION_TOKEN_EXPIRED
}

type JoinToTeamWithInvitationTokenResponse{
	result: Boolean
	hasError: JoinToTeamWithInvitationTokenError
}

enum IntegrateSocialAccountError{
	YOU_HAVE_ONLY_ONE_ACCOUNT
	YOUR_ACCOUNT_DOES_NOT_HANDLE_CHANGE_PASSWORD_MODE
	INCORRECT_PASSWORD
	CANNOT_FIND_USER
	YOUR_ACCOUNT_DOES_NOT_HAVE_CONFIRMED_EMAIL
}

type IntegrateSocialAccountResponse{
	result: Boolean
	hasError: IntegrateSocialAccountError
}


enum MustBeTeamMemberError{
	USER_IS_NOT_A_TEAM_MEMBER
	TEAM_DOES_NOT_EXIST
	USER_IS_NOT_A_TEAM_ADMIN
	ONLY_OWNER_CAN_REMOVE_ADMIN
}
schema{
	query: Query,
	mutation: Mutation,
	subscription: Subscription
}`;
