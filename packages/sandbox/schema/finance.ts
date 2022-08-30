export const finance = `
input CampanyInput{
	name: String!
}

type Company{
	expenses: [Expense!]
	id: ID
	incomes: [Income!]
	name: String!
}

type CompanyMutations{
	createExpense(
		expense: ExpenseInput!
	): Expense!
	createIncome(
		income: IncomeInput!
	): Income!
	createInvoice(
		invoice: InvoiceInput!
	): Invoice!
	createRecurringExpense(
		expense: RecurringExpenseInput!
	): RecurringExpense!
	createRecurringIncome(
		income: RecurringIncomeInput!
	): RecurringIncome!
	"""
	Removes company from database<br>            
	"""
	remove: Boolean!
	removeExpense(
		id: String!
	): Boolean!
	removeIncome(
		id: String!
	): Boolean!
	removeRecurringExpense(
		id: String!
	): Boolean!
	removeRecurringIncome(
		id: String!
	): Boolean!
	updateCompany(
		company: CampanyInput!
	): Company!
	upsertExpense(
		expense: ExpenseInput!
		id: String!
	): Expense!
	upsertIncome(
		income: IncomeInput!
		id: String!
	): Income!
	upsertInvoice(
		invoice: InvoiceInput!
		invoiceId: String!
	): Invoice!
	upsertRecurringExpense(
		expense: RecurringExpenseInput!
		id: String!
	): RecurringExpense!
	upsertRecurringIncome(
		income: RecurringIncomeInput!
		id: String!
	): RecurringIncome!
}

type CompanyQueries{
	"""
	expenses in period of time<br>
	"""
	expenses(
		time: TimeFilter
	): [Expense!]!
	"""
	incomes in period of time
	"""
	incomes(
		time: TimeFilter
	): [Income!]!
	invoices(
		"""
		Pass time between
		"""
		time: TimeFilter
	): [Invoice!]!
	"""
	recurring expenses in period of time<br>
	"""
	recurringExpenses(
		time: TimeFilter
	): [RecurringExpense!]!
	"""
	recurring incomes in period of time
	"""
	recurringIncomes(
		time: TimeFilter
	): [RecurringIncome!]!
	sources: [Source!]!
}

type Expense{
	amount: Int!
	"""
	date when expense should be classified<br>
	"""
	date: String!
	id: ID!
	source: Source!
}

input ExpenseInput{
	date: String!
	source: String!
	amount: Int!
}

type Income{
	amount: Int!
	"""
	Date when income should be classified
	"""
	date: String!
	id: ID!
	paid: Boolean
	source: Source!
}

input IncomeInput{
	date: String!
	amount: Int!
	paid: Boolean
	source: String!
}

"""
Invoice file<br>with extraDetails<br>
"""
type Invoice{
	createdAt: String
	description: String
	dueDate: String
	name: String
	paid: Boolean
	payee: Source
	total: Float!
}

input InvoiceInput{
	total: Float
	description: String
	name: String
	sourceId: String!
	paid: Boolean
	dueDate: String
}

type Mutation{
	addSource(
		name: String!
	): Source!
	"""
	Return company operations for logged in user
	"""
	company(
		id: String!
	): CompanyMutations
	createCompany(
		company: CampanyInput!
	): Company!
	removeSource(
		name: String!
	): Boolean!
	users: UserMutation
}

type Query{
	companies: [Company!]
	company(
		id: String
	): CompanyQueries
	sources: [Source!]
	users: UserQuery
}

type RecurringExpense{
	amount: Int!
	endDate: String
	id: ID!
	recurrs: RecurringPeriod!
	source: Source!
	startDate: String!
}

input RecurringExpenseInput{
	startDate: String!
	endDate: String
	amount: Int!
	source: String!
	recurrs: RecurringPeriod!
}

type RecurringIncome{
	amount: Int!
	endDate: String
	id: ID!
	recurrs: RecurringPeriod!
	source: Source!
	startDate: String!
}

input RecurringIncomeInput{
	startDate: String!
	endDate: String
	amount: Int!
	source: String!
	recurrs: RecurringPeriod!
}

enum RecurringPeriod{
	YEAR
	WEEK
	DAY
	MONTH
}

"""
Source of income and expense
"""
type Source{
	name: String!
}

input TimeFilter{
	fromDate: String!
	toDate: String
}
schema{
	query: Query,
	mutation: Mutation
}
`;
