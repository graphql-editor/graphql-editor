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
	upsertRecurringExpense(
		expense: RecurringExpenseInput!
		id: String!
	): RecurringExpense!
	upsertRecurringIncome(
		income: RecurringIncomeInput!
		id: String!
	): RecurringIncome!
	createInvoice(
		invoice: InvoiceInput!
	): Invoice!
	upsertInvoice(
		invoice: InvoiceInput!
		invoiceId: String!
	): Invoice!
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
	invoices(
		"""
	Pass time between
	"""
	time: TimeFilter
	): [Invoice!]!
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
}

type Query{
	companies: [Company!]
	company(
		id: String
	): CompanyQueries
	sources: [Source!]
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
	recurrs: RecurringPeriod!
	startDate: String!
	endDate: String
	amount: Int!
	source: String!
}

enum RecurringPeriod{
	YEAR
	WEEK
	DAY
	MONTH
}

"""
Source of income and expense<br>
"""
type Source{
	name: String!
}

input TimeFilter{
	fromDate: String!
	toDate: String
}

"""
Invoice file<br>with extraDetails<br>
"""
type Invoice{
	payee: Source
	total: Float!
	description: String
	name: String
	paid: Boolean
	createdAt: String
	dueDate: String
}

input InvoiceInput{
	total: Float
	description: String
	name: String
	sourceId: String!
	paid: Boolean
	dueDate: String
}
schema{
	query: Query,
	mutation: Mutation
}
`;
