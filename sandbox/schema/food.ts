export const food = `"""
Tenant of the foodeli app
"""
type Tenant{
	name: String!
	"""
	Unique username of the owner.
	"""
	ownerUsername: String!
	"""
	Checks if tenant already has user account
	"""
	hasAccount: Boolean
	"""
	Tenant radius for base delivery fee in meters
	"""
	radius: Int
	address: Address!
	location: PureLocation!
	phone: String
}

"""
All queries for tenant and members<br>
"""
type TenantQuery{
	restaurant: RestaurantQuery
	driver: DriverQuery
	admin: AdminQuery
	"""
	internal tenant query
	"""
	tenant: TenantBaseQuery
	"""
	internal developer query
	"""
	developer: DeveloperQuery
}

type Query{
	"""
	entry point for queries for every tenant<br>
	"""
	tenant: TenantQuery
	owner: OwnerQuery
	"""
	User actions here
	"""
	users: UserQuery
	"""
	manage access
	"""
	access: AccessQuery
	public: PublicQuery
}

type Mutation{
	"""
	entry point for mutations for every tenant<br>
	"""
	tenant: TenantMutation
	"""
	Mutations for administrator of the whole system
	"""
	owner: OwnerMutation
	"""
	User mutation actions like register etc...
	"""
	users: UserMutation
    """
	entry point for public mutations.
	"""
    publicMutation: PublicMutation
}

"""
All mutations for tenant and members<br>
"""
type TenantMutation{
	restaurant: RestaurantMutation
	driver: DriverMutation
	admin: AdminMutation
	"""
	Internal tenant mutations
	"""
	tenant: TenantBaseMutation
	"""
	internal developer mutation
	"""
	developer: DeveloperMutation
    publicMutation: PublicMutation
}

type OwnerMutation{
	addTenant(
		tenant: CreateTenant!
	): Boolean
	removeTenant(
		tenant: OwnerUsernameInput!
	): Boolean
	editTenant(
		tenant: UpdateTenant!
	): Boolean
}

"""
Queries for the administrator of the whole system
"""
type OwnerQuery{
	tenants(
		userFilter: UserActivityFilter
	): [Tenant!]!
	reports: OwnerReportsQuery
}

input CreateTenant{
	name: String!
	ownerUsername: String!
	address: AddressAddInput!
	phone: String
}

input UpdateTenant{
	name: String
	ownerUsername: String!
	address: AddressUpdateInput
	phone: String
}

"""
All roles available around the system
"""
enum Role{
	OWNER
	ADMIN
	RESTAURANT
	DRIVER
	COORDINATOR
}

"""
Query the access of the user to the app
"""
type AccessQuery{
	"""
	Return roles of the user
	"""
	roles: [Role!]!
}

type PublicQuery{
	"""
	Query can only be runned by admins and restaurants
	"""
	suggestAddress(
		"""
		Google maps params as described [here](https://github.com/googlemaps/google-maps-services-js) 
		"""
		maps: GoogleMapsParams!
	): [String!]!
	tenants: [TenantInfo!]!
	"""
	Cities in system
	"""
	cities: [String!]!
}

input GoogleMapsParams{
	"""
	query input to search
	"""
	input: String!
	"""
	radius around location
	"""
	radius: Int
	"""
	Language of the response
	"""
	language: GoogleMapsLanguage
	"""
	location to search around
	"""
	location: String
}

enum GoogleMapsLanguage{
	"""
	Polish
	"""
	pl
	"""
	English
	"""
	en
}

type TenantBaseMutation{
	"""
	Change base radius of a tenant
	"""
	changeRadius(
		"""
		Radius in meters
		"""
		radius: Int!
	): Boolean
}

type TenantBaseQuery{
	me: Tenant!
}

type OwnerReportsQuery{
	ownerOrderReport(
		timeFilter: TimeFilter!
	): [OwnerOrderReport!]!
}

type OwnerOrderReport{
	createdAt: Date!
	tenantName: String!
}

"""
public
Type used for displaying the publicly available tenant info
"""
type TenantInfo{
	name: String!
	restaurants: [RestaurantInfo!]!
}

"""
Publicly available info about restaurant
"""
type RestaurantInfo{
	name: String!
	phone: String!
	address: Address!
}

"""
Input for newsletter registraion
"""
input RegisterNewsletter{
	email: String!
}

"""
Public mutations for landing page mainly
"""

input RegisterRestaurant{
    name: String!
	restaurantName: String
    tenant: String
	email: String!
    NIP: String!
	phone: String!
	address: AddressAddInput!
    bankAccountNumber: String!
    managerPhone: String
    additionalInfo: String
    cashOnly: Boolean
    city: String!
}

input RegisterDriver{
	firstName: String!
    lastName: String!
    tenant: String
	birthDate: String
	email: String!
	phone: String!
    PESEL: String!
    address: AddressAddInput!
    ownCar: Boolean
    city: String!
}

input RegisterTenant{
	name: String!
	email: String!
	phone: String!
	address: String!
    city: String!
}

type PublicMutation{

	registerAsRestaurant(
		registerRestaurant: RegisterRestaurant!
	): Boolean
	registerAsTenant(
		registerTenant: RegisterTenant!
	): Boolean
	registerAsDriver(
		registerDriver: RegisterDriver!
	): Boolean
    registerNewsletter(
        registerEmail: RegisterNewsletter!
    ): Boolean
}

schema{
	query: Query,
	mutation: Mutation
}
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
	forgotPassword(
		username: String!
	): Boolean
	resetPassword(
		reset: ResetPassword!
	): Boolean
	changePassword(
		changePassword: ChangePassword!
	): LoggedInData!
}

type LoggedInData{
	token: String
}

input UserBasicData{
	username: String!
	password: String!
}

"""
Reset password details
"""
input ResetPassword{
	"""
	token received from email
	"""
	token: String!
	"""
	New password for the user
	"""
	newPassword: String!
}

input ChangePassword{
	password: String!
	newPassword: String!
}

type Driver implements Dated{
	deliveryRate: Int!
	PESEL: String
	credentials: Person!
	createdAt: Date!
	ownerUsername: String!
	"""
	If the driver is archived this is the archiving date
	"""
	archivedAt: Date
	locations(
		period: TimeFilter!
	): [LocationData!]!
	lastLocation: LocationData
	"""
	Is driver working now
	"""
	active: Boolean
	"""
	Determines if driver has account in foodeli system
	"""
	hasAccount: Boolean
	pushToken: String
}

input DriverAddInput{
	deliveryRate: Int!
	PESEL: String
	credentials: PersonAddInput!
	ownerUsername: String!
}

input DriverUpdateInput{
	deliveryRate: Int
	PESEL: String
	credentials: PersonUpdateInput
	ownerUsername: String!
}

"""
Main type for Restaurant
## Primary key
As a primary key we will use user username
"""
type Restaurant implements Dated & Addressed{
	name: String!
	phone: String!
	createdAt: Date!
	address: Address!
	"""
	Fee restaurant have to pay for the delivery of an order
	"""
	deliveryFee: Int!
	"""
	Username of the owner and primary key
	"""
	ownerUsername: String!
	"""
	If the restaurant is archived this is the archiving date
	"""
	archivedAt: Date
	"""
	Fee per each kilometer if order is to be delivered outside the base zone
	"""
	deliveryPerKmFee: Int!
	"""
	Determines if restaurant has account in foodeli system
	"""
	hasAccount: Boolean
	open: [OpeningHours!]!
	"""
	Fee paid by restaurant if driver has to wait for the order longer than 5 minutes
	"""
	parkingFee: Int!
	"""
	Driver have to pay when in restaurant for the order
	"""
	cashOnly: Boolean
	NIP: String
	bankAccountNumber: String
	managerPhone: String
	additionalInfo: String
}

"""
Details of the restaurant visible to developer
"""
type DeveloperRestaurant implements Addressed{
	name: String!
	phone: String!
	address: Address!
	"""
	Username of the owner and primary key
	"""
	ownerUsername: String!
	open: [OpeningHours!]!
}

input RestaurantAddInput{
	name: String!
	phone: String!
	address: AddressAddInput!
	deliveryFee: Int!
	ownerUsername: String!
	"""
	Fee per each kilometer if order is to be delivered outside the base zone
	"""
	deliveryPerKmFee: Int!
	parkingFee: Int!
	cashOnly: Boolean
	NIP: String!
	bankAccountNumber: String!
	managerPhone: String
	additionalInfo: String
}

input RestaurantUpdateInput{
	name: String
	phone: String
	address: AddressUpdateInput
	deliveryFee: Int
	ownerUsername: String!
	"""
	Fee per each kilometer if order is to be delivered outside the base zone
	"""
	deliveryPerKmFee: Int
	parkingFee: Int
	cashOnly: Boolean
	NIP: String
	bankAccountNumber: String
	managerPhone: String
	additionalInfo: String
}

"""
Universal Person Credentials
"""
type Person{
	firstName: String!
	phone: String!
	lastName: String!
	"""
	extra details
	"""
	details: String
	"""
	person address
	"""
	address: Address
}

input PersonAddInput{
	firstName: String!
	phone: String!
	lastName: String!
	"""
	extra details
	"""
	details: String
	address: AddressAddInput
}

input PersonUpdateInput{
	firstName: String
	phone: String
	lastName: String
	"""
	extra details
	"""
	details: String
	address: AddressUpdateInput
}

type DriverQuery{
	"""
	List of active orders to take<br>
	"""
	openOrders: [Order!]!
	"""
	Orders currently delivered by driver
	"""
	myOrders: [Order!]!
	"""
	History of all driver orders
	"""
	historyOrders(
		period: TimeFilter
	): [Order!]!
	"""
	Get details of an order
	"""
	orderDetails(
		order: OrderDetailsInput!
	): Order!
	"""
	Info about current logged in driver
	"""
	me: Driver!
	mySchedule(
		timeFilter: TimeFilter!
	): [DriverWorkSchedule!]!
	supportDetails: SupportDetails!
}

"""
Main thing here. Order is responsible for all the data about it
"""
type Order implements Addressed{
	id: ObjectId!
	"""
	Driver delivering order
	"""
	driver: Driver
	"""
	extra details of an order
	"""
	extraDetails: String
	total: Int!
	createdAt: Date!
	restaurant: Restaurant!
	"""
	Time at restaurant will be ready to give the order to driver
	"""
	readyAt: Date
	"""
	Time driver arrives to take order from restaurant
	"""
	driverArrives: Date
	address: Address!
	status: OrderStatus!
	payment: PaymentType!
	"""
	Delivery is left in front of the door.
	"""
	contactLess: Boolean
	"""
	Time needed to go from restaurant to client location
	"""
	time: Int
	"""
	Distance from client to restaurant
	"""
	distance: Int
	"""
	If the order is settled there should be admin user owner username here if not it should remain empty
	"""
	settled: String
	"""
	Number to the client
	"""
	clientPhoneNumber: String
	"""
	price for the delivery paid by restaurant to the tenant
	"""
	deliveryPrice: Int!
	"""
	determines if driver is late
	"""
	driverLate: Boolean
	"""
	the order is bigger than usually
	"""
	bigOrder: Boolean
	"""
	Delivery should be made on certain hour and is received before
	"""
	deliveryOnHour: Boolean
	parkingFee: Int
}

"""
Order as visible for developer integration
"""
type DeveloperOrder{
	id: ObjectId!
	"""
	extra details of an order
	"""
	extraDetails: String
	status: OrderStatus!
	payment: PaymentType!
	"""
	Delivery is left in front of the door.
	"""
	contactLess: Boolean
	"""
	determines if driver is late
	"""
	driverLate: Boolean
	"""
	the order is bigger than usually
	"""
	bigOrder: Boolean
	restaurant: DeveloperRestaurant!
	address: Address!
	createdAt: Date!
}

type RestaurantQuery{
	"""
	Orders for preparation<br>
	"""
	openOrders(
		period: TimeFilter!
	): [Order!]!
	"""
	Get details of an order
	"""
	orderDetails(
		order: OrderDetailsInput!
	): Order!
	"""
	Estimate the cost of delivery
	"""
	estimateDelivery(
		address: AddressAddInput!
	): DeliveryCostResponse!
	menu: MenuQuery
	"""
	Get all order status changes together with its location
	"""
	orderStatusHistory(
		order: OrderDetailsInput!
	): [OrderStatusChange!]!
	checkOrderLoad: OrderLoad!
	"""
	Returns logged in restaurant details
	"""
	me: Restaurant!
	supportDetails: SupportDetails!
	historyOrdersFromToday: [Order!]!
}

type DriverMutation{
	"""
	take order from open orders<br>
	"""
	takeOrder(
		order: TakeOrder!
	): Boolean
	"""
	change status of active order
	"""
	changeOrderStatus(
		change: ChangeOrderStatus!
	): Boolean
	"""
	send current location
	"""
	sendLocation(
		location: LocationInput!
	): Boolean
	"""
	register for push notifications<br>
	"""
	registerPush(
		push: PushRegisterInput!
	): String
	"""
	Driver declares they will be late for order
	"""
	lateForOrder(
		orderId: ObjectId!
		minutesLate: Int!
	): Boolean
	"""
	Call this if driver is online
	"""
	activate: Boolean
	"""
	Call this to take driver offline
	"""
	deactivate: Boolean
}

type Address{
	street: String!
	unit: String!
	flat: String
	city: String
	country: String
	location: PureLocation
}

enum OrderStatus{
	"""
	Waiting to be authorised by restaurant
	"""
	OPEN
	"""
	Waiting for driver
	"""
	WAITING
	"""
	Driver has taken an order
	"""
	TAKEN
	"""
	Driver is at restaurant
	"""
	RESTAURANT
	"""
	Driver is at client
	"""
	CLIENT
	"""
	Order is delivered
	"""
	DELIVERED
	"""
	Restaurant cancelled this order
	"""
	RESTAURANT_CANCELLED
	"""
	Driver left restauration and is driving to client
	"""
	DRIVINGCLIENT
	NOT_DELIVERED
	DISCOUNT
}

input OrderDetailsInput{
	id: ObjectId!
}

input TimeFilter{
	from: Date!
	to: Date
}

scalar Date

interface Dated{
	createdAt: Date!
}

type RestaurantMutation{
	addOrder(
		order: RestaurantAddOrder!
	): Boolean
	authoriseOrder(
		order: OrderDetailsInput!
	): Boolean
	menu: MenuMutation
	setOpeningHours(
		openingHours: UpdateOpeningHours!
	): Boolean
	cancelOrder(
		order: OrderDetailsInput!
	): Boolean
}

input OrderAddInput{
	total: Int!
	"""
	Restaurant owner username
	"""
	restaurant: String!
	extraDetails: String
	address: AddressAddInput!
	readyAt: Date
	"""
	Specify payment type
	"""
	payment: PaymentType!
	"""
	Number to the client
	"""
	clientPhoneNumber: String
	"""
	contactless delivery
	"""
	contactLess: Boolean
	"""
	Big order package
	"""
	bigOrder: Boolean
	deliveryOnHour: Boolean
}

type AdminMutation{
	addRestaurant(
		"""
		restaurant to be added
		"""
		restaurant: RestaurantAddInput!
	): Boolean
	addDriver(
		driver: DriverAddInput!
	): Boolean
	removeRestaurant(
		restaurant: OwnerUsernameInput!
	): Boolean
	removeDriver(
		driver: OwnerUsernameInput!
	): Boolean
	addOrder(
		order: OrderAddInput!
	): Boolean
	updateDriver(
		driver: DriverUpdateInput!
	): Boolean
	updateRestaurant(
		restaurant: RestaurantUpdateInput!
	): Boolean
	updateOrder(
		order: OrderUpdateInput!
	): Boolean
	"""
	Force assign driver to existing order 
	"""
	assignDriverToOrder(
		"""
		Provide driver and order id
		"""
		assign: ForceDriverAssign!
	): Boolean
	"""
	archive the driver who is no longer served by the tenant
	"""
	archiveDriver(
		driver: OwnerUsernameInput!
	): Boolean
	"""
	archive the restaurant which is no longer served by tenant
	"""
	archiveRestaurant(
		restaurant: OwnerUsernameInput!
	): Boolean
	unArchiveRestaurant(
		restaurant: OwnerUsernameInput!
	): Boolean
	unArchiveDriver(
		driver: OwnerUsernameInput!
	): Boolean
	"""
	create vehicle in database
	"""
	addVehicle(
		vehicle: CreateVehicle!
	): Boolean
	"""
	update vehicle in database
	"""
	updateVehicle(
		vehicle: UpdateVehicle!
	): Boolean
	"""
	remove vehicle from database
	"""
	removeVehicle(
		vehicle: RemoveVehicle!
	): Boolean
	"""
	create vehicle note in database
	"""
	addVehicleNote(
		vehicleNote: CreateVehicleNote!
	): Boolean
	"""
	update vehicle note in database
	"""
	updateVehicleNote(
		vehicleNote: UpdateVehicleNote!
	): Boolean
	"""
	remove vehicle note from database
	"""
	removeVehicleNote(
		vehicleNote: RemoveVehicleNote!
	): Boolean
	settleOrder(
		order: OrderDetailsInput!
	): Boolean
	removeOrder(
		order: OrderDetailsInput!
	): Boolean
	"""
	add developer integration
	entry
	"""
	addDeveloper(
		developer: CreateDeveloper!
	): Boolean
	"""
	Remove developer entry
	"""
	removeDeveloper(
		developer: DeveloperDetails!
	): Boolean
	setDeveloperRestaurants(
		restaurants: SetDeveloperRestaurants!
	): Boolean
	addCoordinator(
		coordinatorAddInput: CoordinatorAddInput!
	): Boolean
	updateCoordinator(
		coordinatorUpdateInput: CoordinatorUpdateInput!
		ownerUsernameInput: OwnerUsernameInput!
	): Boolean
	removeCoordinator(
		ownerUsernameInput: OwnerUsernameInput!
	): Boolean
	addDriverWorkSchedule(
		createDriverWorkSchedule: CreateDriverWorkSchedule!
	): Boolean
	updateDriverWorkSchedule(
		detailsDriverWorkSchedule: DetailsDriverWorkSchedule!
		updateDriverWorkSchedule: UpdateDriverWorkSchedule!
	): Boolean
	removeDriverWorkSchedule(
		detailsDriverWorkSchedule: DetailsDriverWorkSchedule!
	): Boolean
	"""
	set support details singleton settings. 
	"""
	setSupportDetails(
		updateSupportDetails: UpdateSupportDetails!
	): Boolean
	"""
	Remove forms mutation
	"""
	removeDriverForm(
		driverFormInput: removeByEmail!
	): Boolean
	removeRestaurantForm(
		restaurantFormInput: removeByEmail!
	): Boolean
}

interface Addressed{
	address: Address!
}

input AddressAddInput{
	street: String!
	unit: String!
	flat: String
}

input AddressUpdateInput{
	street: String!
	unit: String!
	flat: String
}

input LocationInput{
	latitude: Float!
	longitude: Float!
}

"""
Delivery cost response based on address<br>
"""
type DeliveryCostResponse{
	cost: Int
	canBeDelivered: Boolean!
}

type AdminQuery{
	listRestaurants(
		userFilter: UserActivityFilter
	): [Restaurant!]!
	listDrivers(
		userFilter: UserActivityFilter
	): [Driver!]!
	orders(
		filter: AdminOrderFilter
	): [Order!]!
	"""
	Get single restaurant
	"""
	restaurant(
		restaurant: OwnerUsernameInput!
	): Restaurant
	"""
	get single driver
	"""
	driver(
		driver: OwnerUsernameInput!
	): Driver
	"""
	Get order details
	"""
	order(
		order: OrderDetailsInput!
	): Order
	listVehicles: [Vehicle!]!
	listVehicleNotes: [VehicleNote!]!
	"""
	list added developer integrations
	"""
	listDevelopers: [Developer!]!
	listCoordinators: [Coordinator!]!
	coordinator(
		ownerUsernameInput: OwnerUsernameInput!
	): Coordinator
	schedules(
		timeFilter: TimeFilter!
	): [DriverWorkSchedule!]!
	supportDetails: SupportDetails!
	driverFormResponses: [DriverFormResponse!]
	restaurantFormResponses: [RestaurantFormResponse!]
	tenantFormResponses: [TenantFormResponse!]
	listNewsletters: [Newsletter!]!
}

input DeveloperOrderFilter{
	"""
	Period
	"""
	period: TimeFilter
	"""
	restaurant owner username
	"""
	restaurant: String
	status: [OrderStatus!] = []
	payment: PaymentType
}

input AdminOrderFilter{
	"""
	Period
	"""
	period: TimeFilter
	"""
	restaurant owner username
	"""
	restaurant: String
	"""
	driver owner username
	"""
	driver: String
	status: [OrderStatus!] = []
	payment: PaymentType
}

input OrderUpdateInput{
	id: ObjectId!
	extraDetails: String
	readyAt: String
	restaurant: String
	driver: String
	total: Int
	address: AddressUpdateInput
	status: OrderStatus
	payment: PaymentType
	driverArrives: Date
	settled: String
	"""
	Number to the client
	"""
	clientPhoneNumber: String
	contactLess: Boolean
	bigOrder: Boolean
	deliveryOnHour: Boolean
}

input ForceDriverAssign{
	"""
	Driver owner username
	"""
	driver: String!
	orderId: ObjectId!
}

input OwnerUsernameInput{
	ownerUsername: String!
}

input RestaurantAddOrder{
	total: Int!
	extraDetails: String
	address: AddressAddInput!
	"""
	Specify payment type
	"""
	payment: PaymentType!
	"""
	Number to the client
	"""
	clientPhoneNumber: String
	"""
	When the order will be ready
	"""
	readyIn: Int!
	"""
	contactless delivery
	"""
	contactLess: Boolean
	"""
	Big order package
	"""
	bigOrder: Boolean
	deliveryOnHour: Boolean
}

enum PaymentType{
	"""
	Order is paid by client on delivery
	"""
	CASH_ON_DELIVERY
	"""
	Order is paid by client by card on delivery
	"""
	CARD_ON_DELIVERY
	"""
	Order is already paid by other platform
	"""
	PAID_TO_RESTAURANT
	"""
	Order is paid online
	"""
	ONLINE_PAYMENT
}

type Vehicle{
	registrationId: String!
	name: String!
}

type VehicleNote{
	"""
	vehicle note is about
	"""
	vehicle: Vehicle!
	"""
	date of note
	"""
	date: Date!
	"""
	course of the vehicle at the moment
	"""
	course: Int!
	"""
	describe what happened with vehicle at this date
	"""
	note: String!
}

type LocationData{
	longitude: Float!
	latitude: Float!
	createdAt: Date!
}

input ChangeOrderStatus{
	status: OrderStatus!
	orderId: ObjectId!
	location: LocationInput
}

input isArchived{
	archived: Boolean!
}

"""
Location without creation date
"""
type PureLocation{
	latitude: Float!
	longitude: Float!
}

"""
When Order status is changed it is registered in the database for further reading.
"""
type OrderStatusChange implements Dated{
	status: OrderStatus!
	order: Order!
	createdAt: Date!
	location: PureLocation
}

"""
Current system load. 
"""
enum OrderLoad{
	"""
	We will deliver orders right after delivery
	"""
	LOW
	"""
	The load is higher, but still things going normal
	"""
	NORMAL
	"""
	The load is higher so you can expect longer time of delivery
	"""
	HIGH
	"""
	You can expect delivery time very close to maximum delivery time
	"""
	OVERLOAD
}

input TakeOrder{
	orderId: ObjectId!
	location: LocationInput!
	"""
	driver will take order X minutes from now
	"""
	minutesFromNow: Int!
}

input CreateVehicle{
	name: String!
	registrationId: String!
}

input UpdateVehicle{
	name: String
	"""
	Get vehicle to update name
	"""
	registrationId: String!
}

input RemoveVehicle{
	name: String!
}

input CreateVehicleNote{
	vehicleName: String!
	"""
	date of note
	"""
	date: Date!
	"""
	course of the vehicle at the moment
	"""
	course: Int!
	note: String!
}

input UpdateVehicleNote{
	vehicleName: String!
	"""
	date of note
	"""
	date: Date
	"""
	course of the vehicle at the moment
	"""
	course: Int
	note: String
}

input RemoveVehicleNote{
	vehicleName: String!
}

"""
Universal input for filtering users( Drivers, Restaurants, Tenants ) based on their status in system
"""
input UserActivityFilter{
	isArchived: isArchived
	hasAccount: Boolean
}

enum Week{
	MONDAY
	TUESDAY
	WEDNESDAY
	THURSDAY
	FRIDAY
	SATURDAY
	SUNDAY
}

type OpeningHours{
	day: Week!
	from: String!
	to: String!
}

"""
Internal input for update day
"""
input UpdateDay{
	from: String!
	to: String!
	day: Week!
}

input UpdateOpeningHours{
	days: [UpdateDay!]! = []
}

input PushRegisterInput{
	pushToken: String!
	platform: Platform!
}

enum Platform{
	IOS
	ANDROID
	WEB
}

"""
Developer queries
"""
type DeveloperQuery{
	"""
	Orders added by developer integration
	"""
	orders(
		filter: DeveloperOrderFilter
	): [DeveloperOrder!]!
	restaurants: [DeveloperRestaurant!]!
	orderById(
		order: OrderDetailsInput!
	): Order
}

"""
Developer mutations
"""
type DeveloperMutation{
	addOrder(
		order: OrderAddInput!
	): String
}

"""
Developer integrating with foodeli
"""
type Developer{
	"""
	Name of the developer integration
	"""
	name: String!
	"""
	key to be used inside headers of developer request for example
	## Request
	\`\`\`;
apiKey: j1248879rhr270\`\`\`
	"""
	apiKey: String!
	"""
	Restaurants allowed to use this developer integration
	"""
	restaurantsUsernames: [String!]!
	ownerUsername: String!
}

input CreateDeveloper{
	name: String!
	ownerUsername: String!
}

input SetDeveloperRestaurants{
	ownerUsernames: [String!]! = []
	"""
	unique name of the developer added by admin
	"""
	name: String!
}

input DeveloperDetails{
	name: String!
}

type Coordinator{
	ownerUsername: String!
	person: Person!
}

input CoordinatorAddInput{
	person: PersonAddInput!
	ownerUsername: String!
}

input CoordinatorUpdateInput{
	person: PersonUpdateInput!
}

type DriverWorkSchedule{
	driver: Driver!
	date: String!
	start: String!
	end: String!
}

input CreateDriverWorkSchedule{
	date: String!
	start: String!
	end: String!
}

input DetailsDriverWorkSchedule{
	ownerUsernameInput: OwnerUsernameInput!
	date: String!
}

input UpdateDriverWorkSchedule{
	date: String
	start: String
	end: String
}

"""
Support details of tenant. Should be visible to drivers admins and restaurants
"""
type SupportDetails{
	phone: String
	email: String
}

input UpdateSupportDetails{
	phone: String
	email: String
}

"""
Anonymous device mutation. Mainly for usage with promotions app
"""
type DeviceMutation{
	registerPushNotificationsToken(
		pushRegisterInput: PushRegisterInput!
	): String
}

"""
Newsletter Registeration
"""
type Newsletter{
	email: String!
}

"""
remove Forms input.
"""
input removeByEmail{
	email: String!
}

"""
Form responses
"""
type RestaurantFormResponse{
	name: String!
	restaurantName: String
	tenant: String
	email: String!
	NIP: String!
	phone: String!
	address: Address!
	bankAccountNumber: String!
	managerPhone: String
	additionalInfo: String
	cashOnly: Boolean
}

type TenantFormResponse{
	name: String!
	email: String!
	phone: String!
	address: String!
	city: String!
}

type DriverFormResponse{
	firstName: String!
	lastName: String!
	tenant: String
	birthDate: String
	email: String!
	phone: String!
	PESEL: String!
	address: Address!
	ownCar: Boolean
}

scalar ObjectId

"""
Base Unit in the menu
"""
type Dish{
	"""
	Name as seen in the menu
	"""
	name: String!
	"""
	Price in smallest currency available unit
	"""
	price: Int!
	"""
	Categories this dish exist in
	"""
	categories: [DishCategory!]!
	"""
	Available addon selections on this dish
	"""
	addonSelections: [AddonSelect!]!
	imageUrl: String!
}

"""
Category of dish containing relevenat dishes. On dish must exist in one or more categories
"""
type DishCategory{
	"""
	All dishes in category
	"""
	dishes: [Dish!]!
	"""
	Name as seen in the menu
	"""
	name: String!
}

"""
Menu of the restaurant
"""
type Menu{
	"""
	Menu name
	"""
	name: String!
	"""
	All categories in the menu
	"""
	categories: [DishCategory!]!
	"""
	All available Addons
	"""
	listAddon: [Addon!]
	"""
	All available addon selections so you can reuse
	"""
	listAddonSelect: [AddonSelect!]
	"""
	List all dishes from the menu
	"""
	listDishes: [Dish!]
}

type Addon{
	"""
	Price in smallest currency available unit
	"""
	price: Int!
	"""
	Name as seen in the menu
	"""
	name: String!
}

"""
Addon representing single selection on dish. For example if you have pizza you have 3 options of dough:
* thin
* pan thick.
* italian
"""
type AddonSelect{
	"""
	addon to choose
	"""
	addonsToChoose: [Addon!]!
	"""
	if multiple select is available please select this flag
	"""
	multiple: Boolean
	"""
	name of the addon select category. for example select sauce
	"""
	name: String!
}

"""
Ordered dish together with its addons
"""
type DishOrder{
	"""
	the dish
	"""
	dish: Dish!
	"""
	ordered addons
	"""
	addons: [AddonsOrder!]
	"""
	Quantity of dishes
	"""
	quantity: Int!
}

type MenuQuery{
	listMenu: [Menu!]
}

"""
Order of addons to dish
"""
type AddonsOrder{
	"""
	name of the addon select category. for example select sauce
	"""
	name: String!
	"""
	addon chosen by client
	"""
	addons: [Addon!]!
}

type MenuMutation{
	addCategory(
		category: CreateDishCategory!
	): Boolean
	removeCategory(
		dishCategoryDetails: DishCategoryDetails!
	): Boolean
	updateCategory(
		category: CreateDishCategory!
	): Boolean
	addDish(
		dish: CreateDish!
	): Boolean
	removeDish(
		dishDetails: DishDetails!
	): Boolean
	updateDish(
		dish: UpdateDish!
	): Boolean
	addAddon(
		addon: CreateAddon!
	): Boolean
	updateAddon(
		addon: UpdateAddon!
	): Boolean
	removeAddon(
		addonDetails: AddonDetails!
	): Boolean
	addAddonSelect(
		addonSelect: CreateAddonSelect!
	): Boolean
	updateAddonSelect(
		addonSelect: UpdateAddonSelect!
	): Boolean
	removeAddonSelect(
		addonSelectDetails: AddonSelectDetails!
	): Boolean
	addMenu(
		menu: CreateMenu!
	): Boolean
	updateMenu(
		menu: UpdateMenu!
	): Boolean
	removeMenu(
		menuDetails: MenuDetails
	): Boolean
}

input CreateDishCategory{
	"""
	Name as seen in the menu
	"""
	name: String!
}

input UpdateDishCategory{
	"""
	Name as seen in the menu
	"""
	name: String
	dishCategoryDetails: DishCategoryDetails!
}

input CreateDish{
	"""
	Name as seen in the menu
	"""
	name: String!
	"""
	Price in smallest currency available unit
	"""
	price: Int!
	imageUrl: String!
}

input UpdateDish{
	"""
	Price in smallest currency available unit
	"""
	price: Int
	"""
	Name as seen in the menu
	"""
	name: String
	imageUrl: String
	dishDetails: DishDetails!
}

input CreateAddon{
	"""
	Name as seen in the menu
	"""
	name: String!
	"""
	Price in smallest currency available unit
	"""
	price: Int!
}

input UpdateAddon{
	"""
	Name as seen in the menu
	"""
	name: String
	"""
	Price in smallest currency available unit
	"""
	price: Int
	addonDetails: AddonDetails!
}

input CreateAddonSelect{
	"""
	if multiple select is available please select this flag
	"""
	multiple: Boolean
	"""
	name of the addon select category. for example select sauce
	"""
	name: String!
}

input UpdateAddonSelect{
	"""
	addon to choose
	"""
	addonsToChoose: [ObjectId!]
	"""
	if multiple select is available please select this flag
	"""
	multiple: Boolean
	"""
	name of the addon select category. for example select sauce
	"""
	name: String!
	"""
	name to change
	"""
	newName: String
}

input CreateMenu{
	"""
	Menu name
	"""
	name: String!
}

input UpdateMenu{
	"""
	Menu name
	"""
	name: String
	menuDetails: MenuDetails!
}

input DishDetails{
	id: String!
}

input AddonDetails{
	id: String!
}

input DishCategoryDetails{
	id: String!
}

input MenuDetails{
	id: String!
}

input AddonSelectDetails{
	id: String!
}`;
