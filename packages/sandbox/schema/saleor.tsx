export const saleor = `
type Query{
	"""
	Look up a webhook by ID.
	"""
	webhook(
		"""
		ID of the webhook.
		"""
		id: ID!
	): Webhook
	"""
	List of all available webhook events.
	"""
	webhookEvents: [WebhookEvent]
	"""
	Retrieve a sample payload for a given webhook event based on real data. It can be useful for some integrations where sample payload is required.
	"""
	webhookSamplePayload(
		"""
		Name of the requested event type.
		"""
		eventType: WebhookSampleEventTypeEnum!
	): JSONString
	"""
	Look up a warehouse by ID.
	"""
	warehouse(
		"""
		ID of an warehouse
		"""
		id: ID!
	): Warehouse
	"""
	List of warehouses.
	"""
	warehouses(
		filter: WarehouseFilterInput
		sortBy: WarehouseSortingInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): WarehouseCountableConnection
	"""
	Returns a list of all translatable items of a given kind.
	"""
	translations(
		"""
		Kind of objects to retrieve.
		"""
		kind: TranslatableKinds!
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): TranslatableItemConnection
	translation(
		"""
		ID of the object to retrieve.
		"""
		id: ID!
		"""
		Kind of the object to retrieve.
		"""
		kind: TranslatableKinds!
	): TranslatableItem
	"""
	Look up a stock by ID
	"""
	stock(
		"""
		ID of an warehouse
		"""
		id: ID!
	): Stock
	"""
	List of stocks.
	"""
	stocks(
		filter: StockFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): StockCountableConnection
	"""
	Return information about the shop.
	"""
	shop: Shop!
	"""
	Order related settings from site settings.
	"""
	orderSettings: OrderSettings
	"""
	Look up a shipping zone by ID.
	"""
	shippingZone(
		"""
		ID of the shipping zone.
		"""
		id: ID!
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): ShippingZone
	"""
	List of the shop's shipping zones.
	"""
	shippingZones(
		"""
		Filtering options for shipping zones.
		"""
		filter: ShippingZoneFilterInput
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ShippingZoneCountableConnection
	"""
	Look up digital content by ID.
	"""
	digitalContent(
		"""
		ID of the digital content.
		"""
		id: ID!
	): DigitalContent
	"""
	List of digital content.
	"""
	digitalContents(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): DigitalContentCountableConnection
	"""
	List of the shop's categories.
	"""
	categories(
		"""
		Filtering options for categories.
		"""
		filter: CategoryFilterInput
		"""
		Sort categories.
		"""
		sortBy: CategorySortingInput
		"""
		Filter categories by the nesting level in the category tree.
		"""
		level: Int
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CategoryCountableConnection
	"""
	Look up a category by ID or slug.
	"""
	category(
		"""
		ID of the category.
		"""
		id: ID
		"""
		Slug of the category
		"""
		slug: String
	): Category
	"""
	Look up a collection by ID.
	"""
	collection(
		"""
		ID of the collection.
		"""
		id: ID
		"""
		Slug of the category
		"""
		slug: String
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): Collection
	"""
	List of the shop's collections.
	"""
	collections(
		"""
		Filtering options for collections.
		"""
		filter: CollectionFilterInput
		"""
		Sort collections.
		"""
		sortBy: CollectionSortingInput
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CollectionCountableConnection
	"""
	Look up a product by ID.
	"""
	product(
		"""
		ID of the product.
		"""
		id: ID
		"""
		Slug of the product.
		"""
		slug: String
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): Product
	"""
	List of the shop's products.
	"""
	products(
		"""
		Filtering options for products.
		"""
		filter: ProductFilterInput
		"""
		Sort products.
		"""
		sortBy: ProductOrder
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductCountableConnection
	"""
	Look up a product type by ID.
	"""
	productType(
		"""
		ID of the product type.
		"""
		id: ID!
	): ProductType
	"""
	List of the shop's product types.
	"""
	productTypes(
		"""
		Filtering options for product types.
		"""
		filter: ProductTypeFilterInput
		"""
		Sort product types.
		"""
		sortBy: ProductTypeSortingInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductTypeCountableConnection
	"""
	Look up a product variant by ID or SKU.
	"""
	productVariant(
		"""
		ID of the product variant.
		"""
		id: ID
		"""
		Sku of the product variant.
		"""
		sku: String
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): ProductVariant
	"""
	List of product variants.
	"""
	productVariants(
		"""
		Filter product variants by given IDs.
		"""
		ids: [ID]
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Filtering options for product variant.
		"""
		filter: ProductVariantFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductVariantCountableConnection
	"""
	List of top selling products.
	"""
	reportProductSales(
		"""
		Span of time.
		"""
		period: ReportingPeriod!
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String!
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductVariantCountableConnection
	"""
	Look up a payment by ID.
	"""
	payment(
		"""
		ID of the payment.
		"""
		id: ID!
	): Payment
	"""
	List of payments.
	"""
	payments(
		"""
		Filtering options for payments.
		"""
		filter: PaymentFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): PaymentCountableConnection
	"""
	Look up a page by ID or slug.
	"""
	page(
		"""
		ID of the page.
		"""
		id: ID
		"""
		The slug of the page.
		"""
		slug: String
	): Page
	"""
	List of the shop's pages.
	"""
	pages(
		"""
		Sort pages.
		"""
		sortBy: PageSortingInput
		"""
		Filtering options for pages.
		"""
		filter: PageFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): PageCountableConnection
	"""
	Look up a page type by ID.
	"""
	pageType(
		"""
		ID of the page type.
		"""
		id: ID!
	): PageType
	"""
	List of the page types.
	"""
	pageTypes(
		"""
		Sort page types.
		"""
		sortBy: PageTypeSortingInput
		"""
		Filtering options for page types.
		"""
		filter: PageTypeFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): PageTypeCountableConnection
	"""
	List of activity events to display on homepage (at the moment it only contains order-events).
	"""
	homepageEvents(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): OrderEventCountableConnection
	"""
	Look up an order by ID.
	"""
	order(
		"""
		ID of an order.
		"""
		id: ID!
	): Order
	"""
	List of orders.
	"""
	orders(
		"""
		Sort orders.
		"""
		sortBy: OrderSortingInput
		"""
		Filtering options for orders.
		"""
		filter: OrderFilterInput
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): OrderCountableConnection
	"""
	List of draft orders.
	"""
	draftOrders(
		"""
		Sort draft orders.
		"""
		sortBy: OrderSortingInput
		"""
		Filtering options for draft orders.
		"""
		filter: OrderDraftFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): OrderCountableConnection
	"""
	Return the total sales amount from a specific period.
	"""
	ordersTotal(
		"""
		A period of time.
		"""
		period: ReportingPeriod
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): TaxedMoney
	"""
	Look up an order by token.
	"""
	orderByToken(
		"""
		The order's token.
		"""
		token: UUID!
	): Order
	"""
	Look up a navigation menu by ID or name.
	"""
	menu(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		ID of the menu.
		"""
		id: ID
		"""
		The menu's name.
		"""
		name: String
		"""
		The menu's slug.
		"""
		slug: String
	): Menu
	"""
	List of the storefront's menus.
	"""
	menus(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Sort menus.
		"""
		sortBy: MenuSortingInput
		"""
		Filtering options for menus.
		"""
		filter: MenuFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): MenuCountableConnection
	"""
	Look up a menu item by ID.
	"""
	menuItem(
		"""
		ID of the menu item.
		"""
		id: ID!
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): MenuItem
	"""
	List of the storefronts's menu items.
	"""
	menuItems(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Sort menus items.
		"""
		sortBy: MenuItemSortingInput
		"""
		Filtering options for menu items.
		"""
		filter: MenuItemFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): MenuItemCountableConnection
	"""
	Look up a gift card by ID.
	"""
	giftCard(
		"""
		ID of the gift card.
		"""
		id: ID!
	): GiftCard
	"""
	List of gift cards.
	"""
	giftCards(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): GiftCardCountableConnection
	"""
	Look up a plugin by ID.
	"""
	plugin(
		"""
		ID of the plugin.
		"""
		id: ID!
	): Plugin
	"""
	List of plugins.
	"""
	plugins(
		"""
		Filtering options for plugins.
		"""
		filter: PluginFilterInput
		"""
		Sort plugins.
		"""
		sortBy: PluginSortingInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): PluginCountableConnection
	"""
	Look up a sale by ID.
	"""
	sale(
		"""
		ID of the sale.
		"""
		id: ID!
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): Sale
	"""
	List of the shop's sales.
	"""
	sales(
		"""
		Filtering options for sales.
		"""
		filter: SaleFilterInput
		"""
		Sort sales.
		"""
		sortBy: SaleSortingInput
		"""
		Search sales by name, value or type. DEPRECATED: Will be removed in Saleor 4.0. Use \ input instead.
		"""
		query: String
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): SaleCountableConnection
	"""
	Look up a voucher by ID.
	"""
	voucher(
		"""
		ID of the voucher.
		"""
		id: ID!
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): Voucher
	"""
	List of the shop's vouchers.
	"""
	vouchers(
		"""
		Filtering options for vouchers.
		"""
		filter: VoucherFilterInput
		"""
		Sort voucher.
		"""
		sortBy: VoucherSortingInput
		"""
		Search vouchers by name or code. DEPRECATED: Will be removed in Saleor 4.0. Use input instead.
		"""
		query: String
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): VoucherCountableConnection
	"""
	Look up a export file by ID.
	"""
	exportFile(
		"""
		ID of the export file job.
		"""
		id: ID!
	): ExportFile
	"""
	List of export files.
	"""
	exportFiles(
		"""
		Filtering options for export files.
		"""
		filter: ExportFileFilterInput
		"""
		Sort export files.
		"""
		sortBy: ExportFileSortingInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ExportFileCountableConnection
	"""
	List of all tax rates available from tax gateway.
	"""
	taxTypes: [TaxType]
	"""
	Look up a checkout by token and slug of channel.
	"""
	checkout(
		"""
		The checkout's token.
		"""
		token: UUID
	): Checkout
	"""
	List of checkouts.
	"""
	checkouts(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CheckoutCountableConnection
	"""
	List of checkout lines.
	"""
	checkoutLines(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CheckoutLineCountableConnection
	"""
	Look up a channel by ID.
	"""
	channel(
		"""
		ID of the channel.
		"""
		id: ID
	): Channel
	"""
	List of all channels.
	"""
	channels: [Channel!]
	"""
	List of the shop's attributes.
	"""
	attributes(
		"""
		Filtering options for attributes.
		"""
		filter: AttributeFilterInput
		"""
		Sorting options for attributes.
		"""
		sortBy: AttributeSortingInput
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): AttributeCountableConnection
	"""
	Look up an attribute by ID.
	"""
	attribute(
		"""
		ID of the attribute.
		"""
		id: ID
		"""
		Slug of the attribute.
		"""
		slug: String
	): Attribute
	"""
	List of all apps installations
	"""
	appsInstallations: [AppInstallation!]!
	"""
	List of the apps.
	"""
	apps(
		"""
		Filtering options for apps.
		"""
		filter: AppFilterInput
		"""
		Sort apps.
		"""
		sortBy: AppSortingInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): AppCountableConnection
	"""
	Look up an app by ID. If ID is not provided, return the currently authenticated app.
	"""
	app(
		"""
		ID of the app.
		"""
		id: ID
	): App
	"""
	Returns address validation rules.
	"""
	addressValidationRules(
		"""
		Two-letter ISO 3166-1 country code.
		"""
		countryCode: CountryCode!
		"""
		Designation of a region, province or state.
		"""
		countryArea: String
		"""
		City or a town name.
		"""
		city: String
		"""
		Sublocality like a district.
		"""
		cityArea: String
	): AddressValidationData
	"""
	Look up an address by ID.
	"""
	address(
		"""
		ID of an address.
		"""
		id: ID!
	): Address
	"""
	List of the shop's customers.
	"""
	customers(
		"""
		Filtering options for customers.
		"""
		filter: CustomerFilterInput
		"""
		Sort customers.
		"""
		sortBy: UserSortingInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): UserCountableConnection
	"""
	List of permission groups.
	"""
	permissionGroups(
		"""
		Filtering options for permission groups.
		"""
		filter: PermissionGroupFilterInput
		"""
		Sort permission groups.
		"""
		sortBy: PermissionGroupSortingInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): GroupCountableConnection
	"""
	Look up permission group by ID.
	"""
	permissionGroup(
		"""
		ID of the group.
		"""
		id: ID!
	): Group
	"""
	Return the currently authenticated user.
	"""
	me: User
	"""
	List of the shop's staff users.
	"""
	staffUsers(
		"""
		Filtering options for staff users.
		"""
		filter: StaffUserInput
		"""
		Sort staff users.
		"""
		sortBy: UserSortingInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): UserCountableConnection
	"""
	Look up a user by ID or email address.
	"""
	user(
		"""
		ID of the user.
		"""
		id: ID
		"""
		Email address of the user.
		"""
		email: String
	): User
	_entities(
		representations: [_Any]
	): [_Entity]
	_service: _Service
}

"""
Webhook.
"""
type Webhook implements Node{
	name: String!
	targetUrl: String!
	isActive: Boolean!
	secretKey: String
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	List of webhook events.
	"""
	events: [WebhookEvent!]!
	app: App!
}

"""
An object with an ID
"""
interface Node{
	"""
	The ID of the object.
	"""
	id: ID!
}

"""
Webhook event.
"""
type WebhookEvent{
	"""
	Internal name of the event type.
	"""
	eventType: WebhookEventTypeEnum!
	"""
	Display name of the event.
	"""
	name: String!
}

"""
Enum determining type of webhook.
"""
enum WebhookEventTypeEnum{
	"""
	All the events.
	"""
	ANY_EVENTS
	"""
	A new order is placed.
	"""
	ORDER_CREATED
	"""
	An order is confirmed (status change unconfirmed -> unfulfilled) by a staff user using the OrderConfirm mutation. It also triggers when the user completes the checkout and the shop setting  is enabled.
	"""
	ORDER_CONFIRMED
	"""
	Payment is made and an order is fully paid.
	"""
	ORDER_FULLY_PAID
	"""
	An order is updated; triggered for all changes related to an order; covers all other order webhooks, except for ORDER_CREATED.
	"""
	ORDER_UPDATED
	"""
	An order is cancelled.
	"""
	ORDER_CANCELLED
	"""
	An order is fulfilled.
	"""
	ORDER_FULFILLED
	DRAFT_ORDER_CREATED
	DRAFT_ORDER_UPDATED
	DRAFT_ORDER_DELETED
	"""
	An invoice for order requested.
	"""
	INVOICE_REQUESTED
	"""
	An invoice is deleted.
	"""
	INVOICE_DELETED
	"""
	Invoice has been sent.
	"""
	INVOICE_SENT
	"""
	A new customer account is created.
	"""
	CUSTOMER_CREATED
	"""
	A customer account is updated.
	"""
	CUSTOMER_UPDATED
	"""
	A new product is created.
	"""
	PRODUCT_CREATED
	"""
	A product is updated.
	"""
	PRODUCT_UPDATED
	"""
	A product is deleted.
	"""
	PRODUCT_DELETED
	"""
	A new product variant is created.
	"""
	PRODUCT_VARIANT_CREATED
	"""
	A product variant is updated.
	"""
	PRODUCT_VARIANT_UPDATED
	"""
	A product variant is deleted.
	"""
	PRODUCT_VARIANT_DELETED
	"""
	A new checkout is created.
	"""
	CHECKOUT_CREATED
	"""
	A checkout is updated. It also triggers all updates related to the checkout.
	"""
	CHECKOUT_UPDATED
	"""
	A new fulfillment is created.
	"""
	FULFILLMENT_CREATED
	"""
	User notification triggered.
	"""
	NOTIFY_USER
	"""
	A new page is created.
	"""
	PAGE_CREATED
	"""
	A page is updated.
	"""
	PAGE_UPDATED
	"""
	A page is deleted.
	"""
	PAGE_DELETED
	PAYMENT_AUTHORIZE
	PAYMENT_CAPTURE
	PAYMENT_CONFIRM
	PAYMENT_LIST_GATEWAYS
	PAYMENT_PROCESS
	PAYMENT_REFUND
	PAYMENT_VOID
	TRANSLATION_CREATED
	TRANSLATION_UPDATED
}

"""
Represents app data.
"""
type App implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Name of the app.
	"""
	name: String
	"""
	The date and time when the app was created.
	"""
	created: DateTime
	"""
	Determine if app will be set active or not.
	"""
	isActive: Boolean
	"""
	List of the app's permissions.
	"""
	permissions: [Permission]
	"""
	Last 4 characters of the tokens.
	"""
	tokens: [AppToken]
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Type of the app.
	"""
	type: AppTypeEnum
	"""
	List of webhooks assigned to this app.
	"""
	webhooks: [Webhook]
	"""
	Description of this app.
	"""
	aboutApp: String
	"""
	Description of the data privacy defined for this app.
	"""
	dataPrivacy: String
	"""
	Url to details about the privacy policy on the app owner page.
	"""
	dataPrivacyUrl: String
	"""
	Homepage of the app.
	"""
	homepageUrl: String
	"""
	Support page for the app.
	"""
	supportUrl: String
	"""
	Url to iframe with the configuration for the app.
	"""
	configurationUrl: String
	"""
	Url to iframe with the app.
	"""
	appUrl: String
	"""
	Version number of the app.
	"""
	version: String
	"""
	JWT token used to authenticate by thridparty app.
	"""
	accessToken: String
}

interface ObjectWithMetadata{
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
}

type MetadataItem{
	"""
	Key of a metadata item.
	"""
	key: String!
	"""
	Value of a metadata item.
	"""
	value: String!
}

"""
The  scalar type represents a DateTime
value as specified by
[iso8601](https://en.wikipedia.org/wiki/ISO_8601).
"""
scalar DateTime

"""
Represents a permission object in a friendly form.
"""
type Permission{
	"""
	Internal code for permission.
	"""
	code: PermissionEnum!
	"""
	Describe action(s) allowed to do by permission.
	"""
	name: String!
}

"""
An enumeration.
"""
enum PermissionEnum{
	MANAGE_USERS
	MANAGE_STAFF
	IMPERSONATE_USER
	MANAGE_APPS
	MANAGE_CHANNELS
	MANAGE_DISCOUNTS
	MANAGE_PLUGINS
	MANAGE_GIFT_CARD
	MANAGE_MENUS
	MANAGE_ORDERS
	MANAGE_PAGES
	MANAGE_PAGE_TYPES_AND_ATTRIBUTES
	HANDLE_PAYMENTS
	MANAGE_PRODUCTS
	MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES
	MANAGE_SHIPPING
	MANAGE_SETTINGS
	MANAGE_TRANSLATIONS
	MANAGE_CHECKOUTS
}

"""
Represents token data.
"""
type AppToken implements Node{
	"""
	Name of the authenticated token.
	"""
	name: String
	"""
	Last 4 characters of the token.
	"""
	authToken: String
	"""
	The ID of the object.
	"""
	id: ID!
}

"""
Enum determining type of your App.
"""
enum AppTypeEnum{
	"""
	Local Saleor App. The app is fully manageable from dashboard. You can change assigned permissions, add webhooks, or authentication token
	"""
	LOCAL
	"""
	Third party external App. Installation is fully automated. Saleor uses a defined App manifest to gather all required information.
	"""
	THIRDPARTY
}

"""
Allows use of a JSON String for input / output from the GraphQL schema.

Use of this type is *not recommended* as you lose the benefits of having a defined, static
schema (one of the key benefits of GraphQL).
"""
scalar JSONString

"""
An enumeration.
"""
enum WebhookSampleEventTypeEnum{
	ORDER_CREATED
	ORDER_CONFIRMED
	ORDER_FULLY_PAID
	ORDER_UPDATED
	ORDER_CANCELLED
	ORDER_FULFILLED
	DRAFT_ORDER_CREATED
	DRAFT_ORDER_UPDATED
	DRAFT_ORDER_DELETED
	INVOICE_REQUESTED
	INVOICE_DELETED
	INVOICE_SENT
	CUSTOMER_CREATED
	CUSTOMER_UPDATED
	PRODUCT_CREATED
	PRODUCT_UPDATED
	PRODUCT_DELETED
	PRODUCT_VARIANT_CREATED
	PRODUCT_VARIANT_UPDATED
	PRODUCT_VARIANT_DELETED
	CHECKOUT_CREATED
	CHECKOUT_UPDATED
	FULFILLMENT_CREATED
	NOTIFY_USER
	PAGE_CREATED
	PAGE_UPDATED
	PAGE_DELETED
	PAYMENT_AUTHORIZE
	PAYMENT_CAPTURE
	PAYMENT_CONFIRM
	PAYMENT_LIST_GATEWAYS
	PAYMENT_PROCESS
	PAYMENT_REFUND
	PAYMENT_VOID
	TRANSLATION_CREATED
	TRANSLATION_UPDATED
}

"""
Represents warehouse.
"""
type Warehouse implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	slug: String!
	shippingZones(
		before: String
		after: String
		first: Int
		last: Int
	): ShippingZoneCountableConnection!
	address: Address!
	email: String!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Warehouse company name.
	"""
	companyName: String! @deprecated(
	reason: "Use address.CompanyName. This field will be removed in Saleor 4.0."
)
}

type ShippingZoneCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [ShippingZoneCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

"""
The Relay compliant  type, containing data necessary to paginate this connection.
"""
type PageInfo{
	"""
	When paginating forwards, are there more items?
	"""
	hasNextPage: Boolean!
	"""
	When paginating backwards, are there more items?
	"""
	hasPreviousPage: Boolean!
	"""
	When paginating backwards, the cursor to continue.
	"""
	startCursor: String
	"""
	When paginating forwards, the cursor to continue.
	"""
	endCursor: String
}

type ShippingZoneCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: ShippingZone!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

"""
Represents a shipping zone in the shop. Zones are the concept used only for grouping shipping methods in the dashboard, and are never exposed to the customers directly.
"""
type ShippingZone implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	default: Boolean!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Lowest and highest prices for the shipping.
	"""
	priceRange: MoneyRange
	"""
	List of countries available for the method.
	"""
	countries: [CountryDisplay]
	"""
	List of shipping methods available for orders shipped to countries within this shipping zone.
	"""
	shippingMethods: [ShippingMethod]
	"""
	List of warehouses for shipping zone.
	"""
	warehouses: [Warehouse!]!
	"""
	List of channels for shipping zone.
	"""
	channels: [Channel!]!
	"""
	Description of a shipping zone.
	"""
	description: String
}

"""
Represents a range of amounts of money.
"""
type MoneyRange{
	"""
	Lower bound of a price range.
	"""
	start: Money
	"""
	Upper bound of a price range.
	"""
	stop: Money
}

"""
Represents amount of money in specific currency.
"""
type Money{
	"""
	Currency code.
	"""
	currency: String!
	"""
	Amount of money.
	"""
	amount: Float!
}

type CountryDisplay{
	"""
	Country code.
	"""
	code: String!
	"""
	Country name.
	"""
	country: String!
	"""
	Country tax.
	"""
	vat: VAT
}

"""
Represents a VAT rate for a country.
"""
type VAT{
	"""
	Country code.
	"""
	countryCode: String!
	"""
	Standard VAT rate in percent.
	"""
	standardRate: Float
	"""
	Country's VAT rate exceptions for specific types of goods.
	"""
	reducedRates: [ReducedRate!]
}

"""
Represents a reduced VAT rate for a particular type of goods.
"""
type ReducedRate{
	"""
	Reduced VAT rate in percent.
	"""
	rate: Float!
	"""
	A type of goods.
	"""
	rateType: String!
}

"""
Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers.
"""
type ShippingMethod implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	description: JSONString
	minimumOrderWeight: Weight
	maximumOrderWeight: Weight
	maximumDeliveryDays: Int
	minimumDeliveryDays: Int
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Type of the shipping method.
	"""
	type: ShippingMethodTypeEnum
	"""
	Returns translated shipping method fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for shipping method.
		"""
		languageCode: LanguageCodeEnum!
	): ShippingMethodTranslation
	"""
	List of channels available for the method.
	"""
	channelListings: [ShippingMethodChannelListing!]
	"""
	The price of the cheapest variant (including discounts).
	"""
	price: Money
	"""
	The price of the cheapest variant (including discounts).
	"""
	maximumOrderPrice: Money
	"""
	The price of the cheapest variant (including discounts).
	"""
	minimumOrderPrice: Money
	"""
	Postal code ranges rule of exclusion or inclusion of the shipping method.
	"""
	postalCodeRules: [ShippingMethodPostalCodeRule]
	"""
	List of excluded products for the shipping method.
	"""
	excludedProducts(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductCountableConnection
}

"""
Represents weight value in a specific weight unit.
"""
type Weight{
	"""
	Weight unit.
	"""
	unit: WeightUnitsEnum!
	"""
	Weight value.
	"""
	value: Float!
}

"""
An enumeration.
"""
enum WeightUnitsEnum{
	G
	LB
	OZ
	KG
	TONNE
}

"""
An enumeration.
"""
enum ShippingMethodTypeEnum{
	PRICE
	WEIGHT
}

type ShippingMethodTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String
	description: JSONString
	"""
	Translation language.
	"""
	language: LanguageDisplay!
}

type LanguageDisplay{
	"""
	ISO 639 representation of the language name.
	"""
	code: LanguageCodeEnum!
	"""
	Full name of the language.
	"""
	language: String!
}

"""
An enumeration.
"""
enum LanguageCodeEnum{
	AF
	AF_NA
	AF_ZA
	AGQ
	AGQ_CM
	AK
	AK_GH
	AM
	AM_ET
	AR
	AR_AE
	AR_BH
	AR_DJ
	AR_DZ
	AR_EG
	AR_EH
	AR_ER
	AR_IL
	AR_IQ
	AR_JO
	AR_KM
	AR_KW
	AR_LB
	AR_LY
	AR_MA
	AR_MR
	AR_OM
	AR_PS
	AR_QA
	AR_SA
	AR_SD
	AR_SO
	AR_SS
	AR_SY
	AR_TD
	AR_TN
	AR_YE
	AS
	AS_IN
	ASA
	ASA_TZ
	AST
	AST_ES
	AZ
	AZ_CYRL
	AZ_CYRL_AZ
	AZ_LATN
	AZ_LATN_AZ
	BAS
	BAS_CM
	BE
	BE_BY
	BEM
	BEM_ZM
	BEZ
	BEZ_TZ
	BG
	BG_BG
	BM
	BM_ML
	BN
	BN_BD
	BN_IN
	BO
	BO_CN
	BO_IN
	BR
	BR_FR
	BRX
	BRX_IN
	BS
	BS_CYRL
	BS_CYRL_BA
	BS_LATN
	BS_LATN_BA
	CA
	CA_AD
	CA_ES
	CA_ES_VALENCIA
	CA_FR
	CA_IT
	CCP
	CCP_BD
	CCP_IN
	CE
	CE_RU
	CEB
	CEB_PH
	CGG
	CGG_UG
	CHR
	CHR_US
	CKB
	CKB_IQ
	CKB_IR
	CS
	CS_CZ
	CU
	CU_RU
	CY
	CY_GB
	DA
	DA_DK
	DA_GL
	DAV
	DAV_KE
	DE
	DE_AT
	DE_BE
	DE_CH
	DE_DE
	DE_IT
	DE_LI
	DE_LU
	DJE
	DJE_NE
	DSB
	DSB_DE
	DUA
	DUA_CM
	DYO
	DYO_SN
	DZ
	DZ_BT
	EBU
	EBU_KE
	EE
	EE_GH
	EE_TG
	EL
	EL_CY
	EL_GR
	EN
	EN_AE
	EN_AG
	EN_AI
	EN_AS
	EN_AT
	EN_AU
	EN_BB
	EN_BE
	EN_BI
	EN_BM
	EN_BS
	EN_BW
	EN_BZ
	EN_CA
	EN_CC
	EN_CH
	EN_CK
	EN_CM
	EN_CX
	EN_CY
	EN_DE
	EN_DG
	EN_DK
	EN_DM
	EN_ER
	EN_FI
	EN_FJ
	EN_FK
	EN_FM
	EN_GB
	EN_GD
	EN_GG
	EN_GH
	EN_GI
	EN_GM
	EN_GU
	EN_GY
	EN_HK
	EN_IE
	EN_IL
	EN_IM
	EN_IN
	EN_IO
	EN_JE
	EN_JM
	EN_KE
	EN_KI
	EN_KN
	EN_KY
	EN_LC
	EN_LR
	EN_LS
	EN_MG
	EN_MH
	EN_MO
	EN_MP
	EN_MS
	EN_MT
	EN_MU
	EN_MW
	EN_MY
	EN_NA
	EN_NF
	EN_NG
	EN_NL
	EN_NR
	EN_NU
	EN_NZ
	EN_PG
	EN_PH
	EN_PK
	EN_PN
	EN_PR
	EN_PW
	EN_RW
	EN_SB
	EN_SC
	EN_SD
	EN_SE
	EN_SG
	EN_SH
	EN_SI
	EN_SL
	EN_SS
	EN_SX
	EN_SZ
	EN_TC
	EN_TK
	EN_TO
	EN_TT
	EN_TV
	EN_TZ
	EN_UG
	EN_UM
	EN_US
	EN_VC
	EN_VG
	EN_VI
	EN_VU
	EN_WS
	EN_ZA
	EN_ZM
	EN_ZW
	EO
	ES
	ES_AR
	ES_BO
	ES_BR
	ES_BZ
	ES_CL
	ES_CO
	ES_CR
	ES_CU
	ES_DO
	ES_EA
	ES_EC
	ES_ES
	ES_GQ
	ES_GT
	ES_HN
	ES_IC
	ES_MX
	ES_NI
	ES_PA
	ES_PE
	ES_PH
	ES_PR
	ES_PY
	ES_SV
	ES_US
	ES_UY
	ES_VE
	ET
	ET_EE
	EU
	EU_ES
	EWO
	EWO_CM
	FA
	FA_AF
	FA_IR
	FF
	FF_ADLM
	FF_ADLM_BF
	FF_ADLM_CM
	FF_ADLM_GH
	FF_ADLM_GM
	FF_ADLM_GN
	FF_ADLM_GW
	FF_ADLM_LR
	FF_ADLM_MR
	FF_ADLM_NE
	FF_ADLM_NG
	FF_ADLM_SL
	FF_ADLM_SN
	FF_LATN
	FF_LATN_BF
	FF_LATN_CM
	FF_LATN_GH
	FF_LATN_GM
	FF_LATN_GN
	FF_LATN_GW
	FF_LATN_LR
	FF_LATN_MR
	FF_LATN_NE
	FF_LATN_NG
	FF_LATN_SL
	FF_LATN_SN
	FI
	FI_FI
	FIL
	FIL_PH
	FO
	FO_DK
	FO_FO
	FR
	FR_BE
	FR_BF
	FR_BI
	FR_BJ
	FR_BL
	FR_CA
	FR_CD
	FR_CF
	FR_CG
	FR_CH
	FR_CI
	FR_CM
	FR_DJ
	FR_DZ
	FR_FR
	FR_GA
	FR_GF
	FR_GN
	FR_GP
	FR_GQ
	FR_HT
	FR_KM
	FR_LU
	FR_MA
	FR_MC
	FR_MF
	FR_MG
	FR_ML
	FR_MQ
	FR_MR
	FR_MU
	FR_NC
	FR_NE
	FR_PF
	FR_PM
	FR_RE
	FR_RW
	FR_SC
	FR_SN
	FR_SY
	FR_TD
	FR_TG
	FR_TN
	FR_VU
	FR_WF
	FR_YT
	FUR
	FUR_IT
	FY
	FY_NL
	GA
	GA_GB
	GA_IE
	GD
	GD_GB
	GL
	GL_ES
	GSW
	GSW_CH
	GSW_FR
	GSW_LI
	GU
	GU_IN
	GUZ
	GUZ_KE
	GV
	GV_IM
	HA
	HA_GH
	HA_NE
	HA_NG
	HAW
	HAW_US
	HE
	HE_IL
	HI
	HI_IN
	HR
	HR_BA
	HR_HR
	HSB
	HSB_DE
	HU
	HU_HU
	HY
	HY_AM
	IA
	ID
	ID_ID
	IG
	IG_NG
	II
	II_CN
	IS
	IS_IS
	IT
	IT_CH
	IT_IT
	IT_SM
	IT_VA
	JA
	JA_JP
	JGO
	JGO_CM
	JMC
	JMC_TZ
	JV
	JV_ID
	KA
	KA_GE
	KAB
	KAB_DZ
	KAM
	KAM_KE
	KDE
	KDE_TZ
	KEA
	KEA_CV
	KHQ
	KHQ_ML
	KI
	KI_KE
	KK
	KK_KZ
	KKJ
	KKJ_CM
	KL
	KL_GL
	KLN
	KLN_KE
	KM
	KM_KH
	KN
	KN_IN
	KO
	KO_KP
	KO_KR
	KOK
	KOK_IN
	KS
	KS_ARAB
	KS_ARAB_IN
	KSB
	KSB_TZ
	KSF
	KSF_CM
	KSH
	KSH_DE
	KU
	KU_TR
	KW
	KW_GB
	KY
	KY_KG
	LAG
	LAG_TZ
	LB
	LB_LU
	LG
	LG_UG
	LKT
	LKT_US
	LN
	LN_AO
	LN_CD
	LN_CF
	LN_CG
	LO
	LO_LA
	LRC
	LRC_IQ
	LRC_IR
	LT
	LT_LT
	LU
	LU_CD
	LUO
	LUO_KE
	LUY
	LUY_KE
	LV
	LV_LV
	MAI
	MAI_IN
	MAS
	MAS_KE
	MAS_TZ
	MER
	MER_KE
	MFE
	MFE_MU
	MG
	MG_MG
	MGH
	MGH_MZ
	MGO
	MGO_CM
	MI
	MI_NZ
	MK
	MK_MK
	ML
	ML_IN
	MN
	MN_MN
	MNI
	MNI_BENG
	MNI_BENG_IN
	MR
	MR_IN
	MS
	MS_BN
	MS_ID
	MS_MY
	MS_SG
	MT
	MT_MT
	MUA
	MUA_CM
	MY
	MY_MM
	MZN
	MZN_IR
	NAQ
	NAQ_NA
	NB
	NB_NO
	NB_SJ
	ND
	ND_ZW
	NDS
	NDS_DE
	NDS_NL
	NE
	NE_IN
	NE_NP
	NL
	NL_AW
	NL_BE
	NL_BQ
	NL_CW
	NL_NL
	NL_SR
	NL_SX
	NMG
	NMG_CM
	NN
	NN_NO
	NNH
	NNH_CM
	NUS
	NUS_SS
	NYN
	NYN_UG
	OM
	OM_ET
	OM_KE
	OR
	OR_IN
	OS
	OS_GE
	OS_RU
	PA
	PA_ARAB
	PA_ARAB_PK
	PA_GURU
	PA_GURU_IN
	PCM
	PCM_NG
	PL
	PL_PL
	PRG
	PS
	PS_AF
	PS_PK
	PT
	PT_AO
	PT_BR
	PT_CH
	PT_CV
	PT_GQ
	PT_GW
	PT_LU
	PT_MO
	PT_MZ
	PT_PT
	PT_ST
	PT_TL
	QU
	QU_BO
	QU_EC
	QU_PE
	RM
	RM_CH
	RN
	RN_BI
	RO
	RO_MD
	RO_RO
	ROF
	ROF_TZ
	RU
	RU_BY
	RU_KG
	RU_KZ
	RU_MD
	RU_RU
	RU_UA
	RW
	RW_RW
	RWK
	RWK_TZ
	SAH
	SAH_RU
	SAQ
	SAQ_KE
	SAT
	SAT_OLCK
	SAT_OLCK_IN
	SBP
	SBP_TZ
	SD
	SD_ARAB
	SD_ARAB_PK
	SD_DEVA
	SD_DEVA_IN
	SE
	SE_FI
	SE_NO
	SE_SE
	SEH
	SEH_MZ
	SES
	SES_ML
	SG
	SG_CF
	SHI
	SHI_LATN
	SHI_LATN_MA
	SHI_TFNG
	SHI_TFNG_MA
	SI
	SI_LK
	SK
	SK_SK
	SL
	SL_SI
	SMN
	SMN_FI
	SN
	SN_ZW
	SO
	SO_DJ
	SO_ET
	SO_KE
	SO_SO
	SQ
	SQ_AL
	SQ_MK
	SQ_XK
	SR
	SR_CYRL
	SR_CYRL_BA
	SR_CYRL_ME
	SR_CYRL_RS
	SR_CYRL_XK
	SR_LATN
	SR_LATN_BA
	SR_LATN_ME
	SR_LATN_RS
	SR_LATN_XK
	SU
	SU_LATN
	SU_LATN_ID
	SV
	SV_AX
	SV_FI
	SV_SE
	SW
	SW_CD
	SW_KE
	SW_TZ
	SW_UG
	TA
	TA_IN
	TA_LK
	TA_MY
	TA_SG
	TE
	TE_IN
	TEO
	TEO_KE
	TEO_UG
	TG
	TG_TJ
	TH
	TH_TH
	TI
	TI_ER
	TI_ET
	TK
	TK_TM
	TO
	TO_TO
	TR
	TR_CY
	TR_TR
	TT
	TT_RU
	TWQ
	TWQ_NE
	TZM
	TZM_MA
	UG
	UG_CN
	UK
	UK_UA
	UR
	UR_IN
	UR_PK
	UZ
	UZ_ARAB
	UZ_ARAB_AF
	UZ_CYRL
	UZ_CYRL_UZ
	UZ_LATN
	UZ_LATN_UZ
	VAI
	VAI_LATN
	VAI_LATN_LR
	VAI_VAII
	VAI_VAII_LR
	VI
	VI_VN
	VO
	VUN
	VUN_TZ
	WAE
	WAE_CH
	WO
	WO_SN
	XH
	XH_ZA
	XOG
	XOG_UG
	YAV
	YAV_CM
	YI
	YO
	YO_BJ
	YO_NG
	YUE
	YUE_HANS
	YUE_HANS_CN
	YUE_HANT
	YUE_HANT_HK
	ZGH
	ZGH_MA
	ZH
	ZH_HANS
	ZH_HANS_CN
	ZH_HANS_HK
	ZH_HANS_MO
	ZH_HANS_SG
	ZH_HANT
	ZH_HANT_HK
	ZH_HANT_MO
	ZH_HANT_TW
	ZU
	ZU_ZA
}

"""
Represents shipping method channel listing.
"""
type ShippingMethodChannelListing implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	channel: Channel!
	minimumOrderPrice: Money
	maximumOrderPrice: Money
	price: Money
}

"""
Represents channel.
"""
type Channel implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	isActive: Boolean!
	slug: String!
	currencyCode: String!
	"""
	Whether a channel has associated orders.
	"""
	hasOrders: Boolean!
	"""
	Default country for the channel. Default country can be used in checkout to determine the stock quantities or calculate taxes when the country was not explicitly provided.
	"""
	defaultCountry: CountryDisplay!
}

"""
Represents shipping method postal code rule.
"""
type ShippingMethodPostalCodeRule implements Node{
	"""
	Start address range.
	"""
	start: String
	"""
	End address range.
	"""
	end: String
	"""
	Inclusion type of the postal code rule.
	"""
	inclusionType: PostalCodeRuleInclusionTypeEnum
	"""
	The ID of the object.
	"""
	id: ID!
}

"""
An enumeration.
"""
enum PostalCodeRuleInclusionTypeEnum{
	INCLUDE
	EXCLUDE
}

type ProductCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [ProductCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type ProductCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Product!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

"""
Represents an individual item for sale in the storefront.
"""
type Product implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String!
	description: JSONString
	productType: ProductType!
	slug: String!
	category: Category
	updatedAt: DateTime
	chargeTaxes: Boolean!
	weight: Weight
	defaultVariant: ProductVariant
	rating: Float
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Channel given to retrieve this product. Also used by federation gateway to resolve this object in a federated query.
	"""
	channel: String
	"""
	Description of the product (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	The main thumbnail for a product.
	"""
	thumbnail(
		"""
		Size of thumbnail.
		"""
		size: Int
	): Image
	"""
	Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
	"""
	pricing(
		"""
		Destination address used to find warehouses where stock availability for this product is checked. If address is empty, uses  or fallbacks to server's  configuration.
		"""
		address: AddressInput
	): ProductPricingInfo
	"""
	Whether the product is in stock and visible or not.
	"""
	isAvailable(
		"""
		Destination address used to find warehouses where stock availability for this product is checked. If address is empty, uses  or fallbacks to server's  configuration.
		"""
		address: AddressInput
	): Boolean
	"""
	A type of tax. Assigned by enabled tax gateway
	"""
	taxType: TaxType
	"""
	List of attributes assigned to this product.
	"""
	attributes: [SelectedAttribute!]!
	"""
	List of availability in channels for the product.
	"""
	channelListings: [ProductChannelListing!]
	"""
	Get a single product media by ID.
	"""
	mediaById(
		"""
		ID of a product media.
		"""
		id: ID
	): ProductMedia
	"""
	Get a single product image by ID.
	"""
	imageById(
		"""
		ID of a product image.
		"""
		id: ID
	): ProductImage @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	List of variants for the product.
	"""
	variants: [ProductVariant]
	"""
	List of media for the product.
	"""
	media: [ProductMedia!]
	"""
	List of images for the product.
	"""
	images: [ProductImage] @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	List of collections for the product.
	"""
	collections: [Collection]
	"""
	Returns translated product fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for product.
		"""
		languageCode: LanguageCodeEnum!
	): ProductTranslation
	"""
	Date when product is available for purchase. 
	"""
	availableForPurchase: Date
	"""
	Whether the product is available for purchase.
	"""
	isAvailableForPurchase: Boolean
}

"""
Represents a type of product. It defines what attributes are available to products of this type.
"""
type ProductType implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	slug: String!
	hasVariants: Boolean!
	isShippingRequired: Boolean!
	isDigital: Boolean!
	weight: Weight
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	List of products of this type.
	"""
	products(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductCountableConnection @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the top-level  query with the  filter."
)
	"""
	A type of tax. Assigned by enabled tax gateway
	"""
	taxType: TaxType
	"""
	Variant attributes of that product type.
	"""
	variantAttributes(
		"""
		Define scope of returned attributes.
		"""
		variantSelection: VariantAttributeScope
	): [Attribute]
	"""
	Product attributes of that product type.
	"""
	productAttributes: [Attribute]
	availableAttributes(
		filter: AttributeFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): AttributeCountableConnection
}

"""
Representation of tax types fetched from tax gateway.
"""
type TaxType{
	"""
	Description of the tax type.
	"""
	description: String
	"""
	External tax code used to identify given tax group.
	"""
	taxCode: String
}

"""
Custom attribute of a product. Attributes can be assigned to products and variants at the product type level.
"""
type Attribute implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	productTypes(
		before: String
		after: String
		first: Int
		last: Int
	): ProductTypeCountableConnection!
	productVariantTypes(
		before: String
		after: String
		first: Int
		last: Int
	): ProductTypeCountableConnection!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	The input type to use for entering attribute values in the dashboard.
	"""
	inputType: AttributeInputTypeEnum
	"""
	The entity type which can be used as a reference.
	"""
	entityType: AttributeEntityTypeEnum
	"""
	Name of an attribute displayed in the interface.
	"""
	name: String
	"""
	Internal representation of an attribute name.
	"""
	slug: String
	"""
	The attribute type.
	"""
	type: AttributeTypeEnum
	"""
	The unit of attribute values.
	"""
	unit: MeasurementUnitsEnum
	"""
	List of attribute's values.
	"""
	choices(
		"""
		Sort attribute choices.
		"""
		sortBy: AttributeChoicesSortingInput
		"""
		Filtering options for attribute choices.
		"""
		filter: AttributeValueFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): AttributeValueCountableConnection
	"""
	Whether the attribute requires values to be passed or not.
	"""
	valueRequired: Boolean!
	"""
	Whether the attribute should be visible or not in storefront.
	"""
	visibleInStorefront: Boolean!
	"""
	Whether the attribute can be filtered in storefront.
	"""
	filterableInStorefront: Boolean!
	"""
	Whether the attribute can be filtered in dashboard.
	"""
	filterableInDashboard: Boolean!
	"""
	Whether the attribute can be displayed in the admin product list.
	"""
	availableInGrid: Boolean!
	"""
	Returns translated attribute fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for attribute.
		"""
		languageCode: LanguageCodeEnum!
	): AttributeTranslation
	"""
	The position of the attribute in the storefront navigation (0 by default).
	"""
	storefrontSearchPosition: Int!
	"""
	Flag indicating that attribute has predefined choices.
	"""
	withChoices: Boolean!
}

type ProductTypeCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [ProductTypeCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type ProductTypeCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: ProductType!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

"""
An enumeration.
"""
enum AttributeInputTypeEnum{
	DROPDOWN
	MULTISELECT
	FILE
	REFERENCE
	NUMERIC
	RICH_TEXT
	BOOLEAN
	DATE
	DATE_TIME
}

"""
An enumeration.
"""
enum AttributeEntityTypeEnum{
	PAGE
	PRODUCT
}

"""
An enumeration.
"""
enum AttributeTypeEnum{
	PRODUCT_TYPE
	PAGE_TYPE
}

"""
An enumeration.
"""
enum MeasurementUnitsEnum{
	CM
	M
	KM
	FT
	YD
	INCH
	SQ_CM
	SQ_M
	SQ_KM
	SQ_FT
	SQ_YD
	SQ_INCH
	CUBIC_MILLIMETER
	CUBIC_CENTIMETER
	CUBIC_DECIMETER
	CUBIC_METER
	LITER
	CUBIC_FOOT
	CUBIC_INCH
	CUBIC_YARD
	QT
	PINT
	FL_OZ
	ACRE_IN
	ACRE_FT
	G
	LB
	OZ
	KG
	TONNE
}

type AttributeValueCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [AttributeValueCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type AttributeValueCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: AttributeValue!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

"""
Represents a value of an attribute.
"""
type AttributeValue implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Name of a value displayed in the interface.
	"""
	name: String
	"""
	Internal representation of a value (unique per attribute).
	"""
	slug: String
	"""
	Represents the value of the attribute value.
	"""
	value: String
	"""
	Returns translated attribute value fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for attribute value.
		"""
		languageCode: LanguageCodeEnum!
	): AttributeValueTranslation
	"""
	The input type to use for entering attribute values in the dashboard.
	"""
	inputType: AttributeInputTypeEnum
	"""
	The ID of the attribute reference.
	"""
	reference: ID
	"""
	Represents file URL and content type (if attribute value is a file).
	"""
	file: File
	"""
	Represents the text (JSON) of the attribute value.
	"""
	richText: JSONString
	"""
	Represents the boolean value of the attribute value.
	"""
	boolean: Boolean
	"""
	Represents the date value of the attribute value.
	"""
	date: Date
	"""
	Represents the date time value of the attribute value.
	"""
	dateTime: DateTime
}

type AttributeValueTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	richText: JSONString
	"""
	Translation language.
	"""
	language: LanguageDisplay!
}

type File{
	"""
	The URL of the file.
	"""
	url: String!
	"""
	Content type of the file.
	"""
	contentType: String
}

"""
The  scalar type represents a Date
value as specified by
[iso8601](https://en.wikipedia.org/wiki/ISO_8601).
"""
scalar Date

input AttributeChoicesSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort attribute choices by the selected field.
	"""
	field: AttributeChoicesSortField!
}

enum OrderDirection{
	"""
	Specifies an ascending sort order.
	"""
	ASC
	"""
	Specifies a descending sort order.
	"""
	DESC
}

enum AttributeChoicesSortField{
	"""
	Sort attribute choice by name.
	"""
	NAME
	"""
	Sort attribute choice by slug.
	"""
	SLUG
}

input AttributeValueFilterInput{
	search: String
}

type AttributeTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	"""
	Translation language.
	"""
	language: LanguageDisplay!
}

enum VariantAttributeScope{
	ALL
	VARIANT_SELECTION
	NOT_VARIANT_SELECTION
}

type AttributeCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [AttributeCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type AttributeCountableConnection2{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [AttributeCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type AttributeCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Attribute!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input AttributeFilterInput{
	valueRequired: Boolean
	isVariantOnly: Boolean
	visibleInStorefront: Boolean
	filterableInStorefront: Boolean
	filterableInDashboard: Boolean
	availableInGrid: Boolean
	metadata: [MetadataFilter]
	search: String
	ids: [ID]
	type: AttributeTypeEnum
	inCollection: ID
	inCategory: ID
	"""
	Specifies the channel by which the data should be filtered. DEPRECATED: Will be removed in Saleor 4.0.Use root-level channel argument instead.
	"""
	channel: String
}

input MetadataFilter{
	"""
	Key of a metadata item.
	"""
	key: String!
	"""
	Value of a metadata item.
	"""
	value: String
}

"""
Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront.
"""
type Category implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String!
	description: JSONString
	slug: String!
	parent: Category
	level: Int!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Description of the category (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	List of ancestors of the category.
	"""
	ancestors(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CategoryCountableConnection
	"""
	List of products in the category.
	"""
	products(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductCountableConnection
	"""
	List of children of the category.
	"""
	children(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CategoryCountableConnection
	backgroundImage(
		"""
		Size of the image.
		"""
		size: Int
	): Image
	"""
	Returns translated category fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for category.
		"""
		languageCode: LanguageCodeEnum!
	): CategoryTranslation
}

type CategoryCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [CategoryCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type CategoryCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Category!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

"""
Represents an image.
"""
type Image{
	"""
	The URL of the image.
	"""
	url: String!
	"""
	Alt text for an image.
	"""
	alt: String
}

type CategoryTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String
	description: JSONString
	"""
	Translation language.
	"""
	language: LanguageDisplay!
	"""
	Translated description of the product (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
}

"""
Represents a version of a product such as different size or color.
"""
type ProductVariant implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	sku: String!
	product: Product!
	trackInventory: Boolean!
	weight: Weight
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Channel given to retrieve this product variant. Also used by federation gateway to resolve this object in a federated query.
	"""
	channel: String
	"""
	List of price information in channels for the product.
	"""
	channelListings: [ProductVariantChannelListing!]
	"""
	Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
	"""
	pricing(
		"""
		Destination address used to find warehouses where stock availability for this product is checked. If address is empty, uses  or fallbacks to server's  configuration.
		"""
		address: AddressInput
	): VariantPricingInfo
	"""
	List of attributes assigned to this variant.
	"""
	attributes(
		"""
		Define scope of returned attributes.
		"""
		variantSelection: VariantAttributeScope
	): [SelectedAttribute!]!
	"""
	Gross margin percentage value.
	"""
	margin: Int
	"""
	Total quantity ordered.
	"""
	quantityOrdered: Int
	"""
	Total revenue generated by a variant in given period of time. Note: this field should be queried using  query as it uses optimizations suitable for such calculations.
	"""
	revenue(
		period: ReportingPeriod
	): TaxedMoney
	"""
	List of images for the product variant.
	"""
	images: [ProductImage] @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  instead."
)
	"""
	List of media for the product variant.
	"""
	media: [ProductMedia!]
	"""
	Returns translated product variant fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for product variant.
		"""
		languageCode: LanguageCodeEnum!
	): ProductVariantTranslation
	"""
	Digital content for the product variant.
	"""
	digitalContent: DigitalContent
	"""
	Stocks for the product variant.
	"""
	stocks(
		"""
		Destination address used to find warehouses where stock availability for this product is checked. If address is empty, uses  or fallbacks to server's  configuration.
		"""
		address: AddressInput
		"""
		DEPRECATED: use  argument instead. This argument will be removed in Saleor 4.0. Two-letter ISO 3166-1 country code.
		"""
		countryCode: CountryCode
	): [Stock]
	"""
	Quantity of a product available for sale in one checkout.
	"""
	quantityAvailable(
		"""
		Destination address used to find warehouses where stock availability for this product is checked. If address is empty, uses  or fallbacks to server's  configuration.
		"""
		address: AddressInput
		"""
		DEPRECATED: use  argument instead. This argument will be removed in Saleor 4.0.Two-letter ISO 3166-1 country code. When provided, the exact quantity from a warehouse operating in shipping zones that contain this country will be returned. Otherwise, it will return the maximum quantity from all shipping zones.
		"""
		countryCode: CountryCode
	): Int!
}

"""
Represents product varaint channel listing.
"""
type ProductVariantChannelListing implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	channel: Channel!
	price: Money
	"""
	Cost price of the variant.
	"""
	costPrice: Money
	"""
	Gross margin percentage value.
	"""
	margin: Int
}

"""
Represents availability of a variant in the storefront.
"""
type VariantPricingInfo{
	"""
	Whether it is in sale or not.
	"""
	onSale: Boolean
	"""
	The discount amount if in sale (null otherwise).
	"""
	discount: TaxedMoney
	"""
	The discount amount in the local currency.
	"""
	discountLocalCurrency: TaxedMoney
	"""
	The price, with any discount subtracted.
	"""
	price: TaxedMoney
	"""
	The price without any discount.
	"""
	priceUndiscounted: TaxedMoney
	"""
	The discounted price in the local currency.
	"""
	priceLocalCurrency: TaxedMoney
}

"""
Represents a monetary value with taxes. In cases where taxes were not applied, net and gross values will be equal.
"""
type TaxedMoney{
	"""
	Currency code.
	"""
	currency: String!
	"""
	Amount of money including taxes.
	"""
	gross: Money!
	"""
	Amount of money without taxes.
	"""
	net: Money!
	"""
	Amount of taxes.
	"""
	tax: Money!
}

input AddressInput{
	"""
	Given name.
	"""
	firstName: String
	"""
	Family name.
	"""
	lastName: String
	"""
	Company or organization.
	"""
	companyName: String
	"""
	Address.
	"""
	streetAddress1: String
	"""
	Address.
	"""
	streetAddress2: String
	"""
	City.
	"""
	city: String
	"""
	District.
	"""
	cityArea: String
	"""
	Postal code.
	"""
	postalCode: String
	"""
	Country.
	"""
	country: CountryCode
	"""
	State or province.
	"""
	countryArea: String
	"""
	Phone number.
	"""
	phone: String
}

"""
An enumeration.
"""
enum CountryCode{
	AF
	AX
	AL
	DZ
	AS
	AD
	AO
	AI
	AQ
	AG
	AR
	AM
	AW
	AU
	AT
	AZ
	BS
	BH
	BD
	BB
	BY
	BE
	BZ
	BJ
	BM
	BT
	BO
	BQ
	BA
	BW
	BV
	BR
	IO
	BN
	BG
	BF
	BI
	CV
	KH
	CM
	CA
	KY
	CF
	TD
	CL
	CN
	CX
	CC
	CO
	KM
	CG
	CD
	CK
	CR
	CI
	HR
	CU
	CW
	CY
	CZ
	DK
	DJ
	DM
	DO
	EC
	EG
	SV
	GQ
	ER
	EE
	SZ
	ET
	EU
	FK
	FO
	FJ
	FI
	FR
	GF
	PF
	TF
	GA
	GM
	GE
	DE
	GH
	GI
	GR
	GL
	GD
	GP
	GU
	GT
	GG
	GN
	GW
	GY
	HT
	HM
	VA
	HN
	HK
	HU
	IS
	IN
	ID
	IR
	IQ
	IE
	IM
	IL
	IT
	JM
	JP
	JE
	JO
	KZ
	KE
	KI
	KW
	KG
	LA
	LV
	LB
	LS
	LR
	LY
	LI
	LT
	LU
	MO
	MG
	MW
	MY
	MV
	ML
	MT
	MH
	MQ
	MR
	MU
	YT
	MX
	FM
	MD
	MC
	MN
	ME
	MS
	MA
	MZ
	MM
	NA
	NR
	NP
	NL
	NC
	NZ
	NI
	NE
	NG
	NU
	NF
	KP
	MK
	MP
	NO
	OM
	PK
	PW
	PS
	PA
	PG
	PY
	PE
	PH
	PN
	PL
	PT
	PR
	QA
	RE
	RO
	RU
	RW
	BL
	SH
	KN
	LC
	MF
	PM
	VC
	WS
	SM
	ST
	SA
	SN
	RS
	SC
	SL
	SG
	SX
	SK
	SI
	SB
	SO
	ZA
	GS
	KR
	SS
	ES
	LK
	SD
	SR
	SJ
	SE
	CH
	SY
	TW
	TJ
	TZ
	TH
	TL
	TG
	TK
	TO
	TT
	TN
	TR
	TM
	TC
	TV
	UG
	UA
	AE
	GB
	UM
	US
	UY
	UZ
	VU
	VE
	VN
	VG
	VI
	WF
	EH
	YE
	ZM
	ZW
}

"""
Represents a custom attribute.
"""
type SelectedAttribute{
	"""
	Name of an attribute displayed in the interface.
	"""
	attribute: Attribute!
	"""
	Values of an attribute.
	"""
	values: [AttributeValue!]
}

enum ReportingPeriod{
	TODAY
	THIS_MONTH
}

"""
Represents a product image.
"""
type ProductImage{
	"""
	The ID of the image.
	"""
	id: ID!
	"""
	The alt text of the image.
	"""
	alt: String
	"""
	The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged.
	"""
	sortOrder: Int
	"""
	The URL of the image.
	"""
	url(
		"""
		Size of the image.
		"""
		size: Int
	): String!
}

"""
Represents a product media.
"""
type ProductMedia implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	sortOrder: Int
	alt: String!
	type: ProductMediaType!
	oembedData: JSONString!
	"""
	The URL of the media.
	"""
	url(
		"""
		Size of the image.
		"""
		size: Int
	): String!
}

"""
An enumeration.
"""
enum ProductMediaType{
	"""
	An uploaded image or an URL to an image
	"""
	IMAGE
	"""
	A URL to an external video
	"""
	VIDEO
}

type ProductVariantTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	"""
	Translation language.
	"""
	language: LanguageDisplay!
}

type DigitalContent implements Node & ObjectWithMetadata{
	useDefaultSettings: Boolean!
	automaticFulfillment: Boolean!
	contentFile: String!
	maxDownloads: Int
	urlValidDays: Int
	"""
	List of URLs for the digital variant.
	"""
	urls: [DigitalContentUrl]
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Product variant assigned to digital content.
	"""
	productVariant: ProductVariant!
}

type DigitalContentUrl implements Node{
	content: DigitalContent!
	created: DateTime!
	downloadNum: Int!
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	URL for digital content.
	"""
	url: String
	"""
	UUID of digital content.
	"""
	token: UUID!
}

scalar UUID

"""
Represents stock.
"""
type Stock implements Node{
	warehouse: Warehouse!
	productVariant: ProductVariant!
	"""
	Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
	"""
	quantity: Int!
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Quantity allocated for orders
	"""
	quantityAllocated: Int!
}

"""
Represents availability of a product in the storefront.
"""
type ProductPricingInfo{
	"""
	Whether it is in sale or not.
	"""
	onSale: Boolean
	"""
	The discount amount if in sale (null otherwise).
	"""
	discount: TaxedMoney
	"""
	The discount amount in the local currency.
	"""
	discountLocalCurrency: TaxedMoney
	"""
	The discounted price range of the product variants.
	"""
	priceRange: TaxedMoneyRange
	"""
	The undiscounted price range of the product variants.
	"""
	priceRangeUndiscounted: TaxedMoneyRange
	"""
	The discounted price range of the product variants in the local currency.
	"""
	priceRangeLocalCurrency: TaxedMoneyRange
}

"""
Represents a range of monetary values.
"""
type TaxedMoneyRange{
	"""
	Lower bound of a price range.
	"""
	start: TaxedMoney
	"""
	Upper bound of a price range.
	"""
	stop: TaxedMoney
}

"""
Represents product channel listing.
"""
type ProductChannelListing implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	publicationDate: Date
	isPublished: Boolean!
	channel: Channel!
	visibleInListings: Boolean!
	availableForPurchase: Date
	"""
	The price of the cheapest variant (including discounts).
	"""
	discountedPrice: Money
	"""
	Purchase cost of product.
	"""
	purchaseCost: MoneyRange
	"""
	Range of margin percentage value.
	"""
	margin: Margin
	"""
	Whether the product is available for purchase.
	"""
	isAvailableForPurchase: Boolean
	"""
	Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
	"""
	pricing(
		"""
		Destination address used to find warehouses where stock availability for this product is checked. If address is empty, uses  or fallbacks to server's  configuration.
		"""
		address: AddressInput
	): ProductPricingInfo
}

type Margin{
	start: Int
	stop: Int
}

"""
Represents a collection of products.
"""
type Collection implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String!
	description: JSONString
	slug: String!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Channel given to retrieve this collection. Also used by federation gateway to resolve this object in a federated query.
	"""
	channel: String
	"""
	Description of the collection (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	List of products in this collection.
	"""
	products(
		"""
		Filtering options for products.
		"""
		filter: ProductFilterInput
		"""
		Sort products.
		"""
		sortBy: ProductOrder
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductCountableConnection
	backgroundImage(
		"""
		Size of the image.
		"""
		size: Int
	): Image
	"""
	Returns translated collection fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for collection.
		"""
		languageCode: LanguageCodeEnum!
	): CollectionTranslation
	"""
	List of channels in which the collection is available.
	"""
	channelListings: [CollectionChannelListing!]
}

input ProductFilterInput{
	isPublished: Boolean
	collections: [ID]
	categories: [ID]
	hasCategory: Boolean
	attributes: [AttributeInput]
	stockAvailability: StockAvailability
	stocks: ProductStockFilterInput
	search: String
	metadata: [MetadataFilter]
	price: PriceRangeInput
	minimalPrice: PriceRangeInput
	productTypes: [ID]
	ids: [ID]
	"""
	Specifies the channel by which the data should be filtered. DEPRECATED: Will be removed in Saleor 4.0.Use root-level channel argument instead.
	"""
	channel: String
}

input AttributeInput{
	"""
	Internal representation of an attribute name.
	"""
	slug: String!
	"""
	Internal representation of a value (unique per attribute).
	"""
	values: [String]
	"""
	The range that the returned values should be in.
	"""
	valuesRange: IntRangeInput
	"""
	The date time range that the returned values should be in.
	"""
	dateTime: DateTimeRangeInput
	"""
	The date range that the returned values should be in.
	"""
	date: DateRangeInput
	"""
	The boolean value of the attribute.
	"""
	boolean: Boolean
}

input IntRangeInput{
	"""
	Value greater than or equal to.
	"""
	gte: Int
	"""
	Value less than or equal to.
	"""
	lte: Int
}

input DateTimeRangeInput{
	"""
	Start date.
	"""
	gte: DateTime
	"""
	End date.
	"""
	lte: DateTime
}

input DateRangeInput{
	"""
	Start date.
	"""
	gte: Date
	"""
	End date.
	"""
	lte: Date
}

enum StockAvailability{
	IN_STOCK
	OUT_OF_STOCK
}

input ProductStockFilterInput{
	warehouseIds: [ID!]
	quantity: IntRangeInput
}

input PriceRangeInput{
	"""
	Price greater than or equal to.
	"""
	gte: Float
	"""
	Price less than or equal to.
	"""
	lte: Float
}

input ProductOrder{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Specifies the channel in which to sort the data. DEPRECATED: Will be removed in Saleor 4.0.Use root-level channel argument instead.
	"""
	channel: String
	"""
	Sort product by the selected attribute's values.
	Note: this doesn't take translations into account yet.
	"""
	attributeId: ID
	"""
	Sort products by the selected field.
	"""
	field: ProductOrderField
}

enum ProductOrderField{
	"""
	Sort products by name.
	"""
	NAME
	"""
	Sort products by rank. Note: This option is available only with the  filter.
	"""
	RANK
	"""
	Sort products by price.
	"""
	PRICE
	"""
	Sort products by a minimal price of a product's variant.
	"""
	MINIMAL_PRICE
	"""
	Sort products by update date.
	"""
	DATE
	"""
	Sort products by type.
	"""
	TYPE
	"""
	Sort products by publication status.
	"""
	PUBLISHED
	"""
	Sort products by publication date.
	"""
	PUBLICATION_DATE
	"""
	Sort products by collection. Note: This option is available only for the  query.
	"""
	COLLECTION
	"""
	Sort products by rating.
	"""
	RATING
}

type CollectionTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String
	description: JSONString
	"""
	Translation language.
	"""
	language: LanguageDisplay!
	"""
	Translated description of the product (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
}

"""
Represents collection channel listing.
"""
type CollectionChannelListing implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	publicationDate: Date
	isPublished: Boolean!
	channel: Channel!
}

type ProductTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String
	description: JSONString
	"""
	Translation language.
	"""
	language: LanguageDisplay!
	"""
	Translated description of the product (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
}

"""
Represents user address data.
"""
type Address implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	firstName: String!
	lastName: String!
	companyName: String!
	streetAddress1: String!
	streetAddress2: String!
	city: String!
	cityArea: String!
	postalCode: String!
	"""
	Shop's default country.
	"""
	country: CountryDisplay!
	countryArea: String!
	phone: String
	"""
	Address is user's default shipping address.
	"""
	isDefaultShippingAddress: Boolean
	"""
	Address is user's default billing address.
	"""
	isDefaultBillingAddress: Boolean
}

type WarehouseCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [WarehouseCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type WarehouseCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Warehouse!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input WarehouseFilterInput{
	search: String
	ids: [ID]
}

input blabl{
	text: String
}

input WarehouseSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort warehouses by the selected field.
	"""
	field: WarehouseSortField!
}

enum WarehouseSortField{
	"""
	Sort warehouses by name.
	"""
	NAME
}

type TranslatableItemConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [TranslatableItemEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type TranslatableItemEdge{
	"""
	The item at the end of the edge.
	"""
	node: TranslatableItem!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

union TranslatableItem = ProductTranslatableContent | CollectionTranslatableContent | CategoryTranslatableContent | AttributeTranslatableContent | AttributeValueTranslatableContent | ProductVariantTranslatableContent | PageTranslatableContent | ShippingMethodTranslatableContent | SaleTranslatableContent | VoucherTranslatableContent | MenuItemTranslatableContent

type ProductTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String!
	description: JSONString
	"""
	Description of the product (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	Returns translated product fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for product.
		"""
		languageCode: LanguageCodeEnum!
	): ProductTranslation
	"""
	Represents an individual item for sale in the storefront.
	"""
	product: Product @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
	"""
	List of product attribute values that can be translated.
	"""
	attributeValues: [AttributeValueTranslatableContent!]!
}

type AttributeValueTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	richText: JSONString
	"""
	Returns translated attribute value fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for attribute value.
		"""
		languageCode: LanguageCodeEnum!
	): AttributeValueTranslation
	"""
	Represents a value of an attribute.
	"""
	attributeValue: AttributeValue @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
}

type CollectionTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String!
	description: JSONString
	"""
	Description of the collection (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	Returns translated collection fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for collection.
		"""
		languageCode: LanguageCodeEnum!
	): CollectionTranslation
	"""
	Represents a collection of products.
	"""
	collection: Collection @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
}

type CategoryTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	name: String!
	description: JSONString
	"""
	Description of the category (JSON).
	"""
	descriptionJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	Returns translated category fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for category.
		"""
		languageCode: LanguageCodeEnum!
	): CategoryTranslation
	"""
	Represents a single category of products.
	"""
	category: Category @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
}

type AttributeTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	"""
	Returns translated attribute fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for attribute.
		"""
		languageCode: LanguageCodeEnum!
	): AttributeTranslation
	"""
	Custom attribute of a product.
	"""
	attribute: Attribute @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
}

type ProductVariantTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	"""
	Returns translated product variant fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for product variant.
		"""
		languageCode: LanguageCodeEnum!
	): ProductVariantTranslation
	"""
	Represents a version of a product such as different size or color.
	"""
	productVariant: ProductVariant @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
	"""
	List of product variant attribute values that can be translated.
	"""
	attributeValues: [AttributeValueTranslatableContent!]!
}

type PageTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	title: String!
	content: JSONString
	"""
	Content of the page (JSON).
	"""
	contentJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	Returns translated page fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for page.
		"""
		languageCode: LanguageCodeEnum!
	): PageTranslation
	"""
	('A static page that can be manually added by a shop operator ', 'through the dashboard.')
	"""
	page: Page @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
	"""
	List of page content attribute values that can be translated.
	"""
	attributeValues: [AttributeValueTranslatableContent!]!
}

type PageTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	title: String
	content: JSONString
	"""
	Translation language.
	"""
	language: LanguageDisplay!
	"""
	Translated description of the page (JSON).
	"""
	contentJson: JSONString @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
}

"""
A static page that can be manually added by a shop operator through the dashboard.
"""
type Page implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	seoTitle: String
	seoDescription: String
	title: String!
	content: JSONString
	publicationDate: Date
	isPublished: Boolean!
	slug: String!
	pageType: PageType!
	created: DateTime!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Content of the page (JSON).
	"""
	contentJson: JSONString! @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field instead."
)
	"""
	Returns translated page fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for page.
		"""
		languageCode: LanguageCodeEnum!
	): PageTranslation
	"""
	List of attributes assigned to this product.
	"""
	attributes: [SelectedAttribute!]!
}

"""
Represents a type of page. It defines what attributes are available to pages of this type.
"""
type PageType implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	slug: String!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Page attributes of that page type.
	"""
	attributes: [Attribute]
	"""
	Attributes that can be assigned to the page type.
	"""
	availableAttributes(
		filter: AttributeFilterInput
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): AttributeCountableConnection
	"""
	Whether page type has pages assigned.
	"""
	hasPages: Boolean
}

type ShippingMethodTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	description: JSONString
	"""
	Returns translated shipping method fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for shipping method.
		"""
		languageCode: LanguageCodeEnum!
	): ShippingMethodTranslation
	"""
	Shipping method are the methods you'll use to get customer's orders  to them. They are directly exposed to the customers.
	"""
	shippingMethod: ShippingMethod @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
}

type SaleTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	"""
	Returns translated sale fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for sale.
		"""
		languageCode: LanguageCodeEnum!
	): SaleTranslation
	"""
	Sales allow creating discounts for categories, collections or products and are visible to all the customers.
	"""
	sale: Sale @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
}

type SaleTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String
	"""
	Translation language.
	"""
	language: LanguageDisplay!
}

"""
Sales allow creating discounts for categories, collections or products and are visible to all the customers.
"""
type Sale implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	type: SaleType!
	startDate: DateTime!
	endDate: DateTime
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	List of categories this sale applies to.
	"""
	categories(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CategoryCountableConnection
	"""
	List of collections this sale applies to.
	"""
	collections(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CollectionCountableConnection
	"""
	List of products this sale applies to.
	"""
	products(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductCountableConnection
	"""
	Returns translated sale fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for sale.
		"""
		languageCode: LanguageCodeEnum!
	): SaleTranslation
	"""
	List of channels available for the sale.
	"""
	channelListings: [SaleChannelListing!]
	"""
	Sale value.
	"""
	discountValue: Float
	"""
	Currency code for sale.
	"""
	currency: String
}

"""
An enumeration.
"""
enum SaleType{
	"""
	fixed
	"""
	FIXED
	"""
	%
	"""
	PERCENTAGE
}

type CollectionCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [CollectionCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type CollectionCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Collection!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

"""
Represents sale channel listing.
"""
type SaleChannelListing implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	channel: Channel!
	discountValue: Float!
	currency: String!
}

type VoucherTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String
	"""
	Returns translated voucher fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for voucher.
		"""
		languageCode: LanguageCodeEnum!
	): VoucherTranslation
	"""
	Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes.
	"""
	voucher: Voucher @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
}

type VoucherTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String
	"""
	Translation language.
	"""
	language: LanguageDisplay!
}

"""
Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes.
"""
type Voucher implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String
	"""
	Determines a type of voucher.
	"""
	type: VoucherTypeEnum!
	code: String!
	usageLimit: Int
	used: Int!
	startDate: DateTime!
	endDate: DateTime
	applyOncePerOrder: Boolean!
	applyOncePerCustomer: Boolean!
	onlyForStaff: Boolean!
	"""
	Determines a type of discount for voucher - value or percentage
	"""
	discountValueType: DiscountValueTypeEnum!
	minCheckoutItemsQuantity: Int
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	List of categories this voucher applies to.
	"""
	categories(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CategoryCountableConnection
	"""
	List of collections this voucher applies to.
	"""
	collections(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): CollectionCountableConnection
	"""
	List of products this voucher applies to.
	"""
	products(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): ProductCountableConnection
	"""
	List of countries available for the shipping voucher.
	"""
	countries: [CountryDisplay]
	"""
	Returns translated voucher fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for voucher.
		"""
		languageCode: LanguageCodeEnum!
	): VoucherTranslation
	"""
	Voucher value.
	"""
	discountValue: Float
	"""
	Currency code for voucher.
	"""
	currency: String
	"""
	Minimum order value to apply voucher.
	"""
	minSpent: Money
	"""
	List of availability in channels for the voucher.
	"""
	channelListings: [VoucherChannelListing!]
}

enum VoucherTypeEnum{
	SHIPPING
	ENTIRE_ORDER
	SPECIFIC_PRODUCT
}

enum DiscountValueTypeEnum{
	FIXED
	PERCENTAGE
}

"""
Represents voucher channel listing.
"""
type VoucherChannelListing implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	channel: Channel!
	discountValue: Float!
	currency: String!
	minSpent: Money
}

type MenuItemTranslatableContent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	"""
	Returns translated menu item fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for menu item.
		"""
		languageCode: LanguageCodeEnum!
	): MenuItemTranslation
	"""
	Represents a single item of the related menu. Can store categories, collection or pages.
	"""
	menuItem: MenuItem @deprecated(
	reason: "Will be removed in Saleor 4.0. Get model fields from the root level."
)
}

type MenuItemTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	"""
	Translation language.
	"""
	language: LanguageDisplay!
}

"""
Represents a single item of the related menu. Can store categories, collection or pages.
"""
type MenuItem implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	menu: Menu!
	parent: MenuItem
	category: Category
	collection: Collection
	page: Page
	level: Int!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	children: [MenuItem]
	"""
	URL to the menu item.
	"""
	url: String
	"""
	Returns translated menu item fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for menu item.
		"""
		languageCode: LanguageCodeEnum!
	): MenuItemTranslation
}

"""
Represents a single menu - an object that is used to help navigate through the store.
"""
type Menu implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	slug: String!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	items: [MenuItem]
}

enum TranslatableKinds{
	ATTRIBUTE
	ATTRIBUTE_VALUE
	CATEGORY
	COLLECTION
	MENU_ITEM
	PAGE
	PRODUCT
	SALE
	SHIPPING_METHOD
	VARIANT
	VOUCHER
}

type StockCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [StockCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type StockCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Stock!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input StockFilterInput{
	quantity: Float
	search: String
}

"""
Represents a shop resource containing general shop data and configuration.
"""
type Shop{
	"""
	List of available payment gateways.
	"""
	availablePaymentGateways(
		"""
		DEPRECATED: use  argument instead. This argument will be removed in Saleor 4.0.A currency for which gateways will be returned.
		"""
		currency: String
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): [PaymentGateway!]!
	"""
	List of available external authentications.
	"""
	availableExternalAuthentications: [ExternalAuthentication!]!
	"""
	Shipping methods that are available for the shop.
	"""
	availableShippingMethods(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String!
		"""
		Address for which available shipping methods should be returned.
		"""
		address: AddressInput
	): [ShippingMethod]
	"""
	List of countries available in the shop.
	"""
	countries(
		"""
		DEPRECATED: This argument will be removed in Saleor 4.0. A language code to return the translation for.
		"""
		languageCode: LanguageCodeEnum
	): [CountryDisplay!]!
	"""
	Shop's default country.
	"""
	defaultCountry: CountryDisplay
	"""
	Default shop's email sender's name.
	"""
	defaultMailSenderName: String
	"""
	Default shop's email sender's address.
	"""
	defaultMailSenderAddress: String
	"""
	Shop's description.
	"""
	description: String
	"""
	Shop's domain data.
	"""
	domain: Domain!
	"""
	List of the shops's supported languages.
	"""
	languages: [LanguageDisplay!]
	"""
	Shop's name.
	"""
	name: String!
	"""
	List of available permissions.
	"""
	permissions: [Permission!]
	"""
	List of possible phone prefixes.
	"""
	phonePrefixes: [String!]
	"""
	Header text.
	"""
	headerText: String
	"""
	Include taxes in prices.
	"""
	includeTaxesInPrices: Boolean!
	"""
	Display prices with tax in store.
	"""
	displayGrossPrices: Boolean!
	"""
	Charge taxes on shipping.
	"""
	chargeTaxesOnShipping: Boolean!
	"""
	Enable inventory tracking.
	"""
	trackInventoryByDefault: Boolean
	"""
	Default weight unit.
	"""
	defaultWeightUnit: WeightUnitsEnum
	"""
	Returns translated shop fields for the given language code.
	"""
	translation(
		"""
		A language code to return the translation for shop.
		"""
		languageCode: LanguageCodeEnum!
	): ShopTranslation
	"""
	Enable automatic fulfillment for all digital products.
	"""
	automaticFulfillmentDigitalProducts: Boolean
	"""
	Default number of max downloads per digital content URL.
	"""
	defaultDigitalMaxDownloads: Int
	"""
	Default number of days which digital content URL will be valid.
	"""
	defaultDigitalUrlValidDays: Int
	"""
	Company address.
	"""
	companyAddress: Address
	"""
	URL of a view where customers can set their password.
	"""
	customerSetPasswordUrl: String
	"""
	List of staff notification recipients.
	"""
	staffNotificationRecipients: [StaffNotificationRecipient]
	"""
	Resource limitations and current usage if any set for a shop
	"""
	limits: LimitInfo!
	"""
	Saleor API version.
	"""
	version: String!
}

"""
Available payment gateway backend with configuration necessary to setup client.
"""
type PaymentGateway{
	"""
	Payment gateway name.
	"""
	name: String!
	"""
	Payment gateway ID.
	"""
	id: ID!
	"""
	Payment gateway client configuration.
	"""
	config: [GatewayConfigLine!]!
	"""
	Payment gateway supported currencies.
	"""
	currencies: [String!]
}

"""
Payment gateway client configuration key and value pair.
"""
type GatewayConfigLine{
	"""
	Gateway config key.
	"""
	field: String!
	"""
	Gateway config value for key.
	"""
	value: String
}

type ExternalAuthentication{
	"""
	ID of external authentication plugin.
	"""
	id: String!
	"""
	Name of external authentication plugin.
	"""
	name: String
}

"""
Represents shop's domain.
"""
type Domain{
	"""
	The host name of the domain.
	"""
	host: String!
	"""
	Inform if SSL is enabled.
	"""
	sslEnabled: Boolean!
	"""
	Shop's absolute URL.
	"""
	url: String!
}

type ShopTranslation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	headerText: String!
	description: String!
	"""
	Translation language.
	"""
	language: LanguageDisplay!
}

"""
Represents a recipient of email notifications send by Saleor, such as notifications about new orders. Notifications can be assigned to staff users or arbitrary email addresses.
"""
type StaffNotificationRecipient implements Node{
	"""
	Returns a user subscribed to email notifications.
	"""
	user: User
	"""
	Determines if a notification active.
	"""
	active: Boolean
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Returns email address of a user subscribed to email notifications.
	"""
	email: String
}

"""
Represents user data.
"""
type User implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	lastLogin: DateTime
	email: String!
	firstName: String!
	lastName: String!
	isStaff: Boolean!
	isActive: Boolean!
	"""
	A note about the customer.
	"""
	note: String
	dateJoined: DateTime!
	defaultShippingAddress: Address
	defaultBillingAddress: Address
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	List of all user's addresses.
	"""
	addresses: [Address]
	"""
	Returns the last open checkout of this user.
	"""
	checkout: Checkout @deprecated(
	reason: "Will be removed in Saleor 4.0. Use the  field to fetch the user checkouts."
)
	"""
	Returns the checkout UUID's assigned to this user.
	"""
	checkoutTokens(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): [UUID!]
	"""
	List of the user gift cards.
	"""
	giftCards(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): GiftCardCountableConnection
	"""
	List of user's orders.
	"""
	orders(
		"""
		Return the elements in the list that come before the specified cursor.
		"""
		before: String
		"""
		Return the elements in the list that come after the specified cursor.
		"""
		after: String
		"""
		Return the first n elements from the list.
		"""
		first: Int
		"""
		Return the last n elements from the list.
		"""
		last: Int
	): OrderCountableConnection
	"""
	List of user's permissions.
	"""
	userPermissions: [UserPermission]
	"""
	List of user's permission groups.
	"""
	permissionGroups: [Group]
	"""
	List of user's permission groups which user can manage.
	"""
	editableGroups: [Group]
	avatar(
		"""
		Size of the avatar.
		"""
		size: Int
	): Image
	"""
	List of events associated with the user.
	"""
	events: [CustomerEvent]
	"""
	List of stored payment sources.
	"""
	storedPaymentSources(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
	): [PaymentSource]
	"""
	User language code.
	"""
	languageCode: LanguageCodeEnum!
}

"""
Checkout object.
"""
type Checkout implements Node & ObjectWithMetadata{
	created: DateTime!
	lastChange: DateTime!
	user: User
	channel: Channel!
	billingAddress: Address
	shippingAddress: Address
	note: String!
	discount: Money
	discountName: String
	translatedDiscountName: String
	voucherCode: String
	"""
	List of gift cards associated with this checkout.
	"""
	giftCards: [GiftCard]
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Shipping methods that can be used with this order.
	"""
	availableShippingMethods: [ShippingMethod!]
	"""
	List of available payment gateways.
	"""
	availablePaymentGateways: [PaymentGateway!]!
	"""
	Email of a customer.
	"""
	email: String!
	"""
	Returns True, if checkout requires shipping.
	"""
	isShippingRequired: Boolean!
	"""
	The number of items purchased.
	"""
	quantity: Int!
	"""
	A list of checkout lines, each containing information about an item in the checkout.
	"""
	lines: [CheckoutLine]
	"""
	The price of the shipping, with all the taxes included.
	"""
	shippingPrice: TaxedMoney
	"""
	The shipping method related with checkout.
	"""
	shippingMethod: ShippingMethod
	"""
	The price of the checkout before shipping, with taxes included.
	"""
	subtotalPrice: TaxedMoney
	"""
	The checkout's token.
	"""
	token: UUID!
	"""
	The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
	"""
	totalPrice: TaxedMoney
	"""
	Checkout language code.
	"""
	languageCode: LanguageCodeEnum!
}

"""
A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes.
"""
type GiftCard implements Node{
	"""
	Gift card code.
	"""
	code: String
	"""
	The customer who bought a gift card.
	"""
	user: User
	created: DateTime!
	startDate: Date!
	endDate: Date
	lastUsedOn: DateTime
	isActive: Boolean!
	initialBalance: Money
	currentBalance: Money
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Code in format which allows displaying in a user interface.
	"""
	displayCode: String
}

"""
Represents an item in the checkout.
"""
type CheckoutLine implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	variant: ProductVariant!
	quantity: Int!
	"""
	The sum of the checkout line price, taxes and discounts.
	"""
	totalPrice: TaxedMoney
	"""
	Indicates whether the item need to be delivered.
	"""
	requiresShipping: Boolean
}

type GiftCardCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [GiftCardCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type GiftCardCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: GiftCard!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

type OrderCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [OrderCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type OrderCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Order!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

"""
Represents an order in the shop.
"""
type Order implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	created: DateTime!
	status: OrderStatus!
	user: User
	trackingClientId: String!
	billingAddress: Address
	shippingAddress: Address
	shippingMethod: ShippingMethod
	shippingMethodName: String
	channel: Channel!
	"""
	Total price of shipping.
	"""
	shippingPrice: TaxedMoney!
	shippingTaxRate: Float!
	token: String!
	voucher: Voucher
	"""
	List of user gift cards.
	"""
	giftCards: [GiftCard]
	displayGrossPrices: Boolean!
	customerNote: String!
	weight: Weight
	redirectUrl: String
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	List of shipments for the order.
	"""
	fulfillments: [Fulfillment!]
	"""
	List of order lines.
	"""
	lines: [OrderLine!]
	"""
	List of actions that can be performed in the current state of an order.
	"""
	actions: [OrderAction!]
	"""
	Shipping methods that can be used with this order.
	"""
	availableShippingMethods: [ShippingMethod]
	"""
	List of order invoices.
	"""
	invoices: [Invoice]
	"""
	User-friendly number of an order.
	"""
	number: String
	"""
	The ID of the order that was the base for this order.
	"""
	original: ID
	"""
	The order origin.
	"""
	origin: OrderOriginEnum!
	"""
	Informs if an order is fully paid.
	"""
	isPaid: Boolean!
	"""
	Internal payment status.
	"""
	paymentStatus: PaymentChargeStatusEnum!
	"""
	User-friendly payment status.
	"""
	paymentStatusDisplay: String!
	"""
	List of payments for the order.
	"""
	payments: [Payment]
	"""
	Total amount of the order.
	"""
	total: TaxedMoney!
	"""
	Undiscounted total amount of the order.
	"""
	undiscountedTotal: TaxedMoney!
	"""
	The sum of line prices not including shipping.
	"""
	subtotal: TaxedMoney!
	"""
	User-friendly order status.
	"""
	statusDisplay: String
	"""
	Informs whether a draft order can be finalized(turned into a regular order).
	"""
	canFinalize: Boolean!
	"""
	Amount authorized for the order.
	"""
	totalAuthorized: Money!
	"""
	Amount captured by payment.
	"""
	totalCaptured: Money!
	"""
	List of events associated with the order.
	"""
	events: [OrderEvent]
	"""
	The difference between the paid and the order total amount.
	"""
	totalBalance: Money!
	"""
	Email address of the customer.
	"""
	userEmail: String
	"""
	Returns True, if order requires shipping.
	"""
	isShippingRequired: Boolean!
	languageCode: String! @deprecated(
	reason: "Use the  field to fetch the language code. This field will be removed in Saleor 4.0."
)
	"""
	Order language code.
	"""
	languageCodeEnum: LanguageCodeEnum!
	"""
	Returns applied discount.
	"""
	discount: Money @deprecated(
	reason: "Use discounts field. This field will be removed in Saleor 4.0."
)
	"""
	Discount name.
	"""
	discountName: String @deprecated(
	reason: "Use discounts field. This field will be removed in Saleor 4.0."
)
	"""
	Translated discount name.
	"""
	translatedDiscountName: String @deprecated(
	reason: "Use discounts field. This field will be removed in Saleor 4.0."
)
	"""
	List of all discounts assigned to the order.
	"""
	discounts: [OrderDiscount!]
	"""
	List of errors that occurred during order validation.
	"""
	errors: [OrderError!]!
}

"""
An enumeration.
"""
enum OrderStatus{
	"""
	Draft
	"""
	DRAFT
	"""
	Unconfirmed
	"""
	UNCONFIRMED
	"""
	Unfulfilled
	"""
	UNFULFILLED
	"""
	Partially fulfilled
	"""
	PARTIALLY_FULFILLED
	"""
	Partially returned
	"""
	PARTIALLY_RETURNED
	"""
	Returned
	"""
	RETURNED
	"""
	Fulfilled
	"""
	FULFILLED
	"""
	Canceled
	"""
	CANCELED
}

"""
Represents order fulfillment.
"""
type Fulfillment implements Node & ObjectWithMetadata{
	"""
	The ID of the object.
	"""
	id: ID!
	fulfillmentOrder: Int!
	status: FulfillmentStatus!
	trackingNumber: String!
	created: DateTime!
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	List of lines for the fulfillment.
	"""
	lines: [FulfillmentLine]
	"""
	User-friendly fulfillment status.
	"""
	statusDisplay: String
	"""
	Warehouse from fulfillment was fulfilled.
	"""
	warehouse: Warehouse
}

"""
An enumeration.
"""
enum FulfillmentStatus{
	"""
	Fulfilled
	"""
	FULFILLED
	"""
	Refunded
	"""
	REFUNDED
	"""
	Returned
	"""
	RETURNED
	"""
	Replaced
	"""
	REPLACED
	"""
	Refunded and returned
	"""
	REFUNDED_AND_RETURNED
	"""
	Canceled
	"""
	CANCELED
}

"""
Represents line of the fulfillment.
"""
type FulfillmentLine implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	quantity: Int!
	orderLine: OrderLine
}

"""
Represents order line of particular order.
"""
type OrderLine implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	productName: String!
	variantName: String!
	productSku: String!
	isShippingRequired: Boolean!
	quantity: Int!
	quantityFulfilled: Int!
	unitDiscountReason: String
	taxRate: Float!
	digitalContentUrl: DigitalContentUrl
	"""
	The main thumbnail for the ordered product.
	"""
	thumbnail(
		"""
		Size of thumbnail.
		"""
		size: Int
	): Image
	"""
	Price of the single item in the order line.
	"""
	unitPrice: TaxedMoney!
	"""
	Price of the single item in the order line without applied an order line discount.
	"""
	undiscountedUnitPrice: TaxedMoney!
	"""
	The discount applied to the single order line.
	"""
	unitDiscount: Money!
	"""
	Value of the discount. Can store fixed value or percent value
	"""
	unitDiscountValue: PositiveDecimal!
	"""
	Price of the order line.
	"""
	totalPrice: TaxedMoney!
	"""
	A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
	"""
	variant: ProductVariant
	"""
	Product name in the customer's language
	"""
	translatedProductName: String!
	"""
	Variant name in the customer's language
	"""
	translatedVariantName: String!
	"""
	List of allocations across warehouses.
	"""
	allocations: [Allocation!]
	"""
	Type of the discount: fixed or percent
	"""
	unitDiscountType: DiscountValueTypeEnum
}

"""
Positive Decimal scalar implementation.

Should be used in places where value must be positive.
"""
scalar PositiveDecimal

"""
Represents allocation.
"""
type Allocation implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Quantity allocated for orders.
	"""
	quantity: Int!
	"""
	The warehouse were items were allocated.
	"""
	warehouse: Warehouse!
}

enum OrderAction{
	"""
	Represents the capture action.
	"""
	CAPTURE
	"""
	Represents a mark-as-paid action.
	"""
	MARK_AS_PAID
	"""
	Represents a refund action.
	"""
	REFUND
	"""
	Represents a void action.
	"""
	VOID
}

"""
Represents an Invoice.
"""
type Invoice implements ObjectWithMetadata & Job & Node{
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	List of public metadata items. Can be accessed without permissions.
	"""
	metadata: [MetadataItem!]
	"""
	Job status.
	"""
	status: JobStatusEnum!
	number: String
	externalUrl: String
	"""
	List of private metadata items.Requires proper staff permissions to access.
	"""
	privateMetadata: [MetadataItem!]
	"""
	Created date time of job in ISO 8601 format.
	"""
	createdAt: DateTime!
	"""
	Date time of job last update in ISO 8601 format.
	"""
	updatedAt: DateTime!
	"""
	Job message.
	"""
	message: String
	"""
	URL to download an invoice.
	"""
	url: String
}

interface Job{
	"""
	Job status.
	"""
	status: JobStatusEnum!
	"""
	Created date time of job in ISO 8601 format.
	"""
	createdAt: DateTime!
	"""
	Date time of job last update in ISO 8601 format.
	"""
	updatedAt: DateTime!
	"""
	Job message.
	"""
	message: String
}

"""
An enumeration.
"""
enum JobStatusEnum{
	PENDING
	SUCCESS
	FAILED
	DELETED
}

"""
An enumeration.
"""
enum OrderOriginEnum{
	CHECKOUT
	DRAFT
	REISSUE
}

"""
An enumeration.
"""
enum PaymentChargeStatusEnum{
	NOT_CHARGED
	PENDING
	PARTIALLY_CHARGED
	FULLY_CHARGED
	PARTIALLY_REFUNDED
	FULLY_REFUNDED
	REFUSED
	CANCELLED
}

"""
Represents a payment of a given type.
"""
type Payment implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	gateway: String!
	isActive: Boolean!
	created: DateTime!
	modified: DateTime!
	token: String!
	checkout: Checkout
	order: Order
	paymentMethodType: String!
	customerIpAddress: String
	"""
	Internal payment status.
	"""
	chargeStatus: PaymentChargeStatusEnum!
	"""
	List of actions that can be performed in the current state of a payment.
	"""
	actions: [OrderAction!]
	"""
	Total amount of the payment.
	"""
	total: Money
	"""
	Total amount captured for this payment.
	"""
	capturedAmount: Money
	"""
	List of all transactions within this payment.
	"""
	transactions: [Transaction]
	"""
	Maximum amount of money that can be captured.
	"""
	availableCaptureAmount: Money
	"""
	Maximum amount of money that can be refunded.
	"""
	availableRefundAmount: Money
	"""
	The details of the card used for this payment.
	"""
	creditCard: CreditCard
}

"""
An object representing a single payment.
"""
type Transaction implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	created: DateTime!
	payment: Payment!
	token: String!
	kind: TransactionKind!
	isSuccess: Boolean!
	error: String
	gatewayResponse: JSONString!
	"""
	Total amount of the transaction.
	"""
	amount: Money
}

"""
An enumeration.
"""
enum TransactionKind{
	"""
	External reference
	"""
	EXTERNAL
	"""
	Authorization
	"""
	AUTH
	"""
	Pending
	"""
	PENDING
	"""
	Action to confirm
	"""
	ACTION_TO_CONFIRM
	"""
	Refund
	"""
	REFUND
	"""
	Refund in progress
	"""
	REFUND_ONGOING
	"""
	Capture
	"""
	CAPTURE
	"""
	Void
	"""
	VOID
	"""
	Confirm
	"""
	CONFIRM
	"""
	Cancel
	"""
	CANCEL
}

type CreditCard{
	"""
	Card brand.
	"""
	brand: String!
	"""
	First 4 digits of the card number.
	"""
	firstDigits: String
	"""
	Last 4 digits of the card number.
	"""
	lastDigits: String!
	"""
	Two-digit number representing the card’s expiration month.
	"""
	expMonth: Int
	"""
	Four-digit number representing the card’s expiration year.
	"""
	expYear: Int
}

"""
History log of the order.
"""
type OrderEvent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Date when event happened at in ISO 8601 format.
	"""
	date: DateTime
	"""
	Order event type.
	"""
	type: OrderEventsEnum
	"""
	User who performed the action.
	"""
	user: User
	"""
	App that performed the action.
	"""
	app: App
	"""
	Content of the event.
	"""
	message: String
	"""
	Email of the customer.
	"""
	email: String
	"""
	Type of an email sent to the customer.
	"""
	emailType: OrderEventsEmailsEnum
	"""
	Amount of money.
	"""
	amount: Float
	"""
	The payment ID from the payment gateway.
	"""
	paymentId: String
	"""
	The payment gateway of the payment.
	"""
	paymentGateway: String
	"""
	Number of items.
	"""
	quantity: Int
	"""
	Composed ID of the Fulfillment.
	"""
	composedId: String
	"""
	User-friendly number of an order.
	"""
	orderNumber: String
	"""
	Number of an invoice related to the order.
	"""
	invoiceNumber: String
	"""
	List of oversold lines names.
	"""
	oversoldItems: [String]
	"""
	The concerned lines.
	"""
	lines: [OrderEventOrderLineObject]
	"""
	The lines fulfilled.
	"""
	fulfilledItems: [FulfillmentLine]
	"""
	The warehouse were items were restocked.
	"""
	warehouse: Warehouse
	"""
	The transaction reference of captured payment.
	"""
	transactionReference: String
	"""
	Define if shipping costs were included to the refund.
	"""
	shippingCostsIncluded: Boolean
	"""
	The order which is related to this order.
	"""
	relatedOrder: Order
	"""
	The discount applied to the order.
	"""
	discount: OrderEventDiscountObject
}

"""
An enumeration.
"""
enum OrderEventsEnum{
	DRAFT_CREATED
	DRAFT_CREATED_FROM_REPLACE
	ADDED_PRODUCTS
	REMOVED_PRODUCTS
	PLACED
	PLACED_FROM_DRAFT
	OVERSOLD_ITEMS
	CANCELED
	ORDER_MARKED_AS_PAID
	ORDER_FULLY_PAID
	ORDER_REPLACEMENT_CREATED
	ORDER_DISCOUNT_ADDED
	ORDER_DISCOUNT_AUTOMATICALLY_UPDATED
	ORDER_DISCOUNT_UPDATED
	ORDER_DISCOUNT_DELETED
	ORDER_LINE_DISCOUNT_UPDATED
	ORDER_LINE_DISCOUNT_REMOVED
	ORDER_LINE_PRODUCT_DELETED
	ORDER_LINE_VARIANT_DELETED
	UPDATED_ADDRESS
	EMAIL_SENT
	CONFIRMED
	PAYMENT_AUTHORIZED
	PAYMENT_CAPTURED
	EXTERNAL_SERVICE_NOTIFICATION
	PAYMENT_REFUNDED
	PAYMENT_VOIDED
	PAYMENT_FAILED
	INVOICE_REQUESTED
	INVOICE_GENERATED
	INVOICE_UPDATED
	INVOICE_SENT
	FULFILLMENT_CANCELED
	FULFILLMENT_RESTOCKED_ITEMS
	FULFILLMENT_FULFILLED_ITEMS
	FULFILLMENT_REFUNDED
	FULFILLMENT_RETURNED
	FULFILLMENT_REPLACED
	TRACKING_UPDATED
	NOTE_ADDED
	OTHER
}

"""
An enumeration.
"""
enum OrderEventsEmailsEnum{
	PAYMENT_CONFIRMATION
	CONFIRMED
	SHIPPING_CONFIRMATION
	TRACKING_UPDATED
	ORDER_CONFIRMATION
	ORDER_CANCEL
	ORDER_REFUND
	FULFILLMENT_CONFIRMATION
	DIGITAL_LINKS
}

type OrderEventOrderLineObject{
	"""
	The variant quantity.
	"""
	quantity: Int
	"""
	The order line.
	"""
	orderLine: OrderLine
	"""
	The variant name.
	"""
	itemName: String
	"""
	The discount applied to the order line.
	"""
	discount: OrderEventDiscountObject
}

type OrderEventDiscountObject{
	"""
	Type of the discount: fixed or percent.
	"""
	valueType: DiscountValueTypeEnum!
	"""
	Value of the discount. Can store fixed value or percent value.
	"""
	value: PositiveDecimal!
	"""
	Explanation for the applied discount.
	"""
	reason: String
	"""
	Returns amount of discount.
	"""
	amount: Money
	"""
	Type of the discount: fixed or percent.
	"""
	oldValueType: DiscountValueTypeEnum
	"""
	Value of the discount. Can store fixed value or percent value.
	"""
	oldValue: PositiveDecimal
	"""
	Returns amount of discount.
	"""
	oldAmount: Money
}

"""
Contains all details related to the applied discount to the order.
"""
type OrderDiscount implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	type: OrderDiscountType!
	"""
	Type of the discount: fixed or percent
	"""
	valueType: DiscountValueTypeEnum!
	"""
	Value of the discount. Can store fixed value or percent value
	"""
	value: PositiveDecimal!
	name: String
	translatedName: String
	"""
	Explanation for the applied discount.
	"""
	reason: String
	"""
	Returns amount of discount.
	"""
	amount: Money!
}

"""
An enumeration.
"""
enum OrderDiscountType{
	"""
	Voucher
	"""
	VOUCHER
	"""
	Manual
	"""
	MANUAL
}

type OrderError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: OrderErrorCode!
	"""
	Warehouse ID which causes the error.
	"""
	warehouse: ID
	"""
	List of order line IDs that cause the error.
	"""
	orderLines: [ID!]
	"""
	List of product variants that are associated with the error
	"""
	variants: [ID!]
	"""
	A type of address that causes the error.
	"""
	addressType: AddressTypeEnum
}

"""
An enumeration.
"""
enum OrderErrorCode{
	BILLING_ADDRESS_NOT_SET
	CANNOT_CANCEL_FULFILLMENT
	CANNOT_CANCEL_ORDER
	CANNOT_DELETE
	CANNOT_DISCOUNT
	CANNOT_REFUND
	CAPTURE_INACTIVE_PAYMENT
	NOT_EDITABLE
	FULFILL_ORDER_LINE
	GRAPHQL_ERROR
	INVALID
	PRODUCT_NOT_PUBLISHED
	PRODUCT_UNAVAILABLE_FOR_PURCHASE
	NOT_FOUND
	ORDER_NO_SHIPPING_ADDRESS
	PAYMENT_ERROR
	PAYMENT_MISSING
	REQUIRED
	SHIPPING_METHOD_NOT_APPLICABLE
	SHIPPING_METHOD_REQUIRED
	TAX_ERROR
	UNIQUE
	VOID_INACTIVE_PAYMENT
	ZERO_QUANTITY
	INVALID_QUANTITY
	INSUFFICIENT_STOCK
	DUPLICATED_INPUT_ITEM
	NOT_AVAILABLE_IN_CHANNEL
	CHANNEL_INACTIVE
}

"""
An enumeration.
"""
enum AddressTypeEnum{
	BILLING
	SHIPPING
}

type UserPermission{
	"""
	Internal code for permission.
	"""
	code: PermissionEnum!
	"""
	Describe action(s) allowed to do by permission.
	"""
	name: String!
	"""
	List of user permission groups which contains this permission.
	"""
	sourcePermissionGroups(
		"""
		ID of user whose groups should be returned.
		"""
		userId: ID!
	): [Group!]
}

"""
Represents permission group data.
"""
type Group implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	name: String!
	"""
	List of group permissions
	"""
	permissions: [Permission]
	"""
	List of group users
	"""
	users: [User]
	"""
	True, if the currently authenticated user has rights to manage a group.
	"""
	userCanManage: Boolean!
}

"""
History log of the customer.
"""
type CustomerEvent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Date when event happened at in ISO 8601 format.
	"""
	date: DateTime
	"""
	Customer event type.
	"""
	type: CustomerEventsEnum
	"""
	User who performed the action.
	"""
	user: User
	"""
	App that performed the action.
	"""
	app: App
	"""
	Content of the event.
	"""
	message: String
	"""
	Number of objects concerned by the event.
	"""
	count: Int
	"""
	The concerned order.
	"""
	order: Order
	"""
	The concerned order line.
	"""
	orderLine: OrderLine
}

"""
An enumeration.
"""
enum CustomerEventsEnum{
	ACCOUNT_CREATED
	PASSWORD_RESET_LINK_SENT
	PASSWORD_RESET
	EMAIL_CHANGED_REQUEST
	PASSWORD_CHANGED
	EMAIL_CHANGED
	PLACED_ORDER
	NOTE_ADDED_TO_ORDER
	DIGITAL_LINK_DOWNLOADED
	CUSTOMER_DELETED
	NAME_ASSIGNED
	EMAIL_ASSIGNED
	NOTE_ADDED
}

"""
Represents a payment source stored for user in payment gateway, such as credit card.
"""
type PaymentSource{
	"""
	Payment gateway name.
	"""
	gateway: String!
	"""
	ID of stored payment method.
	"""
	paymentMethodId: String
	"""
	Stored credit card details if available.
	"""
	creditCardInfo: CreditCard
}

type LimitInfo{
	"""
	Defines the current resource usage.
	"""
	currentUsage: Limits!
	"""
	Defines the allowed maximum resource usage, null means unlimited.
	"""
	allowedUsage: Limits!
}

type Limits{
	channels: Int
	orders: Int
	productVariants: Int
	staffUsers: Int
	warehouses: Int
}

"""
Order related settings from site settings.
"""
type OrderSettings{
	automaticallyConfirmAllNewOrders: Boolean!
}

input ShippingZoneFilterInput{
	search: String
	channels: [ID]
}

type DigitalContentCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [DigitalContentCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type DigitalContentCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: DigitalContent!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input CategoryFilterInput{
	search: String
	metadata: [MetadataFilter]
	ids: [ID]
}

input CategorySortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Specifies the channel in which to sort the data. DEPRECATED: Will be removed in Saleor 4.0.Use root-level channel argument instead.
	"""
	channel: String
	"""
	Sort categories by the selected field.
	"""
	field: CategorySortField!
}

enum CategorySortField{
	"""
	Sort categories by name.
	"""
	NAME
	"""
	Sort categories by product count.
	"""
	PRODUCT_COUNT
	"""
	Sort categories by subcategory count.
	"""
	SUBCATEGORY_COUNT
}

input CollectionFilterInput{
	published: CollectionPublished
	search: String
	metadata: [MetadataFilter]
	ids: [ID]
	"""
	Specifies the channel by which the data should be filtered. DEPRECATED: Will be removed in Saleor 4.0.Use root-level channel argument instead.
	"""
	channel: String
}

enum CollectionPublished{
	PUBLISHED
	HIDDEN
}

input CollectionSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Specifies the channel in which to sort the data. DEPRECATED: Will be removed in Saleor 4.0.Use root-level channel argument instead.
	"""
	channel: String
	"""
	Sort collections by the selected field.
	"""
	field: CollectionSortField!
}

enum CollectionSortField{
	"""
	Sort collections by name.
	"""
	NAME
	"""
	Sort collections by availability.
	"""
	AVAILABILITY
	"""
	Sort collections by product count.
	"""
	PRODUCT_COUNT
	"""
	Sort collections by publication date.
	"""
	PUBLICATION_DATE
}

input ProductTypeFilterInput{
	search: String
	configurable: ProductTypeConfigurable
	productType: ProductTypeEnum
	metadata: [MetadataFilter]
	ids: [ID]
}

enum ProductTypeConfigurable{
	CONFIGURABLE
	SIMPLE
}

enum ProductTypeEnum{
	DIGITAL
	SHIPPABLE
}

input ProductTypeSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort product types by the selected field.
	"""
	field: ProductTypeSortField!
}

enum ProductTypeSortField{
	"""
	Sort products by name.
	"""
	NAME
	"""
	Sort products by type.
	"""
	DIGITAL
	"""
	Sort products by shipping.
	"""
	SHIPPING_REQUIRED
}

type ProductVariantCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [ProductVariantCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type ProductVariantCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: ProductVariant!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input ProductVariantFilterInput{
	search: String
	sku: [String]
	metadata: [MetadataFilter]
}

type PaymentCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [PaymentCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type PaymentCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Payment!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input PaymentFilterInput{
	checkouts: [ID]
}

type PageCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [PageCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type PageCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Page!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input PageSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort pages by the selected field.
	"""
	field: PageSortField!
}

enum PageSortField{
	"""
	Sort pages by title.
	"""
	TITLE
	"""
	Sort pages by slug.
	"""
	SLUG
	"""
	Sort pages by visibility.
	"""
	VISIBILITY
	"""
	Sort pages by creation date.
	"""
	CREATION_DATE
	"""
	Sort pages by publication date.
	"""
	PUBLICATION_DATE
}

input PageFilterInput{
	search: String
	metadata: [MetadataFilter]
	pageTypes: [ID]
	ids: [ID]
}

type PageTypeCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [PageTypeCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type PageTypeCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: PageType!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input PageTypeSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort page types by the selected field.
	"""
	field: PageTypeSortField!
}

enum PageTypeSortField{
	"""
	Sort page types by name.
	"""
	NAME
	"""
	Sort page types by slug.
	"""
	SLUG
}

input PageTypeFilterInput{
	search: String
}

type OrderEventCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [OrderEventCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type OrderEventCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: OrderEvent!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input OrderSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort orders by the selected field.
	"""
	field: OrderSortField!
}

enum OrderSortField{
	"""
	Sort orders by number.
	"""
	NUMBER
	"""
	Sort orders by creation date.
	"""
	CREATION_DATE
	"""
	Sort orders by customer.
	"""
	CUSTOMER
	"""
	Sort orders by payment.
	"""
	PAYMENT
	"""
	Sort orders by fulfillment status.
	"""
	FULFILLMENT_STATUS
}

input OrderFilterInput{
	paymentStatus: [PaymentChargeStatusEnum]
	status: [OrderStatusFilter]
	customer: String
	created: DateRangeInput
	search: String
	metadata: [MetadataFilter]
	channels: [ID]
	ids: [ID]
}

enum OrderStatusFilter{
	READY_TO_FULFILL
	READY_TO_CAPTURE
	UNFULFILLED
	UNCONFIRMED
	PARTIALLY_FULFILLED
	FULFILLED
	CANCELED
}

input OrderDraftFilterInput{
	customer: String
	created: DateRangeInput
	search: String
	metadata: [MetadataFilter]
	channels: [ID]
}

type MenuCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [MenuCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type MenuCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Menu!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input MenuSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort menus by the selected field.
	"""
	field: MenuSortField!
}

enum MenuSortField{
	"""
	Sort menus by name.
	"""
	NAME
	"""
	Sort menus by items count.
	"""
	ITEMS_COUNT
}

input MenuFilterInput{
	search: String
	slug: [String]
	metadata: [MetadataFilter]
}

type MenuItemCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [MenuItemCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type MenuItemCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: MenuItem!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input MenuItemSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort menu items by the selected field.
	"""
	field: MenuItemsSortField!
}

enum MenuItemsSortField{
	"""
	Sort menu items by name.
	"""
	NAME
}

input MenuItemFilterInput{
	search: String
	metadata: [MetadataFilter]
}

"""
Plugin.
"""
type Plugin{
	"""
	Identifier of the plugin.
	"""
	id: ID!
	"""
	Name of the plugin.
	"""
	name: String!
	"""
	Description of the plugin.
	"""
	description: String!
	"""
	Global configuration of the plugin (not channel-specific).
	"""
	globalConfiguration: PluginConfiguration
	"""
	Channel-specific plugin configuration.
	"""
	channelConfigurations: [PluginConfiguration!]!
}

"""
Stores information about a configuration of plugin.
"""
type PluginConfiguration{
	"""
	Determines if plugin is active or not.
	"""
	active: Boolean!
	"""
	The channel to which the plugin configuration is assigned to.
	"""
	channel: Channel
	"""
	Configuration of the plugin.
	"""
	configuration: [ConfigurationItem]
}

"""
Stores information about a single configuration field.
"""
type ConfigurationItem{
	"""
	Name of the field.
	"""
	name: String!
	"""
	Current value of the field.
	"""
	value: String
	"""
	Type of the field.
	"""
	type: ConfigurationTypeFieldEnum
	"""
	Help text for the field.
	"""
	helpText: String
	"""
	Label for the field.
	"""
	label: String
}

"""
An enumeration.
"""
enum ConfigurationTypeFieldEnum{
	STRING
	MULTILINE
	BOOLEAN
	SECRET
	PASSWORD
	SECRETMULTILINE
	OUTPUT
}

type PluginCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [PluginCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type PluginCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Plugin!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input PluginFilterInput{
	statusInChannels: PluginStatusInChannelsInput
	search: String
	type: PluginConfigurationType
}

input PluginStatusInChannelsInput{
	active: Boolean!
	channels: [ID!]!
}

enum PluginConfigurationType{
	PER_CHANNEL
	GLOBAL
}

input PluginSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort plugins by the selected field.
	"""
	field: PluginSortField!
}

enum PluginSortField{
	NAME
	IS_ACTIVE
}

type SaleCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [SaleCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type SaleCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Sale!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input SaleFilterInput{
	status: [DiscountStatusEnum]
	saleType: DiscountValueTypeEnum
	started: DateTimeRangeInput
	search: String
	metadata: [MetadataFilter]
}

enum DiscountStatusEnum{
	ACTIVE
	EXPIRED
	SCHEDULED
}

input SaleSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Specifies the channel in which to sort the data. DEPRECATED: Will be removed in Saleor 4.0.Use root-level channel argument instead.
	"""
	channel: String
	"""
	Sort sales by the selected field.
	"""
	field: SaleSortField!
}

enum SaleSortField{
	"""
	Sort sales by name.
	"""
	NAME
	"""
	Sort sales by start date.
	"""
	START_DATE
	"""
	Sort sales by end date.
	"""
	END_DATE
	"""
	Sort sales by value.
	"""
	VALUE
	"""
	Sort sales by type.
	"""
	TYPE
}

type VoucherCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [VoucherCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type VoucherCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Voucher!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input VoucherFilterInput{
	status: [DiscountStatusEnum]
	timesUsed: IntRangeInput
	discountType: [VoucherDiscountType]
	started: DateTimeRangeInput
	search: String
	metadata: [MetadataFilter]
}

enum VoucherDiscountType{
	FIXED
	PERCENTAGE
	SHIPPING
}

input VoucherSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Specifies the channel in which to sort the data. DEPRECATED: Will be removed in Saleor 4.0.Use root-level channel argument instead.
	"""
	channel: String
	"""
	Sort vouchers by the selected field.
	"""
	field: VoucherSortField!
}

enum VoucherSortField{
	"""
	Sort vouchers by code.
	"""
	CODE
	"""
	Sort vouchers by start date.
	"""
	START_DATE
	"""
	Sort vouchers by end date.
	"""
	END_DATE
	"""
	Sort vouchers by value.
	"""
	VALUE
	"""
	Sort vouchers by type.
	"""
	TYPE
	"""
	Sort vouchers by usage limit.
	"""
	USAGE_LIMIT
	"""
	Sort vouchers by minimum spent amount.
	"""
	MINIMUM_SPENT_AMOUNT
}

"""
Represents a job data of exported file.
"""
type ExportFile implements Node & Job{
	"""
	The ID of the object.
	"""
	id: ID!
	user: User
	app: App
	"""
	Job status.
	"""
	status: JobStatusEnum!
	"""
	Created date time of job in ISO 8601 format.
	"""
	createdAt: DateTime!
	"""
	Date time of job last update in ISO 8601 format.
	"""
	updatedAt: DateTime!
	"""
	Job message.
	"""
	message: String
	"""
	The URL of field to download.
	"""
	url: String
	"""
	List of events associated with the export.
	"""
	events: [ExportEvent!]
}

"""
History log of export file.
"""
type ExportEvent implements Node{
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Date when event happened at in ISO 8601 format.
	"""
	date: DateTime!
	"""
	Export event type.
	"""
	type: ExportEventsEnum!
	"""
	User who performed the action.
	"""
	user: User
	"""
	App which performed the action.
	"""
	app: App
	"""
	Content of the event.
	"""
	message: String!
}

"""
An enumeration.
"""
enum ExportEventsEnum{
	EXPORT_PENDING
	EXPORT_SUCCESS
	EXPORT_FAILED
	EXPORT_DELETED
	EXPORTED_FILE_SENT
	EXPORT_FAILED_INFO_SENT
}

type ExportFileCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [ExportFileCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type ExportFileCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: ExportFile!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input ExportFileFilterInput{
	createdAt: DateTimeRangeInput
	updatedAt: DateTimeRangeInput
	status: JobStatusEnum
	user: String
	app: String
}

input ExportFileSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort export file by the selected field.
	"""
	field: ExportFileSortField!
}

enum ExportFileSortField{
	"""
	Sort export file by status.
	"""
	STATUS
	"""
	Sort export file by created at.
	"""
	CREATED_AT
	"""
	Sort export file by updated at.
	"""
	UPDATED_AT
}

type CheckoutCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [CheckoutCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type CheckoutCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Checkout!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

type CheckoutLineCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [CheckoutLineCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type CheckoutLineCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: CheckoutLine!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input AttributeSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort attributes by the selected field.
	"""
	field: AttributeSortField!
}

enum AttributeSortField{
	"""
	Sort attributes by name
	"""
	NAME
	"""
	Sort attributes by slug
	"""
	SLUG
	"""
	Sort attributes by the value required flag
	"""
	VALUE_REQUIRED
	"""
	Sort attributes by the variant only flag
	"""
	IS_VARIANT_ONLY
	"""
	Sort attributes by visibility in the storefront
	"""
	VISIBLE_IN_STOREFRONT
	"""
	Sort attributes by the filterable in storefront flag
	"""
	FILTERABLE_IN_STOREFRONT
	"""
	Sort attributes by the filterable in dashboard flag
	"""
	FILTERABLE_IN_DASHBOARD
	"""
	Sort attributes by their position in storefront
	"""
	STOREFRONT_SEARCH_POSITION
	"""
	Sort attributes based on whether they can be displayed or not in a product grid.
	"""
	AVAILABLE_IN_GRID
}

"""
Represents ongoing installation of app.
"""
type AppInstallation implements Node & Job{
	appName: String!
	manifestUrl: String!
	"""
	The ID of the object.
	"""
	id: ID!
	"""
	Job status.
	"""
	status: JobStatusEnum!
	"""
	Created date time of job in ISO 8601 format.
	"""
	createdAt: DateTime!
	"""
	Date time of job last update in ISO 8601 format.
	"""
	updatedAt: DateTime!
	"""
	Job message.
	"""
	message: String
}

type AppCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [AppCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type AppCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: App!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input AppFilterInput{
	search: String
	isActive: Boolean
	type: AppTypeEnum
}

input AppSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort apps by the selected field.
	"""
	field: AppSortField!
}

enum AppSortField{
	"""
	Sort apps by name.
	"""
	NAME
	"""
	Sort apps by creation date.
	"""
	CREATION_DATE
}

type AddressValidationData{
	countryCode: String
	countryName: String
	addressFormat: String
	addressLatinFormat: String
	allowedFields: [String]
	requiredFields: [String]
	upperFields: [String]
	countryAreaType: String
	countryAreaChoices: [ChoiceValue]
	cityType: String
	cityChoices: [ChoiceValue]
	cityAreaType: String
	cityAreaChoices: [ChoiceValue]
	postalCodeType: String
	postalCodeMatchers: [String]
	postalCodeExamples: [String]
	postalCodePrefix: String
}

type ChoiceValue{
	raw: String
	verbose: String
}

type UserCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [UserCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type UserCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: User!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input CustomerFilterInput{
	dateJoined: DateRangeInput
	numberOfOrders: IntRangeInput
	placedOrders: DateRangeInput
	search: String
	metadata: [MetadataFilter]
}

input UserSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort users by the selected field.
	"""
	field: UserSortField!
}

enum UserSortField{
	"""
	Sort users by first name.
	"""
	FIRST_NAME
	"""
	Sort users by last name.
	"""
	LAST_NAME
	"""
	Sort users by email.
	"""
	EMAIL
	"""
	Sort users by order count.
	"""
	ORDER_COUNT
}

type GroupCountableConnection{
	"""
	Pagination data for this connection.
	"""
	pageInfo: PageInfo!
	edges: [GroupCountableEdge!]!
	"""
	A total count of items in the collection.
	"""
	totalCount: Int
}

type GroupCountableEdge{
	"""
	The item at the end of the edge.
	"""
	node: Group!
	"""
	A cursor for use in pagination.
	"""
	cursor: String!
}

input PermissionGroupFilterInput{
	search: String
}

input PermissionGroupSortingInput{
	"""
	Specifies the direction in which to sort products.
	"""
	direction: OrderDirection!
	"""
	Sort permission group by the selected field.
	"""
	field: PermissionGroupSortField!
}

enum PermissionGroupSortField{
	"""
	Sort permission group accounts by name.
	"""
	NAME
}

input StaffUserInput{
	status: StaffMemberStatus
	search: String
}

enum StaffMemberStatus{
	"""
	User account has been activated.
	"""
	ACTIVE
	"""
	User account has not been activated yet.
	"""
	DEACTIVATED
}

union _Entity = App | Address | User | Group | ProductVariant | Product | ProductType | Collection | Category | ProductMedia | ProductImage | PageType

"""
Anything
"""
scalar _Any

type _Service{
	sdl: String
}

type Mutation{
	"""
	Creates a new webhook subscription.
	"""
	webhookCreate(
		"""
		Fields required to create a webhook.
		"""
		input: WebhookCreateInput!
	): WebhookCreate
	"""
	Deletes a webhook subscription.
	"""
	webhookDelete(
		"""
		ID of a webhook to delete.
		"""
		id: ID!
	): WebhookDelete
	"""
	Updates a webhook subscription.
	"""
	webhookUpdate(
		"""
		ID of a webhook to update.
		"""
		id: ID!
		"""
		Fields required to update a webhook.
		"""
		input: WebhookUpdateInput!
	): WebhookUpdate
	"""
	Creates new warehouse.
	"""
	createWarehouse(
		"""
		Fields required to create warehouse.
		"""
		input: WarehouseCreateInput!
	): WarehouseCreate
	"""
	Updates given warehouse.
	"""
	updateWarehouse(
		"""
		ID of a warehouse to update.
		"""
		id: ID!
		"""
		Fields required to update warehouse.
		"""
		input: WarehouseUpdateInput!
	): WarehouseUpdate
	"""
	Deletes selected warehouse.
	"""
	deleteWarehouse(
		"""
		ID of a warehouse to delete.
		"""
		id: ID!
	): WarehouseDelete
	"""
	Add shipping zone to given warehouse.
	"""
	assignWarehouseShippingZone(
		"""
		ID of a warehouse to update.
		"""
		id: ID!
		"""
		List of shipping zone IDs.
		"""
		shippingZoneIds: [ID!]!
	): WarehouseShippingZoneAssign
	"""
	Remove shipping zone from given warehouse.
	"""
	unassignWarehouseShippingZone(
		"""
		ID of a warehouse to update.
		"""
		id: ID!
		"""
		List of shipping zone IDs.
		"""
		shippingZoneIds: [ID!]!
	): WarehouseShippingZoneUnassign
	"""
	Creates a new staff notification recipient.
	"""
	staffNotificationRecipientCreate(
		"""
		Fields required to create a staff notification recipient.
		"""
		input: StaffNotificationRecipientInput!
	): StaffNotificationRecipientCreate
	"""
	Updates a staff notification recipient.
	"""
	staffNotificationRecipientUpdate(
		"""
		ID of a staff notification recipient to update.
		"""
		id: ID!
		"""
		Fields required to update a staff notification recipient.
		"""
		input: StaffNotificationRecipientInput!
	): StaffNotificationRecipientUpdate
	"""
	Delete staff notification recipient.
	"""
	staffNotificationRecipientDelete(
		"""
		ID of a staff notification recipient to delete.
		"""
		id: ID!
	): StaffNotificationRecipientDelete
	"""
	Updates site domain of the shop.
	"""
	shopDomainUpdate(
		"""
		Fields required to update site.
		"""
		input: SiteDomainInput
	): ShopDomainUpdate
	"""
	Updates shop settings.
	"""
	shopSettingsUpdate(
		"""
		Fields required to update shop settings.
		"""
		input: ShopSettingsInput!
	): ShopSettingsUpdate
	"""
	Fetch tax rates.
	"""
	shopFetchTaxRates: ShopFetchTaxRates
	"""
	Creates/updates translations for shop settings.
	"""
	shopSettingsTranslate(
		"""
		Fields required to update shop settings translations.
		"""
		input: ShopSettingsTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): ShopSettingsTranslate
	"""
	Update the shop's address. If the  value is passed, the currently selected address will be deleted.
	"""
	shopAddressUpdate(
		"""
		Fields required to update shop address.
		"""
		input: AddressInput
	): ShopAddressUpdate
	"""
	Update shop order settings.
	"""
	orderSettingsUpdate(
		"""
		Fields required to update shop order settings.
		"""
		input: OrderSettingsUpdateInput!
	): OrderSettingsUpdate
	"""
	Manage shipping method's availability in channels.
	"""
	shippingMethodChannelListingUpdate(
		"""
		ID of a shipping method to update.
		"""
		id: ID!
		"""
		Fields required to update shipping method channel listings.
		"""
		input: ShippingMethodChannelListingInput!
	): ShippingMethodChannelListingUpdate
	"""
	Creates a new shipping price.
	"""
	shippingPriceCreate(
		"""
		Fields required to create a shipping price.
		"""
		input: ShippingPriceInput!
	): ShippingPriceCreate
	"""
	Deletes a shipping price.
	"""
	shippingPriceDelete(
		"""
		ID of a shipping price to delete.
		"""
		id: ID!
	): ShippingPriceDelete
	"""
	Deletes shipping prices.
	"""
	shippingPriceBulkDelete(
		"""
		List of shipping price IDs to delete.
		"""
		ids: [ID!]
	): ShippingPriceBulkDelete
	"""
	Updates a new shipping price.
	"""
	shippingPriceUpdate(
		"""
		ID of a shipping price to update.
		"""
		id: ID!
		"""
		Fields required to update a shipping price.
		"""
		input: ShippingPriceInput!
	): ShippingPriceUpdate
	"""
	Creates/updates translations for a shipping method.
	"""
	shippingPriceTranslate(
		"""
		ShippingMethod ID or ShippingMethodTranslatableContent ID.
		"""
		id: ID!
		input: ShippingPriceTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): ShippingPriceTranslate
	"""
	Exclude products from shipping price.
	"""
	shippingPriceExcludeProducts(
		"""
		ID of a shipping price.
		"""
		id: ID!
		"""
		Exclude products input.
		"""
		input: ShippingPriceExcludeProductsInput!
	): ShippingPriceExcludeProducts
	"""
	Remove product from excluded list for shipping price.
	"""
	shippingPriceRemoveProductFromExclude(
		"""
		ID of a shipping price.
		"""
		id: ID!
		"""
		List of products which will be removed from excluded list.
		"""
		products: [ID!]
	): ShippingPriceRemoveProductFromExclude
	"""
	Creates a new shipping zone.
	"""
	shippingZoneCreate(
		"""
		Fields required to create a shipping zone.
		"""
		input: ShippingZoneCreateInput!
	): ShippingZoneCreate
	"""
	Deletes a shipping zone.
	"""
	shippingZoneDelete(
		"""
		ID of a shipping zone to delete.
		"""
		id: ID!
	): ShippingZoneDelete
	"""
	Deletes shipping zones.
	"""
	shippingZoneBulkDelete(
		"""
		List of shipping zone IDs to delete.
		"""
		ids: [ID!]
	): ShippingZoneBulkDelete
	"""
	Updates a new shipping zone.
	"""
	shippingZoneUpdate(
		"""
		ID of a shipping zone to update.
		"""
		id: ID!
		"""
		Fields required to update a shipping zone.
		"""
		input: ShippingZoneUpdateInput!
	): ShippingZoneUpdate
	"""
	Assign attributes to a given product type.
	"""
	productAttributeAssign(
		"""
		The operations to perform.
		"""
		operations: [ProductAttributeAssignInput!]
		"""
		ID of the product type to assign the attributes into.
		"""
		productTypeId: ID!
	): ProductAttributeAssign
	"""
	Un-assign attributes from a given product type.
	"""
	productAttributeUnassign(
		"""
		The IDs of the attributes to unassign.
		"""
		attributeIds: [ID!]
		"""
		ID of the product type from which the attributes should be unassigned.
		"""
		productTypeId: ID!
	): ProductAttributeUnassign
	"""
	Creates a new category.
	"""
	categoryCreate(
		"""
		Fields required to create a category.
		"""
		input: CategoryInput!
		"""
		ID of the parent category. If empty, category will be top level category.
		"""
		parent: ID
	): CategoryCreate
	"""
	Deletes a category.
	"""
	categoryDelete(
		"""
		ID of a category to delete.
		"""
		id: ID!
	): CategoryDelete
	"""
	Deletes categories.
	"""
	categoryBulkDelete(
		"""
		List of category IDs to delete.
		"""
		ids: [ID!]
	): CategoryBulkDelete
	"""
	Updates a category.
	"""
	categoryUpdate(
		"""
		ID of a category to update.
		"""
		id: ID!
		"""
		Fields required to update a category.
		"""
		input: CategoryInput!
	): CategoryUpdate
	"""
	Creates/updates translations for a category.
	"""
	categoryTranslate(
		"""
		Category ID or CategoryTranslatableContent ID.
		"""
		id: ID!
		input: TranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): CategoryTranslate
	"""
	Adds products to a collection.
	"""
	collectionAddProducts(
		"""
		ID of a collection.
		"""
		collectionId: ID!
		"""
		List of product IDs.
		"""
		products: [ID!]
	): CollectionAddProducts
	"""
	Creates a new collection.
	"""
	collectionCreate(
		"""
		Fields required to create a collection.
		"""
		input: CollectionCreateInput!
	): CollectionCreate
	"""
	Deletes a collection.
	"""
	collectionDelete(
		"""
		ID of a collection to delete.
		"""
		id: ID!
	): CollectionDelete
	"""
	Reorder the products of a collection.
	"""
	collectionReorderProducts(
		"""
		ID of a collection.
		"""
		collectionId: ID!
		"""
		The collection products position operations.
		"""
		moves: [MoveProductInput!]
	): CollectionReorderProducts
	"""
	Deletes collections.
	"""
	collectionBulkDelete(
		"""
		List of collection IDs to delete.
		"""
		ids: [ID!]
	): CollectionBulkDelete
	"""
	Remove products from a collection.
	"""
	collectionRemoveProducts(
		"""
		ID of a collection.
		"""
		collectionId: ID!
		"""
		List of product IDs.
		"""
		products: [ID!]
	): CollectionRemoveProducts
	"""
	Updates a collection.
	"""
	collectionUpdate(
		"""
		ID of a collection to update.
		"""
		id: ID!
		"""
		Fields required to update a collection.
		"""
		input: CollectionInput!
	): CollectionUpdate
	"""
	Creates/updates translations for a collection.
	"""
	collectionTranslate(
		"""
		Collection ID or CollectionTranslatableContent ID.
		"""
		id: ID!
		input: TranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): CollectionTranslate
	"""
	Manage collection's availability in channels.
	"""
	collectionChannelListingUpdate(
		"""
		ID of a collection to update.
		"""
		id: ID!
		"""
		Fields required to create or update collection channel listings.
		"""
		input: CollectionChannelListingUpdateInput!
	): CollectionChannelListingUpdate
	"""
	Creates a new product.
	"""
	productCreate(
		"""
		Fields required to create a product.
		"""
		input: ProductCreateInput!
	): ProductCreate
	"""
	Deletes a product.
	"""
	productDelete(
		"""
		ID of a product to delete.
		"""
		id: ID!
	): ProductDelete
	"""
	Deletes products.
	"""
	productBulkDelete(
		"""
		List of product IDs to delete.
		"""
		ids: [ID!]
	): ProductBulkDelete
	"""
	Updates an existing product.
	"""
	productUpdate(
		"""
		ID of a product to update.
		"""
		id: ID!
		"""
		Fields required to update a product.
		"""
		input: ProductInput!
	): ProductUpdate
	"""
	Creates/updates translations for a product.
	"""
	productTranslate(
		"""
		Product ID or ProductTranslatableContent ID.
		"""
		id: ID!
		input: TranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): ProductTranslate
	"""
	Manage product's availability in channels.
	"""
	productChannelListingUpdate(
		"""
		ID of a product to update.
		"""
		id: ID!
		"""
		Fields required to create or update product channel listings.
		"""
		input: ProductChannelListingUpdateInput!
	): ProductChannelListingUpdate
	"""
	Create a media object (image or video URL) associated with product. For image, this mutation must be sent as a  request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
	"""
	productMediaCreate(
		"""
		Fields required to create a product media.
		"""
		input: ProductMediaCreateInput!
	): ProductMediaCreate
	"""
	Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook.
	"""
	productVariantReorder(
		"""
		The list of variant reordering operations.
		"""
		moves: [ReorderInput!]
		"""
		Id of product that variants order will be altered.
		"""
		productId: ID!
	): ProductVariantReorder
	"""
	Deletes a product media.
	"""
	productMediaDelete(
		"""
		ID of a product media to delete.
		"""
		id: ID!
	): ProductMediaDelete
	"""
	Deletes product media.
	"""
	productMediaBulkDelete(
		"""
		List of product media IDs to delete.
		"""
		ids: [ID!]
	): ProductMediaBulkDelete
	"""
	Changes ordering of the product media.
	"""
	productMediaReorder(
		"""
		IDs of a product media in the desired order.
		"""
		mediaIds: [ID!]
		"""
		ID of product that media order will be altered.
		"""
		productId: ID!
	): ProductMediaReorder
	"""
	Updates a product media.
	"""
	productMediaUpdate(
		"""
		ID of a product media to update.
		"""
		id: ID!
		"""
		Fields required to update a product media.
		"""
		input: ProductMediaUpdateInput!
	): ProductMediaUpdate
	"""
	Creates a new product type.
	"""
	productTypeCreate(
		"""
		Fields required to create a product type.
		"""
		input: ProductTypeInput!
	): ProductTypeCreate
	"""
	Deletes a product type.
	"""
	productTypeDelete(
		"""
		ID of a product type to delete.
		"""
		id: ID!
	): ProductTypeDelete
	"""
	Deletes product types.
	"""
	productTypeBulkDelete(
		"""
		List of product type IDs to delete.
		"""
		ids: [ID!]
	): ProductTypeBulkDelete
	"""
	Updates an existing product type.
	"""
	productTypeUpdate(
		"""
		ID of a product type to update.
		"""
		id: ID!
		"""
		Fields required to update a product type.
		"""
		input: ProductTypeInput!
	): ProductTypeUpdate
	"""
	Reorder the attributes of a product type.
	"""
	productTypeReorderAttributes(
		"""
		The list of attribute reordering operations.
		"""
		moves: [ReorderInput!]
		"""
		ID of a product type.
		"""
		productTypeId: ID!
		"""
		The attribute type to reorder.
		"""
		type: ProductAttributeType!
	): ProductTypeReorderAttributes
	"""
	Reorder product attribute values.
	"""
	productReorderAttributeValues(
		"""
		ID of an attribute.
		"""
		attributeId: ID!
		"""
		The list of reordering operations for given attribute values.
		"""
		moves: [ReorderInput!]
		"""
		ID of a product.
		"""
		productId: ID!
	): ProductReorderAttributeValues
	"""
	Create new digital content. This mutation must be sent as a  request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
	"""
	digitalContentCreate(
		"""
		Fields required to create a digital content.
		"""
		input: DigitalContentUploadInput!
		"""
		ID of a product variant to upload digital content.
		"""
		variantId: ID!
	): DigitalContentCreate
	"""
	Remove digital content assigned to given variant.
	"""
	digitalContentDelete(
		"""
		ID of a product variant with digital content to remove.
		"""
		variantId: ID!
	): DigitalContentDelete
	"""
	Update digital content.
	"""
	digitalContentUpdate(
		"""
		Fields required to update a digital content.
		"""
		input: DigitalContentInput!
		"""
		ID of a product variant with digital content to update.
		"""
		variantId: ID!
	): DigitalContentUpdate
	"""
	Generate new URL to digital content.
	"""
	digitalContentUrlCreate(
		"""
		Fields required to create a new url.
		"""
		input: DigitalContentUrlCreateInput!
	): DigitalContentUrlCreate
	"""
	Creates a new variant for a product.
	"""
	productVariantCreate(
		"""
		Fields required to create a product variant.
		"""
		input: ProductVariantCreateInput!
	): ProductVariantCreate
	"""
	Deletes a product variant.
	"""
	productVariantDelete(
		"""
		ID of a product variant to delete.
		"""
		id: ID!
	): ProductVariantDelete
	"""
	Creates product variants for a given product.
	"""
	productVariantBulkCreate(
		"""
		ID of the product to create the variants for.
		"""
		product: ID!
		"""
		Input list of product variants to create.
		"""
		variants: [ProductVariantBulkCreateInput!]
	): ProductVariantBulkCreate
	"""
	Deletes product variants.
	"""
	productVariantBulkDelete(
		"""
		List of product variant IDs to delete.
		"""
		ids: [ID!]
	): ProductVariantBulkDelete
	"""
	Creates stocks for product variant.
	"""
	productVariantStocksCreate(
		"""
		Input list of stocks to create.
		"""
		stocks: [StockInput!]!
		"""
		ID of a product variant for which stocks will be created.
		"""
		variantId: ID!
	): ProductVariantStocksCreate
	"""
	Delete stocks from product variant.
	"""
	productVariantStocksDelete(
		"""
		ID of product variant for which stocks will be deleted.
		"""
		variantId: ID!
		warehouseIds: [ID!]
	): ProductVariantStocksDelete
	"""
	Update stocks for product variant.
	"""
	productVariantStocksUpdate(
		"""
		Input list of stocks to create.
		"""
		stocks: [StockInput!]!
		"""
		ID of a product variant for which stocks will be created.
		"""
		variantId: ID!
	): ProductVariantStocksUpdate
	"""
	Updates an existing variant for product.
	"""
	productVariantUpdate(
		"""
		ID of a product variant to update.
		"""
		id: ID!
		"""
		Fields required to update a product variant.
		"""
		input: ProductVariantInput!
	): ProductVariantUpdate
	"""
	Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook.
	"""
	productVariantSetDefault(
		"""
		Id of a product that will have the default variant set.
		"""
		productId: ID!
		"""
		Id of a variant that will be set as default.
		"""
		variantId: ID!
	): ProductVariantSetDefault
	"""
	Creates/updates translations for a product variant.
	"""
	productVariantTranslate(
		"""
		ProductVariant ID or ProductVariantTranslatableContent ID.
		"""
		id: ID!
		input: NameTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): ProductVariantTranslate
	"""
	Manage product variant prices in channels.
	"""
	productVariantChannelListingUpdate(
		"""
		ID of a product variant to update.
		"""
		id: ID!
		"""
		('List of fields required to create or upgrade product variant ', 'channel listings.')
		"""
		input: [ProductVariantChannelListingAddInput!]!
	): ProductVariantChannelListingUpdate
	"""
	Reorder product variant attribute values.
	"""
	productVariantReorderAttributeValues(
		"""
		ID of an attribute.
		"""
		attributeId: ID!
		"""
		The list of reordering operations for given attribute values.
		"""
		moves: [ReorderInput!]
		"""
		ID of a product variant.
		"""
		variantId: ID!
	): ProductVariantReorderAttributeValues
	"""
	Assign an media to a product variant.
	"""
	variantMediaAssign(
		"""
		ID of a product media to assign to a variant.
		"""
		mediaId: ID!
		"""
		ID of a product variant.
		"""
		variantId: ID!
	): VariantMediaAssign
	"""
	Unassign an media from a product variant.
	"""
	variantMediaUnassign(
		"""
		ID of a product media to unassign from a variant.
		"""
		mediaId: ID!
		"""
		ID of a product variant.
		"""
		variantId: ID!
	): VariantMediaUnassign
	"""
	Captures the authorized payment amount.
	"""
	paymentCapture(
		"""
		Transaction amount.
		"""
		amount: PositiveDecimal
		"""
		Payment ID.
		"""
		paymentId: ID!
	): PaymentCapture
	"""
	Refunds the captured payment amount.
	"""
	paymentRefund(
		"""
		Transaction amount.
		"""
		amount: PositiveDecimal
		"""
		Payment ID.
		"""
		paymentId: ID!
	): PaymentRefund
	"""
	Voids the authorized payment.
	"""
	paymentVoid(
		"""
		Payment ID.
		"""
		paymentId: ID!
	): PaymentVoid
	"""
	Initializes payment process when it is required by gateway.
	"""
	paymentInitialize(
		"""
		Slug of a channel for which the data should be returned.
		"""
		channel: String
		"""
		A gateway name used to initialize the payment.
		"""
		gateway: String!
		"""
		Client-side generated data required to initialize the payment.
		"""
		paymentData: JSONString
	): PaymentInitialize
	"""
	Creates a new page.
	"""
	pageCreate(
		"""
		Fields required to create a page.
		"""
		input: PageCreateInput!
	): PageCreate
	"""
	Deletes a page.
	"""
	pageDelete(
		"""
		ID of a page to delete.
		"""
		id: ID!
	): PageDelete
	"""
	Deletes pages.
	"""
	pageBulkDelete(
		"""
		List of page IDs to delete.
		"""
		ids: [ID!]
	): PageBulkDelete
	"""
	Publish pages.
	"""
	pageBulkPublish(
		"""
		List of page IDs to (un)publish.
		"""
		ids: [ID!]
		"""
		Determine if pages will be published or not.
		"""
		isPublished: Boolean!
	): PageBulkPublish
	"""
	Updates an existing page.
	"""
	pageUpdate(
		"""
		ID of a page to update.
		"""
		id: ID!
		"""
		Fields required to update a page.
		"""
		input: PageInput!
	): PageUpdate
	"""
	Creates/updates translations for a page.
	"""
	pageTranslate(
		"""
		Page ID or PageTranslatableContent ID.
		"""
		id: ID!
		input: PageTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): PageTranslate
	"""
	Create a new page type.
	"""
	pageTypeCreate(
		"""
		Fields required to create page type.
		"""
		input: PageTypeCreateInput!
	): PageTypeCreate
	"""
	Update page type.
	"""
	pageTypeUpdate(
		"""
		ID of the page type to update.
		"""
		id: ID
		"""
		Fields required to update page type.
		"""
		input: PageTypeUpdateInput!
	): PageTypeUpdate
	"""
	Delete a page type.
	"""
	pageTypeDelete(
		"""
		ID of the page type to delete.
		"""
		id: ID!
	): PageTypeDelete
	"""
	Delete page types.
	"""
	pageTypeBulkDelete(
		"""
		List of page type IDs to delete
		"""
		ids: [ID!]!
	): PageTypeBulkDelete
	"""
	Assign attributes to a given page type.
	"""
	pageAttributeAssign(
		"""
		The IDs of the attributes to assign.
		"""
		attributeIds: [ID!]!
		"""
		ID of the page type to assign the attributes into.
		"""
		pageTypeId: ID!
	): PageAttributeAssign
	"""
	Unassign attributes from a given page type.
	"""
	pageAttributeUnassign(
		"""
		The IDs of the attributes to unassign.
		"""
		attributeIds: [ID!]!
		"""
		ID of the page type from which the attributes should be unassign.
		"""
		pageTypeId: ID!
	): PageAttributeUnassign
	"""
	Reorder the attributes of a page type.
	"""
	pageTypeReorderAttributes(
		"""
		The list of attribute reordering operations.
		"""
		moves: [ReorderInput!]!
		"""
		ID of a page type.
		"""
		pageTypeId: ID!
	): PageTypeReorderAttributes
	"""
	Reorder page attribute values.
	"""
	pageReorderAttributeValues(
		"""
		ID of an attribute.
		"""
		attributeId: ID!
		"""
		The list of reordering operations for given attribute values.
		"""
		moves: [ReorderInput!]
		"""
		ID of a page.
		"""
		pageId: ID!
	): PageReorderAttributeValues
	"""
	Completes creating an order.
	"""
	draftOrderComplete(
		"""
		ID of the order that will be completed.
		"""
		id: ID!
	): DraftOrderComplete
	"""
	Creates a new draft order.
	"""
	draftOrderCreate(
		"""
		Fields required to create an order.
		"""
		input: DraftOrderCreateInput!
	): DraftOrderCreate
	"""
	Deletes a draft order.
	"""
	draftOrderDelete(
		"""
		ID of a draft order to delete.
		"""
		id: ID!
	): DraftOrderDelete
	"""
	Deletes draft orders.
	"""
	draftOrderBulkDelete(
		"""
		List of draft order IDs to delete.
		"""
		ids: [ID!]
	): DraftOrderBulkDelete
	"""
	Deletes order lines.
	"""
	draftOrderLinesBulkDelete(
		"""
		List of order lines IDs to delete.
		"""
		ids: [ID!]
	): DraftOrderLinesBulkDelete
	"""
	Updates a draft order.
	"""
	draftOrderUpdate(
		"""
		ID of a draft order to update.
		"""
		id: ID!
		"""
		Fields required to update an order.
		"""
		input: DraftOrderInput!
	): DraftOrderUpdate
	"""
	Adds note to the order.
	"""
	orderAddNote(
		"""
		ID of the order to add a note for.
		"""
		order: ID!
		"""
		Fields required to create a note for the order.
		"""
		input: OrderAddNoteInput!
	): OrderAddNote
	"""
	Cancel an order.
	"""
	orderCancel(
		"""
		ID of the order to cancel.
		"""
		id: ID!
	): OrderCancel
	"""
	Capture an order.
	"""
	orderCapture(
		"""
		Amount of money to capture.
		"""
		amount: PositiveDecimal!
		"""
		ID of the order to capture.
		"""
		id: ID!
	): OrderCapture
	"""
	Confirms an unconfirmed order by changing status to unfulfilled.
	"""
	orderConfirm(
		"""
		ID of an order to confirm.
		"""
		id: ID!
	): OrderConfirm
	"""
	Creates new fulfillments for an order.
	"""
	orderFulfill(
		"""
		Fields required to create an fulfillment.
		"""
		input: OrderFulfillInput!
		"""
		ID of the order to be fulfilled.
		"""
		order: ID
	): OrderFulfill
	"""
	Cancels existing fulfillment and optionally restocks items.
	"""
	orderFulfillmentCancel(
		"""
		ID of an fulfillment to cancel.
		"""
		id: ID!
		"""
		Fields required to cancel an fulfillment.
		"""
		input: FulfillmentCancelInput!
	): FulfillmentCancel
	"""
	Updates a fulfillment for an order.
	"""
	orderFulfillmentUpdateTracking(
		"""
		ID of an fulfillment to update.
		"""
		id: ID!
		"""
		Fields required to update an fulfillment.
		"""
		input: FulfillmentUpdateTrackingInput!
	): FulfillmentUpdateTracking
	"""
	Refund products.
	"""
	orderFulfillmentRefundProducts(
		"""
		Fields required to create an refund fulfillment.
		"""
		input: OrderRefundProductsInput!
		"""
		ID of the order to be refunded.
		"""
		order: ID!
	): FulfillmentRefundProducts
	"""
	Return products.
	"""
	orderFulfillmentReturnProducts(
		"""
		Fields required to return products.
		"""
		input: OrderReturnProductsInput!
		"""
		ID of the order to be returned.
		"""
		order: ID!
	): FulfillmentReturnProducts
	"""
	Create order lines for an order.
	"""
	orderLinesCreate(
		"""
		ID of the order to add the lines to.
		"""
		id: ID!
		"""
		Fields required to add order lines.
		"""
		input: [OrderLineCreateInput!]
	): OrderLinesCreate
	"""
	Deletes an order line from an order.
	"""
	orderLineDelete(
		"""
		ID of the order line to delete.
		"""
		id: ID!
	): OrderLineDelete
	"""
	Updates an order line of an order.
	"""
	orderLineUpdate(
		"""
		ID of the order line to update.
		"""
		id: ID!
		"""
		Fields required to update an order line.
		"""
		input: OrderLineInput!
	): OrderLineUpdate
	"""
	Adds discount to the order.
	"""
	orderDiscountAdd(
		"""
		Fields required to create a discount for the order.
		"""
		input: OrderDiscountCommonInput!
		"""
		ID of an order to discount.
		"""
		orderId: ID!
	): OrderDiscountAdd
	"""
	Update discount for the order.
	"""
	orderDiscountUpdate(
		"""
		ID of a discount to update.
		"""
		discountId: ID!
		"""
		Fields required to update a discount for the order.
		"""
		input: OrderDiscountCommonInput!
	): OrderDiscountUpdate
	"""
	Remove discount from the order.
	"""
	orderDiscountDelete(
		"""
		ID of a discount to remove.
		"""
		discountId: ID!
	): OrderDiscountDelete
	"""
	Update discount for the order line.
	"""
	orderLineDiscountUpdate(
		"""
		Fields required to update price for the order line.
		"""
		input: OrderDiscountCommonInput!
		"""
		ID of a order line to update price
		"""
		orderLineId: ID!
	): OrderLineDiscountUpdate
	"""
	Remove discount applied to the order line.
	"""
	orderLineDiscountRemove(
		"""
		ID of a order line to remove its discount
		"""
		orderLineId: ID!
	): OrderLineDiscountRemove
	"""
	Mark order as manually paid.
	"""
	orderMarkAsPaid(
		"""
		ID of the order to mark paid.
		"""
		id: ID!
		"""
		The external transaction reference.
		"""
		transactionReference: String
	): OrderMarkAsPaid
	"""
	Refund an order.
	"""
	orderRefund(
		"""
		Amount of money to refund.
		"""
		amount: PositiveDecimal!
		"""
		ID of the order to refund.
		"""
		id: ID!
	): OrderRefund
	"""
	Updates an order.
	"""
	orderUpdate(
		"""
		ID of an order to update.
		"""
		id: ID!
		"""
		Fields required to update an order.
		"""
		input: OrderUpdateInput!
	): OrderUpdate
	"""
	Updates a shipping method of the order.
	"""
	orderUpdateShipping(
		"""
		ID of the order to update a shipping method.
		"""
		order: ID!
		"""
		Fields required to change shipping method of the order.
		"""
		input: OrderUpdateShippingInput
	): OrderUpdateShipping
	"""
	Void an order.
	"""
	orderVoid(
		"""
		ID of the order to void.
		"""
		id: ID!
	): OrderVoid
	"""
	Cancels orders.
	"""
	orderBulkCancel(
		"""
		List of orders IDs to cancel.
		"""
		ids: [ID!]
	): OrderBulkCancel
	"""
	Delete metadata of an object.
	"""
	deleteMetadata(
		"""
		ID of an object to update.
		"""
		id: ID!
		"""
		Metadata keys to delete.
		"""
		keys: [String!]!
	): DeleteMetadata
	"""
	Delete object's private metadata.
	"""
	deletePrivateMetadata(
		"""
		ID of an object to update.
		"""
		id: ID!
		"""
		Metadata keys to delete.
		"""
		keys: [String!]!
	): DeletePrivateMetadata
	"""
	Updates metadata of an object.
	"""
	updateMetadata(
		"""
		ID of an object to update.
		"""
		id: ID!
		"""
		Fields required to update the object's metadata.
		"""
		input: [MetadataInput!]!
	): UpdateMetadata
	"""
	Updates private metadata of an object.
	"""
	updatePrivateMetadata(
		"""
		ID of an object to update.
		"""
		id: ID!
		"""
		Fields required to update the object's metadata.
		"""
		input: [MetadataInput!]!
	): UpdatePrivateMetadata
	"""
	Assigns storefront's navigation menus.
	"""
	assignNavigation(
		"""
		ID of the menu.
		"""
		menu: ID
		"""
		Type of the navigation bar to assign the menu to.
		"""
		navigationType: NavigationType!
	): AssignNavigation
	"""
	Creates a new Menu.
	"""
	menuCreate(
		"""
		Fields required to create a menu.
		"""
		input: MenuCreateInput!
	): MenuCreate
	"""
	Deletes a menu.
	"""
	menuDelete(
		"""
		ID of a menu to delete.
		"""
		id: ID!
	): MenuDelete
	"""
	Deletes menus.
	"""
	menuBulkDelete(
		"""
		List of menu IDs to delete.
		"""
		ids: [ID!]
	): MenuBulkDelete
	"""
	Updates a menu.
	"""
	menuUpdate(
		"""
		ID of a menu to update.
		"""
		id: ID!
		"""
		Fields required to update a menu.
		"""
		input: MenuInput!
	): MenuUpdate
	"""
	Creates a new menu item.
	"""
	menuItemCreate(
		"""
		Fields required to update a menu item. Only one of , , ,  is allowed per item.
		"""
		input: MenuItemCreateInput!
	): MenuItemCreate
	"""
	Deletes a menu item.
	"""
	menuItemDelete(
		"""
		ID of a menu item to delete.
		"""
		id: ID!
	): MenuItemDelete
	"""
	Deletes menu items.
	"""
	menuItemBulkDelete(
		"""
		List of menu item IDs to delete.
		"""
		ids: [ID!]
	): MenuItemBulkDelete
	"""
	Updates a menu item.
	"""
	menuItemUpdate(
		"""
		ID of a menu item to update.
		"""
		id: ID!
		"""
		Fields required to update a menu item. Only one of , , ,  is allowed per item.
		"""
		input: MenuItemInput!
	): MenuItemUpdate
	"""
	Creates/updates translations for a menu item.
	"""
	menuItemTranslate(
		"""
		MenuItem ID or MenuItemTranslatableContent ID.
		"""
		id: ID!
		input: NameTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): MenuItemTranslate
	"""
	Moves items of menus.
	"""
	menuItemMove(
		"""
		ID of the menu.
		"""
		menu: ID!
		"""
		The menu position data.
		"""
		moves: [MenuItemMoveInput!]
	): MenuItemMove
	"""
	Request an invoice for the order using plugin.
	"""
	invoiceRequest(
		"""
		Invoice number, if not provided it will be generated.
		"""
		number: String
		"""
		ID of the order related to invoice.
		"""
		orderId: ID!
	): InvoiceRequest
	"""
	Requests deletion of an invoice.
	"""
	invoiceRequestDelete(
		"""
		ID of an invoice to request the deletion.
		"""
		id: ID!
	): InvoiceRequestDelete
	"""
	Creates a ready to send invoice.
	"""
	invoiceCreate(
		"""
		Fields required when creating an invoice.
		"""
		input: InvoiceCreateInput!
		"""
		ID of the order related to invoice.
		"""
		orderId: ID!
	): InvoiceCreate
	"""
	Deletes an invoice.
	"""
	invoiceDelete(
		"""
		ID of an invoice to delete.
		"""
		id: ID!
	): InvoiceDelete
	"""
	Updates an invoice.
	"""
	invoiceUpdate(
		"""
		ID of an invoice to update.
		"""
		id: ID!
		"""
		Fields to use when updating an invoice.
		"""
		input: UpdateInvoiceInput!
	): InvoiceUpdate
	"""
	Send an invoice notification to the customer.
	"""
	invoiceSendNotification(
		"""
		ID of an invoice to be sent.
		"""
		id: ID!
	): InvoiceSendNotification
	"""
	Activate a gift card.
	"""
	giftCardActivate(
		"""
		ID of a gift card to activate.
		"""
		id: ID!
	): GiftCardActivate
	"""
	Creates a new gift card.
	"""
	giftCardCreate(
		"""
		Fields required to create a gift card.
		"""
		input: GiftCardCreateInput!
	): GiftCardCreate
	"""
	Deactivate a gift card.
	"""
	giftCardDeactivate(
		"""
		ID of a gift card to deactivate.
		"""
		id: ID!
	): GiftCardDeactivate
	"""
	Update a gift card.
	"""
	giftCardUpdate(
		"""
		ID of a gift card to update.
		"""
		id: ID!
		"""
		Fields required to update a gift card.
		"""
		input: GiftCardUpdateInput!
	): GiftCardUpdate
	"""
	Update plugin configuration.
	"""
	pluginUpdate(
		"""
		ID of a channel for which the data should be modified.
		"""
		channelId: ID
		"""
		ID of plugin to update.
		"""
		id: ID!
		"""
		Fields required to update a plugin configuration.
		"""
		input: PluginUpdateInput!
	): PluginUpdate
	"""
	Creates a new sale.
	"""
	saleCreate(
		"""
		Fields required to create a sale.
		"""
		input: SaleInput!
	): SaleCreate
	"""
	Deletes a sale.
	"""
	saleDelete(
		"""
		ID of a sale to delete.
		"""
		id: ID!
	): SaleDelete
	"""
	Deletes sales.
	"""
	saleBulkDelete(
		"""
		List of sale IDs to delete.
		"""
		ids: [ID!]
	): SaleBulkDelete
	"""
	Updates a sale.
	"""
	saleUpdate(
		"""
		ID of a sale to update.
		"""
		id: ID!
		"""
		Fields required to update a sale.
		"""
		input: SaleInput!
	): SaleUpdate
	"""
	Adds products, categories, collections to a voucher.
	"""
	saleCataloguesAdd(
		"""
		ID of a sale.
		"""
		id: ID!
		"""
		Fields required to modify catalogue IDs of sale.
		"""
		input: CatalogueInput!
	): SaleAddCatalogues
	"""
	Removes products, categories, collections from a sale.
	"""
	saleCataloguesRemove(
		"""
		ID of a sale.
		"""
		id: ID!
		"""
		Fields required to modify catalogue IDs of sale.
		"""
		input: CatalogueInput!
	): SaleRemoveCatalogues
	"""
	Creates/updates translations for a sale.
	"""
	saleTranslate(
		"""
		Sale ID or SaleTranslatableContent ID.
		"""
		id: ID!
		input: NameTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): SaleTranslate
	"""
	Manage sale's availability in channels.
	"""
	saleChannelListingUpdate(
		"""
		ID of a sale to update.
		"""
		id: ID!
		"""
		Fields required to update sale channel listings.
		"""
		input: SaleChannelListingInput!
	): SaleChannelListingUpdate
	"""
	Creates a new voucher.
	"""
	voucherCreate(
		"""
		Fields required to create a voucher.
		"""
		input: VoucherInput!
	): VoucherCreate
	"""
	Deletes a voucher.
	"""
	voucherDelete(
		"""
		ID of a voucher to delete.
		"""
		id: ID!
	): VoucherDelete
	"""
	Deletes vouchers.
	"""
	voucherBulkDelete(
		"""
		List of voucher IDs to delete.
		"""
		ids: [ID!]
	): VoucherBulkDelete
	"""
	Updates a voucher.
	"""
	voucherUpdate(
		"""
		ID of a voucher to update.
		"""
		id: ID!
		"""
		Fields required to update a voucher.
		"""
		input: VoucherInput!
	): VoucherUpdate
	"""
	Adds products, categories, collections to a voucher.
	"""
	voucherCataloguesAdd(
		"""
		ID of a voucher.
		"""
		id: ID!
		"""
		Fields required to modify catalogue IDs of voucher.
		"""
		input: CatalogueInput!
	): VoucherAddCatalogues
	"""
	Removes products, categories, collections from a voucher.
	"""
	voucherCataloguesRemove(
		"""
		ID of a voucher.
		"""
		id: ID!
		"""
		Fields required to modify catalogue IDs of voucher.
		"""
		input: CatalogueInput!
	): VoucherRemoveCatalogues
	"""
	Creates/updates translations for a voucher.
	"""
	voucherTranslate(
		"""
		Voucher ID or VoucherTranslatableContent ID.
		"""
		id: ID!
		input: NameTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): VoucherTranslate
	"""
	Manage voucher's availability in channels.
	"""
	voucherChannelListingUpdate(
		"""
		ID of a voucher to update.
		"""
		id: ID!
		"""
		Fields required to update voucher channel listings.
		"""
		input: VoucherChannelListingInput!
	): VoucherChannelListingUpdate
	"""
	Export products to csv file.
	"""
	exportProducts(
		"""
		Fields required to export product data
		"""
		input: ExportProductsInput!
	): ExportProducts
	"""
	Upload a file. This mutation must be sent as a  request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
	"""
	fileUpload(
		"""
		Represents a file in a multipart request.
		"""
		file: Upload!
	): FileUpload
	"""
	Adds a gift card or a voucher to a checkout.
	"""
	checkoutAddPromoCode(
		"""
		Checkout ID. DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		Gift card code or voucher code.
		"""
		promoCode: String!
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutAddPromoCode
	"""
	Update billing address in the existing checkout.
	"""
	checkoutBillingAddressUpdate(
		"""
		The billing address of the checkout.
		"""
		billingAddress: AddressInput!
		"""
		ID of the checkout.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutBillingAddressUpdate
	"""
	Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation.
	"""
	checkoutComplete(
		"""
		Checkout ID.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		Client-side generated data required to finalize the payment.
		"""
		paymentData: JSONString
		"""
		URL of a view where users should be redirected to see the order details. URL in RFC 1808 format.
		"""
		redirectUrl: String
		"""
		Determines whether to store the payment source for future usage.
		"""
		storeSource: Boolean = false
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutComplete
	"""
	Create a new checkout.
	"""
	checkoutCreate(
		"""
		Fields required to create checkout.
		"""
		input: CheckoutCreateInput!
	): CheckoutCreate
	"""
	Sets the customer as the owner of the checkout.
	"""
	checkoutCustomerAttach(
		"""
		ID of the checkout.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		ID of customer to attach to checkout. Can be used to attach customer to checkout by staff or app. Requires IMPERSONATE_USER permission.
		"""
		customerId: ID
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutCustomerAttach
	"""
	Removes the user assigned as the owner of the checkout.
	"""
	checkoutCustomerDetach(
		"""
		Checkout ID.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutCustomerDetach
	"""
	Updates email address in the existing checkout object.
	"""
	checkoutEmailUpdate(
		"""
		Checkout ID.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		email.
		"""
		email: String!
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutEmailUpdate
	"""
	Deletes a CheckoutLine.
	"""
	checkoutLineDelete(
		"""
		The ID of the checkout.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		ID of the checkout line to delete.
		"""
		lineId: ID
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutLineDelete
	"""
	Adds a checkout line to the existing checkout.If line was already in checkout, its quantity will be increased.
	"""
	checkoutLinesAdd(
		"""
		The ID of the checkout.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		A list of checkout lines, each containing information about an item in the checkout.
		"""
		lines: [CheckoutLineInput!]
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutLinesAdd
	"""
	Updates checkout line in the existing checkout.
	"""
	checkoutLinesUpdate(
		"""
		The ID of the checkout.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		A list of checkout lines, each containing information about an item in the checkout.
		"""
		lines: [CheckoutLineInput!]
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutLinesUpdate
	"""
	Remove a gift card or a voucher from a checkout.
	"""
	checkoutRemovePromoCode(
		"""
		Checkout ID.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		Gift card code or voucher code.
		"""
		promoCode: String!
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutRemovePromoCode
	"""
	Create a new payment for given checkout.
	"""
	checkoutPaymentCreate(
		"""
		Checkout ID.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		Data required to create a new payment.
		"""
		input: PaymentInput!
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutPaymentCreate
	"""
	Update shipping address in the existing checkout.
	"""
	checkoutShippingAddressUpdate(
		"""
		ID of the checkout.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		The mailing address to where the checkout will be shipped.
		"""
		shippingAddress: AddressInput!
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutShippingAddressUpdate
	"""
	Updates the shipping address of the checkout.
	"""
	checkoutShippingMethodUpdate(
		"""
		Checkout ID.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		Shipping method.
		"""
		shippingMethodId: ID!
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutShippingMethodUpdate
	"""
	Update language code in the existing checkout.
	"""
	checkoutLanguageCodeUpdate(
		"""
		ID of the checkout.DEPRECATED: Will be removed in Saleor 4.0. Use token instead.
		"""
		checkoutId: ID
		"""
		New language code.
		"""
		languageCode: LanguageCodeEnum!
		"""
		Checkout token.
		"""
		token: UUID
	): CheckoutLanguageCodeUpdate
	"""
	Creates new channel.
	"""
	channelCreate(
		"""
		Fields required to create channel.
		"""
		input: ChannelCreateInput!
	): ChannelCreate
	"""
	Update a channel.
	"""
	channelUpdate(
		"""
		ID of a channel to update.
		"""
		id: ID!
		"""
		Fields required to update a channel.
		"""
		input: ChannelUpdateInput!
	): ChannelUpdate
	"""
	Delete a channel. Orders associated with the deleted channel will be moved to the target channel. Checkouts, product availability, and pricing will be removed.
	"""
	channelDelete(
		"""
		ID of a channel to delete.
		"""
		id: ID!
		"""
		Fields required to delete a channel.
		"""
		input: ChannelDeleteInput
	): ChannelDelete
	"""
	Activate a channel.
	"""
	channelActivate(
		"""
		ID of the channel to activate.
		"""
		id: ID!
	): ChannelActivate
	"""
	Deactivate a channel.
	"""
	channelDeactivate(
		"""
		ID of the channel to deactivate.
		"""
		id: ID!
	): ChannelDeactivate
	"""
	Creates an attribute.
	"""
	attributeCreate(
		"""
		Fields required to create an attribute.
		"""
		input: AttributeCreateInput!
	): AttributeCreate
	"""
	Deletes an attribute.
	"""
	attributeDelete(
		"""
		ID of an attribute to delete.
		"""
		id: ID!
	): AttributeDelete
	"""
	Updates attribute.
	"""
	attributeUpdate(
		"""
		ID of an attribute to update.
		"""
		id: ID!
		"""
		Fields required to update an attribute.
		"""
		input: AttributeUpdateInput!
	): AttributeUpdate
	"""
	Creates/updates translations for an attribute.
	"""
	attributeTranslate(
		"""
		Attribute ID or AttributeTranslatableContent ID.
		"""
		id: ID!
		input: NameTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): AttributeTranslate
	"""
	Deletes attributes.
	"""
	attributeBulkDelete(
		"""
		List of attribute IDs to delete.
		"""
		ids: [ID!]
	): AttributeBulkDelete
	"""
	Deletes values of attributes.
	"""
	attributeValueBulkDelete(
		"""
		List of attribute value IDs to delete.
		"""
		ids: [ID!]
	): AttributeValueBulkDelete
	"""
	Creates a value for an attribute.
	"""
	attributeValueCreate(
		"""
		Attribute to which value will be assigned.
		"""
		attribute: ID!
		"""
		Fields required to create an AttributeValue.
		"""
		input: AttributeValueCreateInput!
	): AttributeValueCreate
	"""
	Deletes a value of an attribute.
	"""
	attributeValueDelete(
		"""
		ID of a value to delete.
		"""
		id: ID!
	): AttributeValueDelete
	"""
	Updates value of an attribute.
	"""
	attributeValueUpdate(
		"""
		ID of an AttributeValue to update.
		"""
		id: ID!
		"""
		Fields required to update an AttributeValue.
		"""
		input: AttributeValueCreateInput!
	): AttributeValueUpdate
	"""
	Creates/updates translations for an attribute value.
	"""
	attributeValueTranslate(
		"""
		AttributeValue ID or AttributeValueTranslatableContent ID.
		"""
		id: ID!
		input: AttributeValueTranslationInput!
		"""
		Translation language code.
		"""
		languageCode: LanguageCodeEnum!
	): AttributeValueTranslate
	"""
	Reorder the values of an attribute.
	"""
	attributeReorderValues(
		"""
		ID of an attribute.
		"""
		attributeId: ID!
		"""
		The list of reordering operations for given attribute values.
		"""
		moves: [ReorderInput!]
	): AttributeReorderValues
	"""
	Creates a new app.
	"""
	appCreate(
		"""
		Fields required to create a new app.
		"""
		input: AppInput!
	): AppCreate
	"""
	Updates an existing app.
	"""
	appUpdate(
		"""
		ID of an app to update.
		"""
		id: ID!
		"""
		Fields required to update an existing app.
		"""
		input: AppInput!
	): AppUpdate
	"""
	Deletes an app.
	"""
	appDelete(
		"""
		ID of an app to delete.
		"""
		id: ID!
	): AppDelete
	"""
	Creates a new token.
	"""
	appTokenCreate(
		"""
		Fields required to create a new auth token.
		"""
		input: AppTokenInput!
	): AppTokenCreate
	"""
	Deletes an authentication token assigned to app.
	"""
	appTokenDelete(
		"""
		ID of an auth token to delete.
		"""
		id: ID!
	): AppTokenDelete
	"""
	Verify provided app token.
	"""
	appTokenVerify(
		"""
		App token to verify.
		"""
		token: String!
	): AppTokenVerify
	"""
	Install new app by using app manifest.
	"""
	appInstall(
		"""
		Fields required to install a new app.
		"""
		input: AppInstallInput!
	): AppInstall
	"""
	Retry failed installation of new app.
	"""
	appRetryInstall(
		"""
		Determine if app will be set active or not.
		"""
		activateAfterInstallation: Boolean = true
		"""
		ID of failed installation.
		"""
		id: ID!
	): AppRetryInstall
	"""
	Delete failed installation.
	"""
	appDeleteFailedInstallation(
		"""
		ID of failed installation to delete.
		"""
		id: ID!
	): AppDeleteFailedInstallation
	"""
	Fetch and validate manifest.
	"""
	appFetchManifest(
		manifestUrl: String!
	): AppFetchManifest
	"""
	Activate the app.
	"""
	appActivate(
		"""
		ID of app to activate.
		"""
		id: ID!
	): AppActivate
	"""
	Deactivate the app.
	"""
	appDeactivate(
		"""
		ID of app to deactivate.
		"""
		id: ID!
	): AppDeactivate
	"""
	Create JWT token.
	"""
	tokenCreate(
		"""
		Email of a user.
		"""
		email: String!
		"""
		Password of a user.
		"""
		password: String!
	): CreateToken
	"""
	Refresh JWT token. Mutation tries to take refreshToken from the input.If it fails it will try to take refreshToken from the http-only cookie -refreshToken. csrfToken is required when refreshToken is provided as a cookie.
	"""
	tokenRefresh(
		"""
		CSRF token required to refresh token. This argument is required when refreshToken is provided as a cookie.
		"""
		csrfToken: String
		"""
		Refresh token.
		"""
		refreshToken: String
	): RefreshToken
	"""
	Verify JWT token.
	"""
	tokenVerify(
		"""
		JWT token to validate.
		"""
		token: String!
	): VerifyToken
	"""
	Deactivate all JWT tokens of the currently authenticated user.
	"""
	tokensDeactivateAll: DeactivateAllUserTokens
	"""
	Prepare external authentication url for user by custom plugin.
	"""
	externalAuthenticationUrl(
		"""
		The data required by plugin to create external authentication url.
		"""
		input: JSONString!
		"""
		The ID of the authentication plugin.
		"""
		pluginId: String!
	): ExternalAuthenticationUrl
	"""
	Obtain external access tokens for user by custom plugin.
	"""
	externalObtainAccessTokens(
		"""
		The data required by plugin to create authentication data.
		"""
		input: JSONString!
		"""
		The ID of the authentication plugin.
		"""
		pluginId: String!
	): ExternalObtainAccessTokens
	"""
	Refresh user's access by custom plugin.
	"""
	externalRefresh(
		"""
		The data required by plugin to proceed the refresh process.
		"""
		input: JSONString!
		"""
		The ID of the authentication plugin.
		"""
		pluginId: String!
	): ExternalRefresh
	"""
	Logout user by custom plugin.
	"""
	externalLogout(
		"""
		The data required by plugin to proceed the logout process.
		"""
		input: JSONString!
		"""
		The ID of the authentication plugin.
		"""
		pluginId: String!
	): ExternalLogout
	"""
	Verify external authentication data by plugin.
	"""
	externalVerify(
		"""
		The data required by plugin to proceed the verification.
		"""
		input: JSONString!
		"""
		The ID of the authentication plugin.
		"""
		pluginId: String!
	): ExternalVerify
	"""
	Sends an email with the account password modification link.
	"""
	requestPasswordReset(
		"""
		Slug of a channel which will be used for notify user. Optional when only one channel exists.
		"""
		channel: String
		"""
		Email of the user that will be used for password recovery.
		"""
		email: String!
		"""
		URL of a view where users should be redirected to reset the password. URL in RFC 1808 format.
		"""
		redirectUrl: String!
	): RequestPasswordReset
	"""
	Confirm user account with token sent by email during registration.
	"""
	confirmAccount(
		"""
		E-mail of the user performing account confirmation.
		"""
		email: String!
		"""
		A one-time token required to confirm the account.
		"""
		token: String!
	): ConfirmAccount
	"""
	Sets the user's password from the token sent by email using the RequestPasswordReset mutation.
	"""
	setPassword(
		"""
		Email of a user.
		"""
		email: String!
		"""
		Password of a user.
		"""
		password: String!
		"""
		A one-time token required to set the password.
		"""
		token: String!
	): SetPassword
	"""
	Change the password of the logged in user.
	"""
	passwordChange(
		"""
		New user password.
		"""
		newPassword: String!
		"""
		Current user password.
		"""
		oldPassword: String!
	): PasswordChange
	"""
	Request email change of the logged in user.
	"""
	requestEmailChange(
		"""
		Slug of a channel which will be used to notify users. Optional when only one channel exists.
		"""
		channel: String
		"""
		New user email.
		"""
		newEmail: String!
		"""
		User password.
		"""
		password: String!
		"""
		URL of a view where users should be redirected to update the email address. URL in RFC 1808 format.
		"""
		redirectUrl: String!
	): RequestEmailChange
	"""
	Confirm the email change of the logged-in user.
	"""
	confirmEmailChange(
		"""
		Slug of a channel which will be used to notify users. Optional when only one channel exists.
		"""
		channel: String
		"""
		A one-time token required to change the email.
		"""
		token: String!
	): ConfirmEmailChange
	"""
	Create a new address for the customer.
	"""
	accountAddressCreate(
		"""
		Fields required to create address.
		"""
		input: AddressInput!
		"""
		A type of address. If provided, the new address will be automatically assigned as the customer's default address of that type.
		"""
		type: AddressTypeEnum
	): AccountAddressCreate
	"""
	Updates an address of the logged-in user.
	"""
	accountAddressUpdate(
		"""
		ID of the address to update.
		"""
		id: ID!
		"""
		Fields required to update the address.
		"""
		input: AddressInput!
	): AccountAddressUpdate
	"""
	Delete an address of the logged-in user.
	"""
	accountAddressDelete(
		"""
		ID of the address to delete.
		"""
		id: ID!
	): AccountAddressDelete
	"""
	Sets a default address for the authenticated user.
	"""
	accountSetDefaultAddress(
		"""
		ID of the address to set as default.
		"""
		id: ID!
		"""
		The type of address.
		"""
		type: AddressTypeEnum!
	): AccountSetDefaultAddress
	"""
	Register a new user.
	"""
	accountRegister(
		"""
		Fields required to create a user.
		"""
		input: AccountRegisterInput!
	): AccountRegister
	"""
	Updates the account of the logged-in user.
	"""
	accountUpdate(
		"""
		Fields required to update the account of the logged-in user.
		"""
		input: AccountInput!
	): AccountUpdate
	"""
	Sends an email with the account removal link for the logged-in user.
	"""
	accountRequestDeletion(
		"""
		Slug of a channel which will be used to notify users. Optional when only one channel exists.
		"""
		channel: String
		"""
		URL of a view where users should be redirected to delete their account. URL in RFC 1808 format.
		"""
		redirectUrl: String!
	): AccountRequestDeletion
	"""
	Remove user account.
	"""
	accountDelete(
		"""
		A one-time token required to remove account. Sent by email using AccountRequestDeletion mutation.
		"""
		token: String!
	): AccountDelete
	"""
	Creates user address.
	"""
	addressCreate(
		"""
		Fields required to create address.
		"""
		input: AddressInput!
		"""
		ID of a user to create address for.
		"""
		userId: ID!
	): AddressCreate
	"""
	Updates an address.
	"""
	addressUpdate(
		"""
		ID of the address to update.
		"""
		id: ID!
		"""
		Fields required to update the address.
		"""
		input: AddressInput!
	): AddressUpdate
	"""
	Deletes an address.
	"""
	addressDelete(
		"""
		ID of the address to delete.
		"""
		id: ID!
	): AddressDelete
	"""
	Sets a default address for the given user.
	"""
	addressSetDefault(
		"""
		ID of the address.
		"""
		addressId: ID!
		"""
		The type of address.
		"""
		type: AddressTypeEnum!
		"""
		ID of the user to change the address for.
		"""
		userId: ID!
	): AddressSetDefault
	"""
	Creates a new customer.
	"""
	customerCreate(
		"""
		Fields required to create a customer.
		"""
		input: UserCreateInput!
	): CustomerCreate
	"""
	Updates an existing customer.
	"""
	customerUpdate(
		"""
		ID of a customer to update.
		"""
		id: ID!
		"""
		Fields required to update a customer.
		"""
		input: CustomerInput!
	): CustomerUpdate
	"""
	Deletes a customer.
	"""
	customerDelete(
		"""
		ID of a customer to delete.
		"""
		id: ID!
	): CustomerDelete
	"""
	Deletes customers.
	"""
	customerBulkDelete(
		"""
		List of user IDs to delete.
		"""
		ids: [ID!]
	): CustomerBulkDelete
	"""
	Creates a new staff user.
	"""
	staffCreate(
		"""
		Fields required to create a staff user.
		"""
		input: StaffCreateInput!
	): StaffCreate
	"""
	Updates an existing staff user.
	"""
	staffUpdate(
		"""
		ID of a staff user to update.
		"""
		id: ID!
		"""
		Fields required to update a staff user.
		"""
		input: StaffUpdateInput!
	): StaffUpdate
	"""
	Deletes a staff user.
	"""
	staffDelete(
		"""
		ID of a staff user to delete.
		"""
		id: ID!
	): StaffDelete
	"""
	Deletes staff users.
	"""
	staffBulkDelete(
		"""
		List of user IDs to delete.
		"""
		ids: [ID!]
	): StaffBulkDelete
	"""
	Create a user avatar. Only for staff members. This mutation must be sent as a  request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
	"""
	userAvatarUpdate(
		"""
		Represents an image file in a multipart request.
		"""
		image: Upload!
	): UserAvatarUpdate
	"""
	Deletes a user avatar. Only for staff members.
	"""
	userAvatarDelete: UserAvatarDelete
	"""
	Activate or deactivate users.
	"""
	userBulkSetActive(
		"""
		List of user IDs to (de)activate).
		"""
		ids: [ID!]
		"""
		Determine if users will be set active or not.
		"""
		isActive: Boolean!
	): UserBulkSetActive
	"""
	Create new permission group.
	"""
	permissionGroupCreate(
		"""
		Input fields to create permission group.
		"""
		input: PermissionGroupCreateInput!
	): PermissionGroupCreate
	"""
	Update permission group.
	"""
	permissionGroupUpdate(
		"""
		ID of the group to update.
		"""
		id: ID!
		"""
		Input fields to create permission group.
		"""
		input: PermissionGroupUpdateInput!
	): PermissionGroupUpdate
	"""
	Delete permission group.
	"""
	permissionGroupDelete(
		"""
		ID of the group to delete.
		"""
		id: ID!
	): PermissionGroupDelete
}

"""
Creates a new webhook subscription.
"""
type WebhookCreate{
	webhookErrors: [WebhookError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [WebhookError!]!
	webhook: Webhook
}

type WebhookError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: WebhookErrorCode!
}

"""
An enumeration.
"""
enum WebhookErrorCode{
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
}

input WebhookCreateInput{
	"""
	The name of the webhook.
	"""
	name: String
	"""
	The url to receive the payload.
	"""
	targetUrl: String
	"""
	The events that webhook wants to subscribe.
	"""
	events: [WebhookEventTypeEnum]
	"""
	ID of the app to which webhook belongs.
	"""
	app: ID
	"""
	Determine if webhook will be set active or not.
	"""
	isActive: Boolean
	"""
	The secret key used to create a hash signature with each payload.
	"""
	secretKey: String
}

"""
Deletes a webhook subscription.
"""
type WebhookDelete{
	webhookErrors: [WebhookError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [WebhookError!]!
	webhook: Webhook
}

"""
Updates a webhook subscription.
"""
type WebhookUpdate{
	webhookErrors: [WebhookError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [WebhookError!]!
	webhook: Webhook
}

input WebhookUpdateInput{
	"""
	The new name of the webhook.
	"""
	name: String
	"""
	The url to receive the payload.
	"""
	targetUrl: String
	"""
	The events that webhook wants to subscribe.
	"""
	events: [WebhookEventTypeEnum]
	"""
	ID of the app to which webhook belongs.
	"""
	app: ID
	"""
	Determine if webhook will be set active or not.
	"""
	isActive: Boolean
	"""
	Use to create a hash signature with each payload.
	"""
	secretKey: String
}

"""
Creates new warehouse.
"""
type WarehouseCreate{
	warehouseErrors: [WarehouseError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [WarehouseError!]!
	warehouse: Warehouse
}

type WarehouseError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: WarehouseErrorCode!
}

"""
An enumeration.
"""
enum WarehouseErrorCode{
	ALREADY_EXISTS
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
}

input WarehouseCreateInput{
	"""
	Warehouse slug.
	"""
	slug: String
	"""
	The email address of the warehouse.
	"""
	email: String
	"""
	Warehouse name.
	"""
	name: String!
	"""
	Address of the warehouse.
	"""
	address: AddressInput!
	"""
	Shipping zones supported by the warehouse.
	"""
	shippingZones: [ID]
}

"""
Updates given warehouse.
"""
type WarehouseUpdate{
	warehouseErrors: [WarehouseError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [WarehouseError!]!
	warehouse: Warehouse
}

input WarehouseUpdateInput{
	"""
	Warehouse slug.
	"""
	slug: String
	"""
	The email address of the warehouse.
	"""
	email: String
	"""
	Warehouse name.
	"""
	name: String
	"""
	Address of the warehouse.
	"""
	address: AddressInput
}

"""
Deletes selected warehouse.
"""
type WarehouseDelete{
	warehouseErrors: [WarehouseError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [WarehouseError!]!
	warehouse: Warehouse
}

"""
Add shipping zone to given warehouse.
"""
type WarehouseShippingZoneAssign{
	warehouseErrors: [WarehouseError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [WarehouseError!]!
	warehouse: Warehouse
}

"""
Remove shipping zone from given warehouse.
"""
type WarehouseShippingZoneUnassign{
	warehouseErrors: [WarehouseError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [WarehouseError!]!
	warehouse: Warehouse
}

"""
Creates a new staff notification recipient.
"""
type StaffNotificationRecipientCreate{
	shopErrors: [ShopError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShopError!]!
	staffNotificationRecipient: StaffNotificationRecipient
}

type ShopError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ShopErrorCode!
}

"""
An enumeration.
"""
enum ShopErrorCode{
	ALREADY_EXISTS
	CANNOT_FETCH_TAX_RATES
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
}

input StaffNotificationRecipientInput{
	"""
	The ID of the user subscribed to email notifications..
	"""
	user: ID
	"""
	Email address of a user subscribed to email notifications.
	"""
	email: String
	"""
	Determines if a notification active.
	"""
	active: Boolean
}

"""
Updates a staff notification recipient.
"""
type StaffNotificationRecipientUpdate{
	shopErrors: [ShopError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShopError!]!
	staffNotificationRecipient: StaffNotificationRecipient
}

"""
Delete staff notification recipient.
"""
type StaffNotificationRecipientDelete{
	shopErrors: [ShopError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShopError!]!
	staffNotificationRecipient: StaffNotificationRecipient
}

"""
Updates site domain of the shop.
"""
type ShopDomainUpdate{
	"""
	Updated shop.
	"""
	shop: Shop
	shopErrors: [ShopError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShopError!]!
}

input SiteDomainInput{
	"""
	Domain name for shop.
	"""
	domain: String
	"""
	Shop site name.
	"""
	name: String
}

"""
Updates shop settings.
"""
type ShopSettingsUpdate{
	"""
	Updated shop.
	"""
	shop: Shop
	shopErrors: [ShopError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShopError!]!
}

input ShopSettingsInput{
	"""
	Header text.
	"""
	headerText: String
	"""
	SEO description.
	"""
	description: String
	"""
	Include taxes in prices.
	"""
	includeTaxesInPrices: Boolean
	"""
	Display prices with tax in store.
	"""
	displayGrossPrices: Boolean
	"""
	Charge taxes on shipping.
	"""
	chargeTaxesOnShipping: Boolean
	"""
	Enable inventory tracking.
	"""
	trackInventoryByDefault: Boolean
	"""
	Default weight unit.
	"""
	defaultWeightUnit: WeightUnitsEnum
	"""
	Enable automatic fulfillment for all digital products.
	"""
	automaticFulfillmentDigitalProducts: Boolean
	"""
	Default number of max downloads per digital content URL.
	"""
	defaultDigitalMaxDownloads: Int
	"""
	Default number of days which digital content URL will be valid.
	"""
	defaultDigitalUrlValidDays: Int
	"""
	Default email sender's name.
	"""
	defaultMailSenderName: String
	"""
	Default email sender's address.
	"""
	defaultMailSenderAddress: String
	"""
	URL of a view where customers can set their password.
	"""
	customerSetPasswordUrl: String
}

"""
Fetch tax rates.
"""
type ShopFetchTaxRates{
	"""
	Updated shop.
	"""
	shop: Shop
	shopErrors: [ShopError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShopError!]!
}

"""
Creates/updates translations for shop settings.
"""
type ShopSettingsTranslate{
	"""
	Updated shop settings.
	"""
	shop: Shop
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
}

type TranslationError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: TranslationErrorCode!
}

"""
An enumeration.
"""
enum TranslationErrorCode{
	GRAPHQL_ERROR
	NOT_FOUND
	REQUIRED
}

input ShopSettingsTranslationInput{
	headerText: String
	description: String
}

"""
Update the shop's address. If the  value is passed, the currently selected address will be deleted.
"""
type ShopAddressUpdate{
	"""
	Updated shop.
	"""
	shop: Shop
	shopErrors: [ShopError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShopError!]!
}

"""
Update shop order settings.
"""
type OrderSettingsUpdate{
	"""
	Order settings.
	"""
	orderSettings: OrderSettings
	orderSettingsErrors: [OrderSettingsError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderSettingsError!]!
}

type OrderSettingsError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: OrderSettingsErrorCode!
}

"""
An enumeration.
"""
enum OrderSettingsErrorCode{
	INVALID
}

input OrderSettingsUpdateInput{
	"""
	When disabled, all new orders from checkout will be marked as unconfirmed. When enabled orders from checkout will become unfulfilled immediately.
	"""
	automaticallyConfirmAllNewOrders: Boolean!
}

"""
Manage shipping method's availability in channels.
"""
type ShippingMethodChannelListingUpdate{
	"""
	An updated shipping method instance.
	"""
	shippingMethod: ShippingMethod
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
}

type ShippingError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ShippingErrorCode!
	"""
	List of warehouse IDs which causes the error.
	"""
	warehouses: [ID!]
	"""
	List of channels IDs which causes the error.
	"""
	channels: [ID!]
}

"""
An enumeration.
"""
enum ShippingErrorCode{
	ALREADY_EXISTS
	GRAPHQL_ERROR
	INVALID
	MAX_LESS_THAN_MIN
	NOT_FOUND
	REQUIRED
	UNIQUE
	DUPLICATED_INPUT_ITEM
}

input ShippingMethodChannelListingInput{
	"""
	List of channels to which the shipping method should be assigned.
	"""
	addChannels: [ShippingMethodChannelListingAddInput!]
	"""
	List of channels from which the shipping method should be unassigned.
	"""
	removeChannels: [ID!]
}

input ShippingMethodChannelListingAddInput{
	"""
	ID of a channel.
	"""
	channelId: ID!
	"""
	Shipping price of the shipping method in this channel.
	"""
	price: PositiveDecimal
	"""
	Minimum order price to use this shipping method.
	"""
	minimumOrderPrice: PositiveDecimal
	"""
	Maximum order price to use this shipping method.
	"""
	maximumOrderPrice: PositiveDecimal
}

"""
Creates a new shipping price.
"""
type ShippingPriceCreate{
	"""
	A shipping zone to which the shipping method belongs.
	"""
	shippingZone: ShippingZone
	shippingMethod: ShippingMethod
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
}

input ShippingPriceInput{
	"""
	Name of the shipping method.
	"""
	name: String
	"""
	Shipping method description (JSON).
	"""
	description: JSONString
	"""
	Minimum order weight to use this shipping method.
	"""
	minimumOrderWeight: WeightScalar
	"""
	Maximum order weight to use this shipping method.
	"""
	maximumOrderWeight: WeightScalar
	"""
	Maximum number of days for delivery.
	"""
	maximumDeliveryDays: Int
	"""
	Minimal number of days for delivery.
	"""
	minimumDeliveryDays: Int
	"""
	Shipping type: price or weight based.
	"""
	type: ShippingMethodTypeEnum
	"""
	Shipping zone this method belongs to.
	"""
	shippingZone: ID
	"""
	Postal code rules to add.
	"""
	addPostalCodeRules: [ShippingPostalCodeRulesCreateInputRange!]
	"""
	Postal code rules to delete.
	"""
	deletePostalCodeRules: [ID!]
	"""
	Inclusion type for currently assigned postal code rules.
	"""
	inclusionType: PostalCodeRuleInclusionTypeEnum
}

scalar WeightScalar

input ShippingPostalCodeRulesCreateInputRange{
	"""
	Start range of the postal code.
	"""
	start: String!
	"""
	End range of the postal code.
	"""
	end: String
}

"""
Deletes a shipping price.
"""
type ShippingPriceDelete{
	"""
	A shipping method to delete.
	"""
	shippingMethod: ShippingMethod
	"""
	A shipping zone to which the shipping method belongs.
	"""
	shippingZone: ShippingZone
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
}

"""
Deletes shipping prices.
"""
type ShippingPriceBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
}

"""
Updates a new shipping price.
"""
type ShippingPriceUpdate{
	"""
	A shipping zone to which the shipping method belongs.
	"""
	shippingZone: ShippingZone
	shippingMethod: ShippingMethod
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
}

"""
Creates/updates translations for a shipping method.
"""
type ShippingPriceTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	shippingMethod: ShippingMethod
}

input ShippingPriceTranslationInput{
	name: String
	"""
	Translated shipping method description (JSON).
	"""
	description: JSONString
}

"""
Exclude products from shipping price.
"""
type ShippingPriceExcludeProducts{
	"""
	A shipping method with new list of excluded products.
	"""
	shippingMethod: ShippingMethod
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
}

input ShippingPriceExcludeProductsInput{
	"""
	List of products which will be excluded.
	"""
	products: [ID!]
}

"""
Remove product from excluded list for shipping price.
"""
type ShippingPriceRemoveProductFromExclude{
	"""
	A shipping method with new list of excluded products.
	"""
	shippingMethod: ShippingMethod
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
}

"""
Creates a new shipping zone.
"""
type ShippingZoneCreate{
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
	shippingZone: ShippingZone
}

input ShippingZoneCreateInput{
	"""
	Shipping zone's name. Visible only to the staff.
	"""
	name: String
	"""
	Description of the shipping zone.
	"""
	description: String
	"""
	List of countries in this shipping zone.
	"""
	countries: [String]
	"""
	Default shipping zone will be used for countries not covered by other zones.
	"""
	default: Boolean
	"""
	List of warehouses to assign to a shipping zone
	"""
	addWarehouses: [ID]
	"""
	List of channels to assign to the shipping zone.
	"""
	addChannels: [ID!]
}

"""
Deletes a shipping zone.
"""
type ShippingZoneDelete{
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
	shippingZone: ShippingZone
}

"""
Deletes shipping zones.
"""
type ShippingZoneBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
}

"""
Updates a new shipping zone.
"""
type ShippingZoneUpdate{
	shippingErrors: [ShippingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ShippingError!]!
	shippingZone: ShippingZone
}

input ShippingZoneUpdateInput{
	"""
	Shipping zone's name. Visible only to the staff.
	"""
	name: String
	"""
	Description of the shipping zone.
	"""
	description: String
	"""
	List of countries in this shipping zone.
	"""
	countries: [String]
	"""
	Default shipping zone will be used for countries not covered by other zones.
	"""
	default: Boolean
	"""
	List of warehouses to assign to a shipping zone
	"""
	addWarehouses: [ID]
	"""
	List of channels to assign to the shipping zone.
	"""
	addChannels: [ID!]
	"""
	List of warehouses to unassign from a shipping zone
	"""
	removeWarehouses: [ID]
	"""
	List of channels to unassign from the shipping zone.
	"""
	removeChannels: [ID!]
}

"""
Assign attributes to a given product type.
"""
type ProductAttributeAssign{
	"""
	The updated product type.
	"""
	productType: ProductType
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

type ProductError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ProductErrorCode!
	"""
	List of attributes IDs which causes the error.
	"""
	attributes: [ID!]
	"""
	List of attribute values IDs which causes the error.
	"""
	values: [ID!]
}

"""
An enumeration.
"""
enum ProductErrorCode{
	ALREADY_EXISTS
	ATTRIBUTE_ALREADY_ASSIGNED
	ATTRIBUTE_CANNOT_BE_ASSIGNED
	ATTRIBUTE_VARIANTS_DISABLED
	DUPLICATED_INPUT_ITEM
	GRAPHQL_ERROR
	INVALID
	PRODUCT_WITHOUT_CATEGORY
	NOT_PRODUCTS_IMAGE
	NOT_PRODUCTS_VARIANT
	NOT_FOUND
	REQUIRED
	UNIQUE
	VARIANT_NO_DIGITAL_CONTENT
	CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT
	PRODUCT_NOT_ASSIGNED_TO_CHANNEL
	UNSUPPORTED_MEDIA_PROVIDER
}

input ProductAttributeAssignInput{
	"""
	The ID of the attribute to assign.
	"""
	id: ID!
	"""
	The attribute type to be assigned as.
	"""
	type: ProductAttributeType!
}

enum ProductAttributeType{
	PRODUCT
	VARIANT
}

"""
Un-assign attributes from a given product type.
"""
type ProductAttributeUnassign{
	"""
	The updated product type.
	"""
	productType: ProductType
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Creates a new category.
"""
type CategoryCreate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	category: Category
}

input CategoryInput{
	"""
	Category description (JSON).
	"""
	description: JSONString
	"""
	Category name.
	"""
	name: String
	"""
	Category slug.
	"""
	slug: String
	"""
	Search engine optimization fields.
	"""
	seo: SeoInput
	"""
	Background image file.
	"""
	backgroundImage: Upload
	"""
	Alt text for a product media.
	"""
	backgroundImageAlt: String
}

input SeoInput{
	"""
	SEO title.
	"""
	title: String
	"""
	SEO description.
	"""
	description: String
}

"""
Variables of this type must be set to null in mutations. They will be replaced with a filename from a following multipart part containing a binary file. See: https://github.com/jaydenseric/graphql-multipart-request-spec.
"""
scalar Upload

"""
Deletes a category.
"""
type CategoryDelete{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	category: Category
}

"""
Deletes categories.
"""
type CategoryBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Updates a category.
"""
type CategoryUpdate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	category: Category
}

"""
Creates/updates translations for a category.
"""
type CategoryTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	category: Category
}

input TranslationInput{
	seoTitle: String
	seoDescription: String
	name: String
	description: JSONString
}

"""
Adds products to a collection.
"""
type CollectionAddProducts{
	"""
	Collection to which products will be added.
	"""
	collection: Collection
	collectionErrors: [CollectionError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CollectionError!]!
}

type CollectionError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	List of products IDs which causes the error.
	"""
	products: [ID!]
	"""
	The error code.
	"""
	code: CollectionErrorCode!
}

"""
An enumeration.
"""
enum CollectionErrorCode{
	DUPLICATED_INPUT_ITEM
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
	CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT
}

"""
Creates a new collection.
"""
type CollectionCreate{
	collectionErrors: [CollectionError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CollectionError!]!
	collection: Collection
}

input CollectionCreateInput{
	"""
	Informs whether a collection is published.
	"""
	isPublished: Boolean
	"""
	Name of the collection.
	"""
	name: String
	"""
	Slug of the collection.
	"""
	slug: String
	"""
	Description of the collection (JSON).
	"""
	description: JSONString
	"""
	Background image file.
	"""
	backgroundImage: Upload
	"""
	Alt text for an image.
	"""
	backgroundImageAlt: String
	"""
	Search engine optimization fields.
	"""
	seo: SeoInput
	"""
	Publication date. ISO 8601 standard.
	"""
	publicationDate: Date
	"""
	List of products to be added to the collection.
	"""
	products: [ID]
}

"""
Deletes a collection.
"""
type CollectionDelete{
	collectionErrors: [CollectionError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CollectionError!]!
	collection: Collection
}

"""
Reorder the products of a collection.
"""
type CollectionReorderProducts{
	"""
	Collection from which products are reordered.
	"""
	collection: Collection
	collectionErrors: [CollectionError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CollectionError!]!
}

input MoveProductInput{
	"""
	The ID of the product to move.
	"""
	productId: ID!
	"""
	The relative sorting position of the product (from -inf to +inf) starting from the first given product's actual position.1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged.
	"""
	sortOrder: Int
}

"""
Deletes collections.
"""
type CollectionBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	collectionErrors: [CollectionError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CollectionError!]!
}

"""
Remove products from a collection.
"""
type CollectionRemoveProducts{
	"""
	Collection from which products will be removed.
	"""
	collection: Collection
	collectionErrors: [CollectionError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CollectionError!]!
}

"""
Updates a collection.
"""
type CollectionUpdate{
	collectionErrors: [CollectionError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CollectionError!]!
	collection: Collection
}

input CollectionInput{
	"""
	Informs whether a collection is published.
	"""
	isPublished: Boolean
	"""
	Name of the collection.
	"""
	name: String
	"""
	Slug of the collection.
	"""
	slug: String
	"""
	Description of the collection (JSON).
	"""
	description: JSONString
	"""
	Background image file.
	"""
	backgroundImage: Upload
	"""
	Alt text for an image.
	"""
	backgroundImageAlt: String
	"""
	Search engine optimization fields.
	"""
	seo: SeoInput
	"""
	Publication date. ISO 8601 standard.
	"""
	publicationDate: Date
}

"""
Creates/updates translations for a collection.
"""
type CollectionTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	collection: Collection
}

"""
Manage collection's availability in channels.
"""
type CollectionChannelListingUpdate{
	"""
	An updated collection instance.
	"""
	collection: Collection
	collectionChannelListingErrors: [CollectionChannelListingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CollectionChannelListingError!]!
}

type CollectionChannelListingError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ProductErrorCode!
	"""
	List of attributes IDs which causes the error.
	"""
	attributes: [ID!]
	"""
	List of attribute values IDs which causes the error.
	"""
	values: [ID!]
	"""
	List of channels IDs which causes the error.
	"""
	channels: [ID!]
}

input CollectionChannelListingUpdateInput{
	"""
	List of channels to which the collection should be assigned.
	"""
	addChannels: [PublishableChannelListingInput!]
	"""
	List of channels from which the collection should be unassigned.
	"""
	removeChannels: [ID!]
}

input PublishableChannelListingInput{
	"""
	ID of a channel.
	"""
	channelId: ID!
	"""
	Determines if object is visible to customers.
	"""
	isPublished: Boolean
	"""
	Publication date. ISO 8601 standard.
	"""
	publicationDate: Date
}

"""
Creates a new product.
"""
type ProductCreate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	product: Product
}

input ProductCreateInput{
	"""
	List of attributes.
	"""
	attributes: [AttributeValueInput!]
	"""
	ID of the product's category.
	"""
	category: ID
	"""
	Determine if taxes are being charged for the product.
	"""
	chargeTaxes: Boolean
	"""
	List of IDs of collections that the product belongs to.
	"""
	collections: [ID!]
	"""
	Product description (JSON).
	"""
	description: JSONString
	"""
	Product name.
	"""
	name: String
	"""
	Product slug.
	"""
	slug: String
	"""
	Tax rate for enabled tax gateway.
	"""
	taxCode: String
	"""
	Search engine optimization fields.
	"""
	seo: SeoInput
	"""
	Weight of the Product.
	"""
	weight: WeightScalar
	"""
	Defines the product rating value.
	"""
	rating: Float
	"""
	ID of the type that product belongs to.
	"""
	productType: ID!
}

input AttributeValueInput{
	"""
	ID of the selected attribute.
	"""
	id: ID
	"""
	The value or slug of an attribute to resolve. If the passed value is non-existent, it will be created.
	"""
	values: [String!]
	"""
	URL of the file attribute. Every time, a new value is created.
	"""
	file: String
	"""
	File content type.
	"""
	contentType: String
	"""
	List of entity IDs that will be used as references.
	"""
	references: [ID!]
	"""
	Text content in JSON format.
	"""
	richText: JSONString
	"""
	Represents the boolean value of the attribute value.
	"""
	boolean: Boolean
	"""
	Represents the date value of the attribute value.
	"""
	date: Date
	"""
	Represents the date time value of the attribute value.
	"""
	dateTime: DateTime
}

"""
Deletes a product.
"""
type ProductDelete{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	product: Product
}

"""
Deletes products.
"""
type ProductBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Updates an existing product.
"""
type ProductUpdate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	product: Product
}

input ProductInput{
	"""
	List of attributes.
	"""
	attributes: [AttributeValueInput!]
	"""
	ID of the product's category.
	"""
	category: ID
	"""
	Determine if taxes are being charged for the product.
	"""
	chargeTaxes: Boolean
	"""
	List of IDs of collections that the product belongs to.
	"""
	collections: [ID!]
	"""
	Product description (JSON).
	"""
	description: JSONString
	"""
	Product name.
	"""
	name: String
	"""
	Product slug.
	"""
	slug: String
	"""
	Tax rate for enabled tax gateway.
	"""
	taxCode: String
	"""
	Search engine optimization fields.
	"""
	seo: SeoInput
	"""
	Weight of the Product.
	"""
	weight: WeightScalar
	"""
	Defines the product rating value.
	"""
	rating: Float
}

"""
Creates/updates translations for a product.
"""
type ProductTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	product: Product
}

"""
Manage product's availability in channels.
"""
type ProductChannelListingUpdate{
	"""
	An updated product instance.
	"""
	product: Product
	productChannelListingErrors: [ProductChannelListingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductChannelListingError!]!
}

type ProductChannelListingError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ProductErrorCode!
	"""
	List of attributes IDs which causes the error.
	"""
	attributes: [ID!]
	"""
	List of attribute values IDs which causes the error.
	"""
	values: [ID!]
	"""
	List of channels IDs which causes the error.
	"""
	channels: [ID!]
	"""
	List of variants IDs which causes the error.
	"""
	variants: [ID!]
}

input ProductChannelListingUpdateInput{
	"""
	List of channels to which the product should be assigned or updated.
	"""
	updateChannels: [ProductChannelListingAddInput!]
	"""
	List of channels from which the product should be unassigned.
	"""
	removeChannels: [ID!]
}

input ProductChannelListingAddInput{
	"""
	ID of a channel.
	"""
	channelId: ID!
	"""
	Determines if object is visible to customers.
	"""
	isPublished: Boolean
	"""
	Publication date. ISO 8601 standard.
	"""
	publicationDate: Date
	"""
	Determines if product is visible in product listings (doesn't apply to product collections).
	"""
	visibleInListings: Boolean
	"""
	Determine if product should be available for purchase.
	"""
	isAvailableForPurchase: Boolean
	"""
	A start date from which a product will be available for purchase. When not set and isAvailable is set to True, the current day is assumed.
	"""
	availableForPurchaseDate: Date
	"""
	List of variants to which the channel should be assigned.
	"""
	addVariants: [ID!]
	"""
	List of variants from which the channel should be unassigned.
	"""
	removeVariants: [ID!]
}

"""
Create a media object (image or video URL) associated with product. For image, this mutation must be sent as a  request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
"""
type ProductMediaCreate{
	product: Product
	media: ProductMedia
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

input ProductMediaCreateInput{
	"""
	Alt text for a product media.
	"""
	alt: String
	"""
	Represents an image file in a multipart request.
	"""
	image: Upload
	"""
	ID of an product.
	"""
	product: ID!
	"""
	Represents an URL to an external media.
	"""
	mediaUrl: String
}

"""
Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook.
"""
type ProductVariantReorder{
	product: Product
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

input ReorderInput{
	"""
	The ID of the item to move.
	"""
	id: ID!
	"""
	The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged.
	"""
	sortOrder: Int
}

"""
Deletes a product media.
"""
type ProductMediaDelete{
	product: Product
	media: ProductMedia
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Deletes product media.
"""
type ProductMediaBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Changes ordering of the product media.
"""
type ProductMediaReorder{
	product: Product
	media: [ProductMedia!]
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Updates a product media.
"""
type ProductMediaUpdate{
	product: Product
	media: ProductMedia
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

input ProductMediaUpdateInput{
	"""
	Alt text for a product media.
	"""
	alt: String
}

"""
Creates a new product type.
"""
type ProductTypeCreate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	productType: ProductType
}

input ProductTypeInput{
	"""
	Name of the product type.
	"""
	name: String
	"""
	Product type slug.
	"""
	slug: String
	"""
	Determines if product of this type has multiple variants. This option mainly simplifies product management in the dashboard. There is always at least one variant created under the hood.
	"""
	hasVariants: Boolean
	"""
	List of attributes shared among all product variants.
	"""
	productAttributes: [ID]
	"""
	List of attributes used to distinguish between different variants of a product.
	"""
	variantAttributes: [ID]
	"""
	Determines if shipping is required for products of this variant.
	"""
	isShippingRequired: Boolean
	"""
	Determines if products are digital.
	"""
	isDigital: Boolean
	"""
	Weight of the ProductType items.
	"""
	weight: WeightScalar
	"""
	Tax rate for enabled tax gateway.
	"""
	taxCode: String
}

"""
Deletes a product type.
"""
type ProductTypeDelete{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	productType: ProductType
}

"""
Deletes product types.
"""
type ProductTypeBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Updates an existing product type.
"""
type ProductTypeUpdate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	productType: ProductType
}

"""
Reorder the attributes of a product type.
"""
type ProductTypeReorderAttributes{
	"""
	Product type from which attributes are reordered.
	"""
	productType: ProductType
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Reorder product attribute values.
"""
type ProductReorderAttributeValues{
	"""
	Product from which attribute values are reordered.
	"""
	product: Product
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Create new digital content. This mutation must be sent as a  request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
"""
type DigitalContentCreate{
	variant: ProductVariant
	content: DigitalContent
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

input DigitalContentUploadInput{
	"""
	Use default digital content settings for this product.
	"""
	useDefaultSettings: Boolean!
	"""
	Determines how many times a download link can be accessed by a customer.
	"""
	maxDownloads: Int
	"""
	Determines for how many days a download link is active since it was generated.
	"""
	urlValidDays: Int
	"""
	Overwrite default automatic_fulfillment setting for variant.
	"""
	automaticFulfillment: Boolean
	"""
	Represents an file in a multipart request.
	"""
	contentFile: Upload!
}

"""
Remove digital content assigned to given variant.
"""
type DigitalContentDelete{
	variant: ProductVariant
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Update digital content.
"""
type DigitalContentUpdate{
	variant: ProductVariant
	content: DigitalContent
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

input DigitalContentInput{
	"""
	Use default digital content settings for this product.
	"""
	useDefaultSettings: Boolean!
	"""
	Determines how many times a download link can be accessed by a customer.
	"""
	maxDownloads: Int
	"""
	Determines for how many days a download link is active since it was generated.
	"""
	urlValidDays: Int
	"""
	Overwrite default automatic_fulfillment setting for variant.
	"""
	automaticFulfillment: Boolean
}

"""
Generate new URL to digital content.
"""
type DigitalContentUrlCreate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	digitalContentUrl: DigitalContentUrl
}

input DigitalContentUrlCreateInput{
	"""
	Digital content ID which URL will belong to.
	"""
	content: ID!
}

"""
Creates a new variant for a product.
"""
type ProductVariantCreate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	productVariant: ProductVariant
}

input ProductVariantCreateInput{
	"""
	List of attributes specific to this variant.
	"""
	attributes: [AttributeValueInput!]!
	"""
	Stock keeping unit.
	"""
	sku: String
	"""
	Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item.
	"""
	trackInventory: Boolean
	"""
	Weight of the Product Variant.
	"""
	weight: WeightScalar
	"""
	Product ID of which type is the variant.
	"""
	product: ID!
	"""
	Stocks of a product available for sale.
	"""
	stocks: [StockInput!]
}

input StockInput{
	"""
	Warehouse in which stock is located.
	"""
	warehouse: ID!
	"""
	Quantity of items available for sell.
	"""
	quantity: Int!
}

"""
Deletes a product variant.
"""
type ProductVariantDelete{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	productVariant: ProductVariant
}

"""
Creates product variants for a given product.
"""
type ProductVariantBulkCreate{
	"""
	Returns how many objects were created.
	"""
	count: Int!
	"""
	List of the created variants.
	"""
	productVariants: [ProductVariant!]!
	bulkProductErrors: [BulkProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [BulkProductError!]!
}

type BulkProductError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ProductErrorCode!
	"""
	List of attributes IDs which causes the error.
	"""
	attributes: [ID!]
	"""
	List of attribute values IDs which causes the error.
	"""
	values: [ID!]
	"""
	Index of an input list item that caused the error.
	"""
	index: Int
	"""
	List of warehouse IDs which causes the error.
	"""
	warehouses: [ID!]
	"""
	List of channel IDs which causes the error.
	"""
	channels: [ID!]
}

input ProductVariantBulkCreateInput{
	"""
	List of attributes specific to this variant.
	"""
	attributes: [BulkAttributeValueInput!]!
	"""
	Stock keeping unit.
	"""
	sku: String!
	"""
	Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item.
	"""
	trackInventory: Boolean
	"""
	Weight of the Product Variant.
	"""
	weight: WeightScalar
	"""
	Stocks of a product available for sale.
	"""
	stocks: [StockInput!]
	"""
	List of prices assigned to channels.
	"""
	channelListings: [ProductVariantChannelListingAddInput!]
}

input BulkAttributeValueInput{
	"""
	ID of the selected attribute.
	"""
	id: ID
	"""
	The value or slug of an attribute to resolve. If the passed value is non-existent, it will be created.
	"""
	values: [String!]
	"""
	The boolean value of an attribute to resolve. If the passed value is non-existent, it will be created.
	"""
	boolean: Boolean
}

input ProductVariantChannelListingAddInput{
	"""
	ID of a channel.
	"""
	channelId: ID!
	"""
	Price of the particular variant in channel.
	"""
	price: PositiveDecimal!
	"""
	Cost price of the variant in channel.
	"""
	costPrice: PositiveDecimal
}

"""
Deletes product variants.
"""
type ProductVariantBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Creates stocks for product variant.
"""
type ProductVariantStocksCreate{
	"""
	Updated product variant.
	"""
	productVariant: ProductVariant
	bulkStockErrors: [BulkStockError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [BulkStockError!]!
}

type BulkStockError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ProductErrorCode!
	"""
	List of attributes IDs which causes the error.
	"""
	attributes: [ID!]
	"""
	List of attribute values IDs which causes the error.
	"""
	values: [ID!]
	"""
	Index of an input list item that caused the error.
	"""
	index: Int
}

"""
Delete stocks from product variant.
"""
type ProductVariantStocksDelete{
	"""
	Updated product variant.
	"""
	productVariant: ProductVariant
	stockErrors: [StockError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [StockError!]!
}

type StockError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: StockErrorCode!
}

"""
An enumeration.
"""
enum StockErrorCode{
	ALREADY_EXISTS
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
}

"""
Update stocks for product variant.
"""
type ProductVariantStocksUpdate{
	"""
	Updated product variant.
	"""
	productVariant: ProductVariant
	bulkStockErrors: [BulkStockError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [BulkStockError!]!
}

"""
Updates an existing variant for product.
"""
type ProductVariantUpdate{
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
	productVariant: ProductVariant
}

input ProductVariantInput{
	"""
	List of attributes specific to this variant.
	"""
	attributes: [AttributeValueInput!]
	"""
	Stock keeping unit.
	"""
	sku: String
	"""
	Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item.
	"""
	trackInventory: Boolean
	"""
	Weight of the Product Variant.
	"""
	weight: WeightScalar
}

"""
Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook.
"""
type ProductVariantSetDefault{
	product: Product
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Creates/updates translations for a product variant.
"""
type ProductVariantTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	productVariant: ProductVariant
}

input NameTranslationInput{
	name: String
}

"""
Manage product variant prices in channels.
"""
type ProductVariantChannelListingUpdate{
	"""
	An updated product variant instance.
	"""
	variant: ProductVariant
	productChannelListingErrors: [ProductChannelListingError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductChannelListingError!]!
}

"""
Reorder product variant attribute values.
"""
type ProductVariantReorderAttributeValues{
	"""
	Product variant from which attribute values are reordered.
	"""
	productVariant: ProductVariant
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Assign an media to a product variant.
"""
type VariantMediaAssign{
	productVariant: ProductVariant
	media: ProductMedia
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Unassign an media from a product variant.
"""
type VariantMediaUnassign{
	productVariant: ProductVariant
	media: ProductMedia
	productErrors: [ProductError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ProductError!]!
}

"""
Captures the authorized payment amount.
"""
type PaymentCapture{
	"""
	Updated payment.
	"""
	payment: Payment
	paymentErrors: [PaymentError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PaymentError!]!
}

type PaymentError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: PaymentErrorCode!
}

"""
An enumeration.
"""
enum PaymentErrorCode{
	BILLING_ADDRESS_NOT_SET
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
	PARTIAL_PAYMENT_NOT_ALLOWED
	SHIPPING_ADDRESS_NOT_SET
	INVALID_SHIPPING_METHOD
	SHIPPING_METHOD_NOT_SET
	PAYMENT_ERROR
	NOT_SUPPORTED_GATEWAY
	CHANNEL_INACTIVE
}

"""
Refunds the captured payment amount.
"""
type PaymentRefund{
	"""
	Updated payment.
	"""
	payment: Payment
	paymentErrors: [PaymentError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PaymentError!]!
}

"""
Voids the authorized payment.
"""
type PaymentVoid{
	"""
	Updated payment.
	"""
	payment: Payment
	paymentErrors: [PaymentError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PaymentError!]!
}

"""
Initializes payment process when it is required by gateway.
"""
type PaymentInitialize{
	initializedPayment: PaymentInitialized
	paymentErrors: [PaymentError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PaymentError!]!
}

"""
Server-side data generated by a payment gateway. Optional step when the payment provider requires an additional action to initialize payment session.
"""
type PaymentInitialized{
	"""
	ID of a payment gateway.
	"""
	gateway: String!
	"""
	Payment gateway name.
	"""
	name: String!
	"""
	Initialized data by gateway.
	"""
	data: JSONString
}

"""
Creates a new page.
"""
type PageCreate{
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
	page: Page
}

type PageError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: PageErrorCode!
	"""
	List of attributes IDs which causes the error.
	"""
	attributes: [ID!]
	"""
	List of attribute values IDs which causes the error.
	"""
	values: [ID!]
}

"""
An enumeration.
"""
enum PageErrorCode{
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
	DUPLICATED_INPUT_ITEM
	ATTRIBUTE_ALREADY_ASSIGNED
}

input PageCreateInput{
	"""
	Page internal name.
	"""
	slug: String
	"""
	Page title.
	"""
	title: String
	"""
	Page content in JSON format.
	"""
	content: JSONString
	"""
	List of attributes.
	"""
	attributes: [AttributeValueInput!]
	"""
	Determines if page is visible in the storefront.
	"""
	isPublished: Boolean
	"""
	Publication date. ISO 8601 standard.
	"""
	publicationDate: String
	"""
	Search engine optimization fields.
	"""
	seo: SeoInput
	"""
	ID of the page type that page belongs to.
	"""
	pageType: ID!
}

"""
Deletes a page.
"""
type PageDelete{
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
	page: Page
}

"""
Deletes pages.
"""
type PageBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
}

"""
Publish pages.
"""
type PageBulkPublish{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
}

"""
Updates an existing page.
"""
type PageUpdate{
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
	page: Page
}

input PageInput{
	"""
	Page internal name.
	"""
	slug: String
	"""
	Page title.
	"""
	title: String
	"""
	Page content in JSON format.
	"""
	content: JSONString
	"""
	List of attributes.
	"""
	attributes: [AttributeValueInput!]
	"""
	Determines if page is visible in the storefront.
	"""
	isPublished: Boolean
	"""
	Publication date. ISO 8601 standard.
	"""
	publicationDate: String
	"""
	Search engine optimization fields.
	"""
	seo: SeoInput
}

"""
Creates/updates translations for a page.
"""
type PageTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	page: PageTranslatableContent
}

input PageTranslationInput{
	seoTitle: String
	seoDescription: String
	title: String
	content: JSONString
}

"""
Create a new page type.
"""
type PageTypeCreate{
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
	pageType: PageType
}

input PageTypeCreateInput{
	"""
	Name of the page type.
	"""
	name: String
	"""
	Page type slug.
	"""
	slug: String
	"""
	List of attribute IDs to be assigned to the page type.
	"""
	addAttributes: [ID!]
}

"""
Update page type.
"""
type PageTypeUpdate{
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
	pageType: PageType
}

input PageTypeUpdateInput{
	"""
	Name of the page type.
	"""
	name: String
	"""
	Page type slug.
	"""
	slug: String
	"""
	List of attribute IDs to be assigned to the page type.
	"""
	addAttributes: [ID!]
	"""
	List of attribute IDs to be assigned to the page type.
	"""
	removeAttributes: [ID!]
}

"""
Delete a page type.
"""
type PageTypeDelete{
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
	pageType: PageType
}

"""
Delete page types.
"""
type PageTypeBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
}

"""
Assign attributes to a given page type.
"""
type PageAttributeAssign{
	"""
	The updated page type.
	"""
	pageType: PageType
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
}

"""
Unassign attributes from a given page type.
"""
type PageAttributeUnassign{
	"""
	The updated page type.
	"""
	pageType: PageType
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
}

"""
Reorder the attributes of a page type.
"""
type PageTypeReorderAttributes{
	"""
	Page type from which attributes are reordered.
	"""
	pageType: PageType
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
}

"""
Reorder page attribute values.
"""
type PageReorderAttributeValues{
	"""
	Page from which attribute values are reordered.
	"""
	page: Page
	pageErrors: [PageError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PageError!]!
}

"""
Completes creating an order.
"""
type DraftOrderComplete{
	"""
	Completed order.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Creates a new draft order.
"""
type DraftOrderCreate{
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
	order: Order
}

input DraftOrderCreateInput{
	"""
	Billing address of the customer.
	"""
	billingAddress: AddressInput
	"""
	Customer associated with the draft order.
	"""
	user: ID
	"""
	Email address of the customer.
	"""
	userEmail: String
	"""
	Discount amount for the order.
	"""
	discount: PositiveDecimal
	"""
	Shipping address of the customer.
	"""
	shippingAddress: AddressInput
	"""
	ID of a selected shipping method.
	"""
	shippingMethod: ID
	"""
	ID of the voucher associated with the order.
	"""
	voucher: ID
	"""
	A note from a customer. Visible by customers in the order summary.
	"""
	customerNote: String
	"""
	ID of the channel associated with the order.
	"""
	channelId: ID
	"""
	URL of a view where users should be redirected to see the order details. URL in RFC 1808 format.
	"""
	redirectUrl: String
	"""
	Variant line input consisting of variant ID and quantity of products.
	"""
	lines: [OrderLineCreateInput]
}

input OrderLineCreateInput{
	"""
	Number of variant items ordered.
	"""
	quantity: Int!
	"""
	Product variant ID.
	"""
	variantId: ID!
}

"""
Deletes a draft order.
"""
type DraftOrderDelete{
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
	order: Order
}

"""
Deletes draft orders.
"""
type DraftOrderBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Deletes order lines.
"""
type DraftOrderLinesBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Updates a draft order.
"""
type DraftOrderUpdate{
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
	order: Order
}

input DraftOrderInput{
	"""
	Billing address of the customer.
	"""
	billingAddress: AddressInput
	"""
	Customer associated with the draft order.
	"""
	user: ID
	"""
	Email address of the customer.
	"""
	userEmail: String
	"""
	Discount amount for the order.
	"""
	discount: PositiveDecimal
	"""
	Shipping address of the customer.
	"""
	shippingAddress: AddressInput
	"""
	ID of a selected shipping method.
	"""
	shippingMethod: ID
	"""
	ID of the voucher associated with the order.
	"""
	voucher: ID
	"""
	A note from a customer. Visible by customers in the order summary.
	"""
	customerNote: String
	"""
	ID of the channel associated with the order.
	"""
	channelId: ID
	"""
	URL of a view where users should be redirected to see the order details. URL in RFC 1808 format.
	"""
	redirectUrl: String
}

"""
Adds note to the order.
"""
type OrderAddNote{
	"""
	Order with the note added.
	"""
	order: Order
	"""
	Order note created.
	"""
	event: OrderEvent
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

input OrderAddNoteInput{
	"""
	Note message.
	"""
	message: String!
}

"""
Cancel an order.
"""
type OrderCancel{
	"""
	Canceled order.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Capture an order.
"""
type OrderCapture{
	"""
	Captured order.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Confirms an unconfirmed order by changing status to unfulfilled.
"""
type OrderConfirm{
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Creates new fulfillments for an order.
"""
type OrderFulfill{
	"""
	List of created fulfillments.
	"""
	fulfillments: [Fulfillment]
	"""
	Fulfilled order.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

input OrderFulfillInput{
	"""
	List of items informing how to fulfill the order.
	"""
	lines: [OrderFulfillLineInput!]!
	"""
	If true, send an email notification to the customer.
	"""
	notifyCustomer: Boolean
	"""
	If true, then allow proceed fulfillment when stock is exceeded.
	"""
	allowStockToBeExceeded: Boolean = false
}

input OrderFulfillLineInput{
	"""
	The ID of the order line.
	"""
	orderLineId: ID
	"""
	List of stock items to create.
	"""
	stocks: [OrderFulfillStockInput!]!
}

input OrderFulfillStockInput{
	"""
	The number of line items to be fulfilled from given warehouse.
	"""
	quantity: Int!
	"""
	ID of the warehouse from which the item will be fulfilled.
	"""
	warehouse: ID!
}

"""
Cancels existing fulfillment and optionally restocks items.
"""
type FulfillmentCancel{
	"""
	A canceled fulfillment.
	"""
	fulfillment: Fulfillment
	"""
	Order which fulfillment was cancelled.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

input FulfillmentCancelInput{
	"""
	ID of warehouse where items will be restock.
	"""
	warehouseId: ID!
}

"""
Updates a fulfillment for an order.
"""
type FulfillmentUpdateTracking{
	"""
	A fulfillment with updated tracking.
	"""
	fulfillment: Fulfillment
	"""
	Order for which fulfillment was updated.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

input FulfillmentUpdateTrackingInput{
	"""
	Fulfillment tracking number.
	"""
	trackingNumber: String
	"""
	If true, send an email notification to the customer.
	"""
	notifyCustomer: Boolean = false
}

"""
Refund products.
"""
type FulfillmentRefundProducts{
	"""
	A refunded fulfillment.
	"""
	fulfillment: Fulfillment
	"""
	Order which fulfillment was refunded.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

input OrderRefundProductsInput{
	"""
	List of unfulfilled lines to refund.
	"""
	orderLines: [OrderRefundLineInput!]
	"""
	List of fulfilled lines to refund.
	"""
	fulfillmentLines: [OrderRefundFulfillmentLineInput!]
	"""
	The total amount of refund when the value is provided manually.
	"""
	amountToRefund: PositiveDecimal
	"""
	If true, Saleor will refund shipping costs. If amountToRefund is providedincludeShippingCosts will be ignored.
	"""
	includeShippingCosts: Boolean = false
}

input OrderRefundLineInput{
	"""
	The ID of the order line to refund.
	"""
	orderLineId: ID!
	"""
	The number of items to be refunded.
	"""
	quantity: Int!
}

input OrderRefundFulfillmentLineInput{
	"""
	The ID of the fulfillment line to refund.
	"""
	fulfillmentLineId: ID!
	"""
	The number of items to be refunded.
	"""
	quantity: Int!
}

"""
Return products.
"""
type FulfillmentReturnProducts{
	"""
	A return fulfillment.
	"""
	returnFulfillment: Fulfillment
	"""
	A replace fulfillment.
	"""
	replaceFulfillment: Fulfillment
	"""
	Order which fulfillment was returned.
	"""
	order: Order
	"""
	A draft order which was created for products with replace flag.
	"""
	replaceOrder: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

input OrderReturnProductsInput{
	"""
	List of unfulfilled lines to return.
	"""
	orderLines: [OrderReturnLineInput!]
	"""
	List of fulfilled lines to return.
	"""
	fulfillmentLines: [OrderReturnFulfillmentLineInput!]
	"""
	The total amount of refund when the value is provided manually.
	"""
	amountToRefund: PositiveDecimal
	"""
	If true, Saleor will refund shipping costs. If amountToRefund is providedincludeShippingCosts will be ignored.
	"""
	includeShippingCosts: Boolean = false
	"""
	If true, Saleor will call refund action for all lines.
	"""
	refund: Boolean = false
}

input OrderReturnLineInput{
	"""
	The ID of the order line to return.
	"""
	orderLineId: ID!
	"""
	The number of items to be returned.
	"""
	quantity: Int!
	"""
	Determines, if the line should be added to replace order.
	"""
	replace: Boolean = false
}

input OrderReturnFulfillmentLineInput{
	"""
	The ID of the fulfillment line to return.
	"""
	fulfillmentLineId: ID!
	"""
	The number of items to be returned.
	"""
	quantity: Int!
	"""
	Determines, if the line should be added to replace order.
	"""
	replace: Boolean = false
}

"""
Create order lines for an order.
"""
type OrderLinesCreate{
	"""
	Related order.
	"""
	order: Order
	"""
	List of added order lines.
	"""
	orderLines: [OrderLine!]
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Deletes an order line from an order.
"""
type OrderLineDelete{
	"""
	A related order.
	"""
	order: Order
	"""
	An order line that was deleted.
	"""
	orderLine: OrderLine
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Updates an order line of an order.
"""
type OrderLineUpdate{
	"""
	Related order.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
	orderLine: OrderLine
}

input OrderLineInput{
	"""
	Number of variant items ordered.
	"""
	quantity: Int!
}

"""
Adds discount to the order.
"""
type OrderDiscountAdd{
	"""
	Order which has been discounted.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

input OrderDiscountCommonInput{
	"""
	Type of the discount: fixed or percent
	"""
	valueType: DiscountValueTypeEnum!
	"""
	Value of the discount. Can store fixed value or percent value
	"""
	value: PositiveDecimal!
	"""
	Explanation for the applied discount.
	"""
	reason: String
}

"""
Update discount for the order.
"""
type OrderDiscountUpdate{
	"""
	Order which has been discounted.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Remove discount from the order.
"""
type OrderDiscountDelete{
	"""
	Order which has removed discount.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Update discount for the order line.
"""
type OrderLineDiscountUpdate{
	"""
	Order line which has been discounted.
	"""
	orderLine: OrderLine
	"""
	Order which is related to the discounted line.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Remove discount applied to the order line.
"""
type OrderLineDiscountRemove{
	"""
	Order line which has removed discount.
	"""
	orderLine: OrderLine
	"""
	Order which is related to line which has removed discount.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Mark order as manually paid.
"""
type OrderMarkAsPaid{
	"""
	Order marked as paid.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Refund an order.
"""
type OrderRefund{
	"""
	A refunded order.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Updates an order.
"""
type OrderUpdate{
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
	order: Order
}

input OrderUpdateInput{
	"""
	Billing address of the customer.
	"""
	billingAddress: AddressInput
	"""
	Email address of the customer.
	"""
	userEmail: String
	"""
	Shipping address of the customer.
	"""
	shippingAddress: AddressInput
}

"""
Updates a shipping method of the order.
"""
type OrderUpdateShipping{
	"""
	Order with updated shipping method.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

input OrderUpdateShippingInput{
	"""
	ID of the selected shipping method.
	"""
	shippingMethod: ID
}

"""
Void an order.
"""
type OrderVoid{
	"""
	A voided order.
	"""
	order: Order
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Cancels orders.
"""
type OrderBulkCancel{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	orderErrors: [OrderError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [OrderError!]!
}

"""
Delete metadata of an object.
"""
type DeleteMetadata{
	metadataErrors: [MetadataError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MetadataError!]!
	item: ObjectWithMetadata
}

type MetadataError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: MetadataErrorCode!
}

"""
An enumeration.
"""
enum MetadataErrorCode{
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
}

"""
Delete object's private metadata.
"""
type DeletePrivateMetadata{
	metadataErrors: [MetadataError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MetadataError!]!
	item: ObjectWithMetadata
}

"""
Updates metadata of an object.
"""
type UpdateMetadata{
	metadataErrors: [MetadataError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MetadataError!]!
	item: ObjectWithMetadata
}

input MetadataInput{
	"""
	Key of a metadata item.
	"""
	key: String!
	"""
	Value of a metadata item.
	"""
	value: String!
}

"""
Updates private metadata of an object.
"""
type UpdatePrivateMetadata{
	metadataErrors: [MetadataError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MetadataError!]!
	item: ObjectWithMetadata
}

"""
Assigns storefront's navigation menus.
"""
type AssignNavigation{
	"""
	Assigned navigation menu.
	"""
	menu: Menu
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
}

type MenuError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: MenuErrorCode!
}

"""
An enumeration.
"""
enum MenuErrorCode{
	CANNOT_ASSIGN_NODE
	GRAPHQL_ERROR
	INVALID
	INVALID_MENU_ITEM
	NO_MENU_ITEM_PROVIDED
	NOT_FOUND
	REQUIRED
	TOO_MANY_MENU_ITEMS
	UNIQUE
}

enum NavigationType{
	"""
	Main storefront navigation.
	"""
	MAIN
	"""
	Secondary storefront navigation.
	"""
	SECONDARY
}

"""
Creates a new Menu.
"""
type MenuCreate{
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
	menu: Menu
}

input MenuCreateInput{
	"""
	Name of the menu.
	"""
	name: String!
	"""
	Slug of the menu. Will be generated if not provided.
	"""
	slug: String
	"""
	List of menu items.
	"""
	items: [MenuItemInput]
}

input MenuItemInput{
	"""
	Name of the menu item.
	"""
	name: String
	"""
	URL of the pointed item.
	"""
	url: String
	"""
	Category to which item points.
	"""
	category: ID
	"""
	Collection to which item points.
	"""
	collection: ID
	"""
	Page to which item points.
	"""
	page: ID
}

"""
Deletes a menu.
"""
type MenuDelete{
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
	menu: Menu
}

"""
Deletes menus.
"""
type MenuBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
}

"""
Updates a menu.
"""
type MenuUpdate{
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
	menu: Menu
}

input MenuInput{
	"""
	Name of the menu.
	"""
	name: String
	"""
	Slug of the menu.
	"""
	slug: String
}

"""
Creates a new menu item.
"""
type MenuItemCreate{
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
	menuItem: MenuItem
}

input MenuItemCreateInput{
	"""
	Name of the menu item.
	"""
	name: String!
	"""
	URL of the pointed item.
	"""
	url: String
	"""
	Category to which item points.
	"""
	category: ID
	"""
	Collection to which item points.
	"""
	collection: ID
	"""
	Page to which item points.
	"""
	page: ID
	"""
	Menu to which item belongs.
	"""
	menu: ID!
	"""
	ID of the parent menu. If empty, menu will be top level menu.
	"""
	parent: ID
}

"""
Deletes a menu item.
"""
type MenuItemDelete{
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
	menuItem: MenuItem
}

"""
Deletes menu items.
"""
type MenuItemBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
}

"""
Updates a menu item.
"""
type MenuItemUpdate{
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
	menuItem: MenuItem
}

"""
Creates/updates translations for a menu item.
"""
type MenuItemTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	menuItem: MenuItem
}

"""
Moves items of menus.
"""
type MenuItemMove{
	"""
	Assigned menu to move within.
	"""
	menu: Menu
	menuErrors: [MenuError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [MenuError!]!
}

input MenuItemMoveInput{
	"""
	The menu item ID to move.
	"""
	itemId: ID!
	"""
	ID of the parent menu. If empty, menu will be top level menu.
	"""
	parentId: ID
	"""
	The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged.
	"""
	sortOrder: Int
}

"""
Request an invoice for the order using plugin.
"""
type InvoiceRequest{
	"""
	Order related to an invoice.
	"""
	order: Order
	invoiceErrors: [InvoiceError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [InvoiceError!]!
	invoice: Invoice
}

type InvoiceError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: InvoiceErrorCode!
}

"""
An enumeration.
"""
enum InvoiceErrorCode{
	REQUIRED
	NOT_READY
	URL_NOT_SET
	EMAIL_NOT_SET
	NUMBER_NOT_SET
	NOT_FOUND
	INVALID_STATUS
}

"""
Requests deletion of an invoice.
"""
type InvoiceRequestDelete{
	invoiceErrors: [InvoiceError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [InvoiceError!]!
	invoice: Invoice
}

"""
Creates a ready to send invoice.
"""
type InvoiceCreate{
	invoiceErrors: [InvoiceError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [InvoiceError!]!
	invoice: Invoice
}

input InvoiceCreateInput{
	"""
	Invoice number.
	"""
	number: String!
	"""
	URL of an invoice to download.
	"""
	url: String!
}

"""
Deletes an invoice.
"""
type InvoiceDelete{
	invoiceErrors: [InvoiceError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [InvoiceError!]!
	invoice: Invoice
}

"""
Updates an invoice.
"""
type InvoiceUpdate{
	invoiceErrors: [InvoiceError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [InvoiceError!]!
	invoice: Invoice
}

input UpdateInvoiceInput{
	"""
	Invoice number
	"""
	number: String
	"""
	URL of an invoice to download.
	"""
	url: String
}

"""
Send an invoice notification to the customer.
"""
type InvoiceSendNotification{
	invoiceErrors: [InvoiceError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [InvoiceError!]!
	invoice: Invoice
}

"""
Activate a gift card.
"""
type GiftCardActivate{
	"""
	A gift card to activate.
	"""
	giftCard: GiftCard
	giftCardErrors: [GiftCardError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [GiftCardError!]!
}

type GiftCardError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: GiftCardErrorCode!
}

"""
An enumeration.
"""
enum GiftCardErrorCode{
	ALREADY_EXISTS
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
}

"""
Creates a new gift card.
"""
type GiftCardCreate{
	giftCardErrors: [GiftCardError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [GiftCardError!]!
	giftCard: GiftCard
}

input GiftCardCreateInput{
	"""
	Start date of the gift card in ISO 8601 format.
	"""
	startDate: Date
	"""
	End date of the gift card in ISO 8601 format.
	"""
	endDate: Date
	"""
	Value of the gift card.
	"""
	balance: PositiveDecimal
	"""
	The customer's email of the gift card buyer.
	"""
	userEmail: String
	"""
	Code to use the gift card.
	"""
	code: String
}

"""
Deactivate a gift card.
"""
type GiftCardDeactivate{
	"""
	A gift card to deactivate.
	"""
	giftCard: GiftCard
	giftCardErrors: [GiftCardError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [GiftCardError!]!
}

"""
Update a gift card.
"""
type GiftCardUpdate{
	giftCardErrors: [GiftCardError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [GiftCardError!]!
	giftCard: GiftCard
}

input GiftCardUpdateInput{
	"""
	Start date of the gift card in ISO 8601 format.
	"""
	startDate: Date
	"""
	End date of the gift card in ISO 8601 format.
	"""
	endDate: Date
	"""
	Value of the gift card.
	"""
	balance: PositiveDecimal
	"""
	The customer's email of the gift card buyer.
	"""
	userEmail: String
}

"""
Update plugin configuration.
"""
type PluginUpdate{
	plugin: Plugin
	pluginsErrors: [PluginError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PluginError!]!
}

type PluginError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: PluginErrorCode!
}

"""
An enumeration.
"""
enum PluginErrorCode{
	GRAPHQL_ERROR
	INVALID
	PLUGIN_MISCONFIGURED
	NOT_FOUND
	REQUIRED
	UNIQUE
}

input PluginUpdateInput{
	"""
	Indicates whether the plugin should be enabled.
	"""
	active: Boolean
	"""
	Configuration of the plugin.
	"""
	configuration: [ConfigurationItemInput]
}

input ConfigurationItemInput{
	"""
	Name of the field to update.
	"""
	name: String!
	"""
	Value of the given field to update.
	"""
	value: String
}

"""
Creates a new sale.
"""
type SaleCreate{
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
	sale: Sale
}

type DiscountError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	List of products IDs which causes the error.
	"""
	products: [ID!]
	"""
	The error code.
	"""
	code: DiscountErrorCode!
	"""
	List of channels IDs which causes the error.
	"""
	channels: [ID!]
}

"""
An enumeration.
"""
enum DiscountErrorCode{
	ALREADY_EXISTS
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
	CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT
	DUPLICATED_INPUT_ITEM
}

input SaleInput{
	"""
	Voucher name.
	"""
	name: String
	"""
	Fixed or percentage.
	"""
	type: DiscountValueTypeEnum
	"""
	Value of the voucher.
	"""
	value: PositiveDecimal
	"""
	Products related to the discount.
	"""
	products: [ID]
	"""
	Categories related to the discount.
	"""
	categories: [ID]
	"""
	Collections related to the discount.
	"""
	collections: [ID]
	"""
	Start date of the voucher in ISO 8601 format.
	"""
	startDate: DateTime
	"""
	End date of the voucher in ISO 8601 format.
	"""
	endDate: DateTime
}

"""
Deletes a sale.
"""
type SaleDelete{
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
	sale: Sale
}

"""
Deletes sales.
"""
type SaleBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
}

"""
Updates a sale.
"""
type SaleUpdate{
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
	sale: Sale
}

"""
Adds products, categories, collections to a voucher.
"""
type SaleAddCatalogues{
	"""
	Sale of which catalogue IDs will be modified.
	"""
	sale: Sale
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
}

input CatalogueInput{
	"""
	Products related to the discount.
	"""
	products: [ID]
	"""
	Categories related to the discount.
	"""
	categories: [ID]
	"""
	Collections related to the discount.
	"""
	collections: [ID]
}

"""
Removes products, categories, collections from a sale.
"""
type SaleRemoveCatalogues{
	"""
	Sale of which catalogue IDs will be modified.
	"""
	sale: Sale
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
}

"""
Creates/updates translations for a sale.
"""
type SaleTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	sale: Sale
}

"""
Manage sale's availability in channels.
"""
type SaleChannelListingUpdate{
	"""
	An updated sale instance.
	"""
	sale: Sale
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
}

input SaleChannelListingInput{
	"""
	List of channels to which the sale should be assigned.
	"""
	addChannels: [SaleChannelListingAddInput!]
	"""
	List of channels from which the sale should be unassigned.
	"""
	removeChannels: [ID!]
}

input SaleChannelListingAddInput{
	"""
	ID of a channel.
	"""
	channelId: ID!
	"""
	The value of the discount.
	"""
	discountValue: PositiveDecimal!
}

"""
Creates a new voucher.
"""
type VoucherCreate{
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
	voucher: Voucher
}

input VoucherInput{
	"""
	Voucher type: PRODUCT, CATEGORY SHIPPING or ENTIRE_ORDER.
	"""
	type: VoucherTypeEnum
	"""
	Voucher name.
	"""
	name: String
	"""
	Code to use the voucher.
	"""
	code: String
	"""
	Start date of the voucher in ISO 8601 format.
	"""
	startDate: DateTime
	"""
	End date of the voucher in ISO 8601 format.
	"""
	endDate: DateTime
	"""
	Choices: fixed or percentage.
	"""
	discountValueType: DiscountValueTypeEnum
	"""
	Products discounted by the voucher.
	"""
	products: [ID]
	"""
	Collections discounted by the voucher.
	"""
	collections: [ID]
	"""
	Categories discounted by the voucher.
	"""
	categories: [ID]
	"""
	Minimal quantity of checkout items required to apply the voucher.
	"""
	minCheckoutItemsQuantity: Int
	"""
	Country codes that can be used with the shipping voucher.
	"""
	countries: [String]
	"""
	Voucher should be applied to the cheapest item or entire order.
	"""
	applyOncePerOrder: Boolean
	"""
	Voucher should be applied once per customer.
	"""
	applyOncePerCustomer: Boolean
	"""
	Voucher can be used only by staff user.
	"""
	onlyForStaff: Boolean
	"""
	Limit number of times this voucher can be used in total.
	"""
	usageLimit: Int
}

"""
Deletes a voucher.
"""
type VoucherDelete{
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
	voucher: Voucher
}

"""
Deletes vouchers.
"""
type VoucherBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
}

"""
Updates a voucher.
"""
type VoucherUpdate{
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
	voucher: Voucher
}

"""
Adds products, categories, collections to a voucher.
"""
type VoucherAddCatalogues{
	"""
	Voucher of which catalogue IDs will be modified.
	"""
	voucher: Voucher
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
}

"""
Removes products, categories, collections from a voucher.
"""
type VoucherRemoveCatalogues{
	"""
	Voucher of which catalogue IDs will be modified.
	"""
	voucher: Voucher
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
}

"""
Creates/updates translations for a voucher.
"""
type VoucherTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	voucher: Voucher
}

"""
Manage voucher's availability in channels.
"""
type VoucherChannelListingUpdate{
	"""
	An updated voucher instance.
	"""
	voucher: Voucher
	discountErrors: [DiscountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [DiscountError!]!
}

input VoucherChannelListingInput{
	"""
	List of channels to which the voucher should be assigned.
	"""
	addChannels: [VoucherChannelListingAddInput!]
	"""
	List of channels from which the voucher should be unassigned.
	"""
	removeChannels: [ID!]
}

input VoucherChannelListingAddInput{
	"""
	ID of a channel.
	"""
	channelId: ID!
	"""
	Value of the voucher.
	"""
	discountValue: PositiveDecimal
	"""
	Min purchase amount required to apply the voucher.
	"""
	minAmountSpent: PositiveDecimal
}

"""
Export products to csv file.
"""
type ExportProducts{
	"""
	The newly created export file job which is responsible for export data.
	"""
	exportFile: ExportFile
	exportErrors: [ExportError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ExportError!]!
}

type ExportError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ExportErrorCode!
}

"""
An enumeration.
"""
enum ExportErrorCode{
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
}

input ExportProductsInput{
	"""
	Determine which products should be exported.
	"""
	scope: ExportScope!
	"""
	Filtering options for products.
	"""
	filter: ProductFilterInput
	"""
	List of products IDS to export.
	"""
	ids: [ID!]
	"""
	Input with info about fields which should be exported.
	"""
	exportInfo: ExportInfoInput
	"""
	Type of exported file.
	"""
	fileType: FileTypesEnum!
}

enum ExportScope{
	"""
	Export all products.
	"""
	ALL
	"""
	Export products with given ids.
	"""
	IDS
	"""
	Export the filtered products.
	"""
	FILTER
}

input ExportInfoInput{
	"""
	List of attribute ids witch should be exported.
	"""
	attributes: [ID!]
	"""
	List of warehouse ids witch should be exported.
	"""
	warehouses: [ID!]
	"""
	List of channels ids which should be exported.
	"""
	channels: [ID!]
	"""
	List of product fields witch should be exported.
	"""
	fields: [ProductFieldEnum!]
}

enum ProductFieldEnum{
	NAME
	DESCRIPTION
	PRODUCT_TYPE
	CATEGORY
	PRODUCT_WEIGHT
	COLLECTIONS
	CHARGE_TAXES
	PRODUCT_MEDIA
	VARIANT_SKU
	VARIANT_WEIGHT
	VARIANT_MEDIA
}

"""
An enumeration.
"""
enum FileTypesEnum{
	CSV
	XLSX
}

"""
Upload a file. This mutation must be sent as a  request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
"""
type FileUpload{
	uploadedFile: File
	uploadErrors: [UploadError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [UploadError!]!
}

type UploadError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: UploadErrorCode!
}

"""
An enumeration.
"""
enum UploadErrorCode{
	GRAPHQL_ERROR
}

"""
Adds a gift card or a voucher to a checkout.
"""
type CheckoutAddPromoCode{
	"""
	The checkout with the added gift card or voucher.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

type CheckoutError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: CheckoutErrorCode!
	"""
	List of varint IDs which causes the error.
	"""
	variants: [ID!]
	"""
	A type of address that causes the error.
	"""
	addressType: AddressTypeEnum
}

"""
An enumeration.
"""
enum CheckoutErrorCode{
	BILLING_ADDRESS_NOT_SET
	CHECKOUT_NOT_FULLY_PAID
	GRAPHQL_ERROR
	PRODUCT_NOT_PUBLISHED
	PRODUCT_UNAVAILABLE_FOR_PURCHASE
	INSUFFICIENT_STOCK
	INVALID
	INVALID_SHIPPING_METHOD
	NOT_FOUND
	PAYMENT_ERROR
	QUANTITY_GREATER_THAN_LIMIT
	REQUIRED
	SHIPPING_ADDRESS_NOT_SET
	SHIPPING_METHOD_NOT_APPLICABLE
	SHIPPING_METHOD_NOT_SET
	SHIPPING_NOT_REQUIRED
	TAX_ERROR
	UNIQUE
	VOUCHER_NOT_APPLICABLE
	ZERO_QUANTITY
	MISSING_CHANNEL_SLUG
	CHANNEL_INACTIVE
	UNAVAILABLE_VARIANT_IN_CHANNEL
}

"""
Update billing address in the existing checkout.
"""
type CheckoutBillingAddressUpdate{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation.
"""
type CheckoutComplete{
	"""
	Placed order.
	"""
	order: Order
	"""
	Set to true if payment needs to be confirmed before checkout is complete.
	"""
	confirmationNeeded: Boolean!
	"""
	Confirmation data used to process additional authorization steps.
	"""
	confirmationData: JSONString
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Create a new checkout.
"""
type CheckoutCreate{
	"""
	Whether the checkout was created or the current active one was returned. Refer to checkoutLinesAdd and checkoutLinesUpdate to merge a cart with an active checkout.DEPRECATED: Will be removed in Saleor 4.0. Always returns True.
	"""
	created: Boolean
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
	checkout: Checkout
}

input CheckoutCreateInput{
	"""
	Slug of a channel in which to create a checkout.
	"""
	channel: String
	"""
	A list of checkout lines, each containing information about an item in the checkout.
	"""
	lines: [CheckoutLineInput!]
	"""
	The customer's email address.
	"""
	email: String
	"""
	The mailing address to where the checkout will be shipped. Note: the address will be ignored if the checkout doesn't contain shippable items.
	"""
	shippingAddress: AddressInput
	"""
	Billing address of the customer.
	"""
	billingAddress: AddressInput
	"""
	Checkout language code.
	"""
	languageCode: LanguageCodeEnum
}

input CheckoutLineInput{
	"""
	The number of items purchased.
	"""
	quantity: Int!
	"""
	ID of the product variant.
	"""
	variantId: ID!
}

"""
Sets the customer as the owner of the checkout.
"""
type CheckoutCustomerAttach{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Removes the user assigned as the owner of the checkout.
"""
type CheckoutCustomerDetach{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Updates email address in the existing checkout object.
"""
type CheckoutEmailUpdate{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Deletes a CheckoutLine.
"""
type CheckoutLineDelete{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Adds a checkout line to the existing checkout.If line was already in checkout, its quantity will be increased.
"""
type CheckoutLinesAdd{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Updates checkout line in the existing checkout.
"""
type CheckoutLinesUpdate{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Remove a gift card or a voucher from a checkout.
"""
type CheckoutRemovePromoCode{
	"""
	The checkout with the removed gift card or voucher.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Create a new payment for given checkout.
"""
type CheckoutPaymentCreate{
	"""
	Related checkout object.
	"""
	checkout: Checkout
	"""
	A newly created payment.
	"""
	payment: Payment
	paymentErrors: [PaymentError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PaymentError!]!
}

input PaymentInput{
	"""
	A gateway to use with that payment.
	"""
	gateway: String!
	"""
	Client-side generated payment token, representing customer's billing data in a secure manner.
	"""
	token: String
	"""
	Total amount of the transaction, including all taxes and discounts. If no amount is provided, the checkout total will be used.
	"""
	amount: PositiveDecimal
	"""
	URL of a storefront view where user should be redirected after requiring additional actions. Payment with additional actions will not be finished if this field is not provided.
	"""
	returnUrl: String
}

"""
Update shipping address in the existing checkout.
"""
type CheckoutShippingAddressUpdate{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Updates the shipping address of the checkout.
"""
type CheckoutShippingMethodUpdate{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Update language code in the existing checkout.
"""
type CheckoutLanguageCodeUpdate{
	"""
	An updated checkout.
	"""
	checkout: Checkout
	checkoutErrors: [CheckoutError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [CheckoutError!]!
}

"""
Creates new channel.
"""
type ChannelCreate{
	channelErrors: [ChannelError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ChannelError!]!
	channel: Channel
}

type ChannelError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: ChannelErrorCode!
	"""
	List of shipping zone IDs which causes the error.
	"""
	shippingZones: [ID!]
}

"""
An enumeration.
"""
enum ChannelErrorCode{
	ALREADY_EXISTS
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
	CHANNELS_CURRENCY_MUST_BE_THE_SAME
	CHANNEL_WITH_ORDERS
	DUPLICATED_INPUT_ITEM
}

input ChannelCreateInput{
	"""
	isActive flag.
	"""
	isActive: Boolean
	"""
	Name of the channel.
	"""
	name: String!
	"""
	Slug of the channel.
	"""
	slug: String!
	"""
	Currency of the channel.
	"""
	currencyCode: String!
	"""
	Default country for the channel. Default country can be used in checkout to determine the stock quantities or calculate taxes when the country was not explicitly provided.
	"""
	defaultCountry: CountryCode!
	"""
	List of shipping zones to assign to the channel.
	"""
	addShippingZones: [ID!]
}

"""
Update a channel.
"""
type ChannelUpdate{
	channelErrors: [ChannelError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ChannelError!]!
	channel: Channel
}

input ChannelUpdateInput{
	"""
	isActive flag.
	"""
	isActive: Boolean
	"""
	Name of the channel.
	"""
	name: String
	"""
	Slug of the channel.
	"""
	slug: String
	"""
	Default country for the channel. Default country can be used in checkout to determine the stock quantities or calculate taxes when the country was not explicitly provided.
	"""
	defaultCountry: CountryCode
	"""
	List of shipping zones to assign to the channel.
	"""
	addShippingZones: [ID!]
	"""
	List of shipping zones to unassign from the channel.
	"""
	removeShippingZones: [ID!]
}

"""
Delete a channel. Orders associated with the deleted channel will be moved to the target channel. Checkouts, product availability, and pricing will be removed.
"""
type ChannelDelete{
	channelErrors: [ChannelError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ChannelError!]!
	channel: Channel
}

input ChannelDeleteInput{
	"""
	ID of channel to migrate orders from origin channel.
	"""
	channelId: ID!
}

"""
Activate a channel.
"""
type ChannelActivate{
	"""
	Activated channel.
	"""
	channel: Channel
	channelErrors: [ChannelError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ChannelError!]!
}

"""
Deactivate a channel.
"""
type ChannelDeactivate{
	"""
	Deactivated channel.
	"""
	channel: Channel
	channelErrors: [ChannelError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [ChannelError!]!
}

"""
Creates an attribute.
"""
type AttributeCreate{
	attribute: Attribute
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
}

type AttributeError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: AttributeErrorCode!
}

"""
An enumeration.
"""
enum AttributeErrorCode{
	ALREADY_EXISTS
	GRAPHQL_ERROR
	INVALID
	NOT_FOUND
	REQUIRED
	UNIQUE
}

input AttributeCreateInput{
	"""
	The input type to use for entering attribute values in the dashboard.
	"""
	inputType: AttributeInputTypeEnum
	"""
	The entity type which can be used as a reference.
	"""
	entityType: AttributeEntityTypeEnum
	"""
	Name of an attribute displayed in the interface.
	"""
	name: String!
	"""
	Internal representation of an attribute name.
	"""
	slug: String
	"""
	The attribute type.
	"""
	type: AttributeTypeEnum!
	"""
	The unit of attribute values.
	"""
	unit: MeasurementUnitsEnum
	"""
	List of attribute's values.
	"""
	values: [AttributeValueCreateInput]
	"""
	Whether the attribute requires values to be passed or not.
	"""
	valueRequired: Boolean
	"""
	Whether the attribute is for variants only.
	"""
	isVariantOnly: Boolean
	"""
	Whether the attribute should be visible or not in storefront.
	"""
	visibleInStorefront: Boolean
	"""
	Whether the attribute can be filtered in storefront.
	"""
	filterableInStorefront: Boolean
	"""
	Whether the attribute can be filtered in dashboard.
	"""
	filterableInDashboard: Boolean
	"""
	The position of the attribute in the storefront navigation (0 by default).
	"""
	storefrontSearchPosition: Int
	"""
	Whether the attribute can be displayed in the admin product list.
	"""
	availableInGrid: Boolean
}

input AttributeValueCreateInput{
	"""
	Name of a value displayed in the interface.
	"""
	name: String!
	"""
	Represents the value of the attribute value.
	"""
	value: String
	"""
	Represents the text (JSON) of the attribute value.
	"""
	richText: JSONString
}

"""
Deletes an attribute.
"""
type AttributeDelete{
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
	attribute: Attribute
}

"""
Updates attribute.
"""
type AttributeUpdate{
	attribute: Attribute
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
}

input AttributeUpdateInput{
	"""
	Name of an attribute displayed in the interface.
	"""
	name: String
	"""
	Internal representation of an attribute name.
	"""
	slug: String
	"""
	The unit of attribute values.
	"""
	unit: MeasurementUnitsEnum
	"""
	IDs of values to be removed from this attribute.
	"""
	removeValues: [ID]
	"""
	New values to be created for this attribute.
	"""
	addValues: [AttributeValueCreateInput]
	"""
	Whether the attribute requires values to be passed or not.
	"""
	valueRequired: Boolean
	"""
	Whether the attribute is for variants only.
	"""
	isVariantOnly: Boolean
	"""
	Whether the attribute should be visible or not in storefront.
	"""
	visibleInStorefront: Boolean
	"""
	Whether the attribute can be filtered in storefront.
	"""
	filterableInStorefront: Boolean
	"""
	Whether the attribute can be filtered in dashboard.
	"""
	filterableInDashboard: Boolean
	"""
	The position of the attribute in the storefront navigation (0 by default).
	"""
	storefrontSearchPosition: Int
	"""
	Whether the attribute can be displayed in the admin product list.
	"""
	availableInGrid: Boolean
}

"""
Creates/updates translations for an attribute.
"""
type AttributeTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	attribute: Attribute
}

"""
Deletes attributes.
"""
type AttributeBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
}

"""
Deletes values of attributes.
"""
type AttributeValueBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
}

"""
Creates a value for an attribute.
"""
type AttributeValueCreate{
	"""
	The updated attribute.
	"""
	attribute: Attribute
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
	attributeValue: AttributeValue
}

"""
Deletes a value of an attribute.
"""
type AttributeValueDelete{
	"""
	The updated attribute.
	"""
	attribute: Attribute
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
	attributeValue: AttributeValue
}

"""
Updates value of an attribute.
"""
type AttributeValueUpdate{
	"""
	The updated attribute.
	"""
	attribute: Attribute
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
	attributeValue: AttributeValue
}

"""
Creates/updates translations for an attribute value.
"""
type AttributeValueTranslate{
	translationErrors: [TranslationError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [TranslationError!]!
	attributeValue: AttributeValue
}

input AttributeValueTranslationInput{
	name: String
	richText: JSONString
}

"""
Reorder the values of an attribute.
"""
type AttributeReorderValues{
	"""
	Attribute from which values are reordered.
	"""
	attribute: Attribute
	attributeErrors: [AttributeError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AttributeError!]!
}

"""
Creates a new app.
"""
type AppCreate{
	"""
	The newly created authentication token.
	"""
	authToken: String
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	app: App
}

type AppError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: AppErrorCode!
	"""
	List of permissions which causes the error.
	"""
	permissions: [PermissionEnum!]
}

"""
An enumeration.
"""
enum AppErrorCode{
	FORBIDDEN
	GRAPHQL_ERROR
	INVALID
	INVALID_STATUS
	INVALID_PERMISSION
	INVALID_URL_FORMAT
	INVALID_MANIFEST_FORMAT
	MANIFEST_URL_CANT_CONNECT
	NOT_FOUND
	REQUIRED
	UNIQUE
	OUT_OF_SCOPE_APP
	OUT_OF_SCOPE_PERMISSION
}

input AppInput{
	"""
	Name of the app.
	"""
	name: String
	"""
	List of permission code names to assign to this app.
	"""
	permissions: [PermissionEnum]
}

"""
Updates an existing app.
"""
type AppUpdate{
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	app: App
}

"""
Deletes an app.
"""
type AppDelete{
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	app: App
}

"""
Creates a new token.
"""
type AppTokenCreate{
	"""
	The newly created authentication token.
	"""
	authToken: String
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	appToken: AppToken
}

input AppTokenInput{
	"""
	Name of the token.
	"""
	name: String
	"""
	ID of app.
	"""
	app: ID!
}

"""
Deletes an authentication token assigned to app.
"""
type AppTokenDelete{
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	appToken: AppToken
}

"""
Verify provided app token.
"""
type AppTokenVerify{
	"""
	Determine if token is valid or not.
	"""
	valid: Boolean!
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
}

"""
Install new app by using app manifest.
"""
type AppInstall{
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	appInstallation: AppInstallation
}

input AppInstallInput{
	"""
	Name of the app to install.
	"""
	appName: String
	"""
	Url to app's manifest in JSON format.
	"""
	manifestUrl: String
	"""
	Determine if app will be set active or not.
	"""
	activateAfterInstallation: Boolean = true
	"""
	List of permission code names to assign to this app.
	"""
	permissions: [PermissionEnum]
}

"""
Retry failed installation of new app.
"""
type AppRetryInstall{
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	appInstallation: AppInstallation
}

"""
Delete failed installation.
"""
type AppDeleteFailedInstallation{
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	appInstallation: AppInstallation
}

"""
Fetch and validate manifest.
"""
type AppFetchManifest{
	manifest: Manifest
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
}

"""
The manifest definition.
"""
type Manifest{
	identifier: String!
	version: String!
	name: String!
	about: String
	permissions: [Permission]
	appUrl: String
	configurationUrl: String
	tokenTargetUrl: String
	dataPrivacy: String
	dataPrivacyUrl: String
	homepageUrl: String
	supportUrl: String
}

"""
Activate the app.
"""
type AppActivate{
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	app: App
}

"""
Deactivate the app.
"""
type AppDeactivate{
	appErrors: [AppError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AppError!]!
	app: App
}

"""
Create JWT token.
"""
type CreateToken{
	"""
	JWT token, required to authenticate.
	"""
	token: String
	"""
	JWT refresh token, required to re-generate access token.
	"""
	refreshToken: String
	"""
	CSRF token required to re-generate access token.
	"""
	csrfToken: String
	"""
	A user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

type AccountError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: AccountErrorCode!
	"""
	A type of address that causes the error.
	"""
	addressType: AddressTypeEnum
}

"""
An enumeration.
"""
enum AccountErrorCode{
	ACTIVATE_OWN_ACCOUNT
	ACTIVATE_SUPERUSER_ACCOUNT
	DUPLICATED_INPUT_ITEM
	DEACTIVATE_OWN_ACCOUNT
	DEACTIVATE_SUPERUSER_ACCOUNT
	DELETE_NON_STAFF_USER
	DELETE_OWN_ACCOUNT
	DELETE_STAFF_ACCOUNT
	DELETE_SUPERUSER_ACCOUNT
	GRAPHQL_ERROR
	INACTIVE
	INVALID
	INVALID_PASSWORD
	LEFT_NOT_MANAGEABLE_PERMISSION
	INVALID_CREDENTIALS
	NOT_FOUND
	OUT_OF_SCOPE_USER
	OUT_OF_SCOPE_GROUP
	OUT_OF_SCOPE_PERMISSION
	PASSWORD_ENTIRELY_NUMERIC
	PASSWORD_TOO_COMMON
	PASSWORD_TOO_SHORT
	PASSWORD_TOO_SIMILAR
	REQUIRED
	UNIQUE
	JWT_SIGNATURE_EXPIRED
	JWT_INVALID_TOKEN
	JWT_DECODE_ERROR
	JWT_MISSING_TOKEN
	JWT_INVALID_CSRF_TOKEN
	CHANNEL_INACTIVE
	MISSING_CHANNEL_SLUG
}

"""
Refresh JWT token. Mutation tries to take refreshToken from the input.If it fails it will try to take refreshToken from the http-only cookie -refreshToken. csrfToken is required when refreshToken is provided as a cookie.
"""
type RefreshToken{
	"""
	JWT token, required to authenticate.
	"""
	token: String
	"""
	A user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Verify JWT token.
"""
type VerifyToken{
	"""
	User assigned to token.
	"""
	user: User
	"""
	Determine if token is valid or not.
	"""
	isValid: Boolean!
	"""
	JWT payload.
	"""
	payload: GenericScalar
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
The  scalar type represents a generic
GraphQL scalar value that could be:
String, Boolean, Int, Float, List or Object.
"""
scalar GenericScalar

"""
Deactivate all JWT tokens of the currently authenticated user.
"""
type DeactivateAllUserTokens{
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Prepare external authentication url for user by custom plugin.
"""
type ExternalAuthenticationUrl{
	"""
	The data returned by authentication plugin.
	"""
	authenticationData: JSONString
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Obtain external access tokens for user by custom plugin.
"""
type ExternalObtainAccessTokens{
	"""
	The token, required to authenticate.
	"""
	token: String
	"""
	The refresh token, required to re-generate external access token.
	"""
	refreshToken: String
	"""
	CSRF token required to re-generate external access token.
	"""
	csrfToken: String
	"""
	A user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Refresh user's access by custom plugin.
"""
type ExternalRefresh{
	"""
	The token, required to authenticate.
	"""
	token: String
	"""
	The refresh token, required to re-generate external access token.
	"""
	refreshToken: String
	"""
	CSRF token required to re-generate external access token.
	"""
	csrfToken: String
	"""
	A user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Logout user by custom plugin.
"""
type ExternalLogout{
	"""
	The data returned by authentication plugin.
	"""
	logoutData: JSONString
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Verify external authentication data by plugin.
"""
type ExternalVerify{
	"""
	User assigned to data.
	"""
	user: User
	"""
	Determine if authentication data is valid or not.
	"""
	isValid: Boolean!
	"""
	External data.
	"""
	verifyData: JSONString
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Sends an email with the account password modification link.
"""
type RequestPasswordReset{
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Confirm user account with token sent by email during registration.
"""
type ConfirmAccount{
	"""
	An activated user account.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Sets the user's password from the token sent by email using the RequestPasswordReset mutation.
"""
type SetPassword{
	"""
	JWT token, required to authenticate.
	"""
	token: String
	"""
	JWT refresh token, required to re-generate access token.
	"""
	refreshToken: String
	"""
	CSRF token required to re-generate access token.
	"""
	csrfToken: String
	"""
	A user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Change the password of the logged in user.
"""
type PasswordChange{
	"""
	A user instance with a new password.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Request email change of the logged in user.
"""
type RequestEmailChange{
	"""
	A user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Confirm the email change of the logged-in user.
"""
type ConfirmEmailChange{
	"""
	A user instance with a new email.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Create a new address for the customer.
"""
type AccountAddressCreate{
	"""
	A user instance for which the address was created.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	address: Address
}

"""
Updates an address of the logged-in user.
"""
type AccountAddressUpdate{
	"""
	A user object for which the address was edited.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	address: Address
}

"""
Delete an address of the logged-in user.
"""
type AccountAddressDelete{
	"""
	A user instance for which the address was deleted.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	address: Address
}

"""
Sets a default address for the authenticated user.
"""
type AccountSetDefaultAddress{
	"""
	An updated user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Register a new user.
"""
type AccountRegister{
	"""
	Informs whether users need to confirm their email address.
	"""
	requiresConfirmation: Boolean
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	user: User
}

input AccountRegisterInput{
	"""
	The email address of the user.
	"""
	email: String!
	"""
	Password.
	"""
	password: String!
	"""
	Base of frontend URL that will be needed to create confirmation URL.
	"""
	redirectUrl: String
	"""
	User language code.
	"""
	languageCode: LanguageCodeEnum
	"""
	User public metadata.
	"""
	metadata: [MetadataInput!]
	"""
	Slug of a channel which will be used to notify users. Optional when only one channel exists.
	"""
	channel: String
}

"""
Updates the account of the logged-in user.
"""
type AccountUpdate{
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	user: User
}

input AccountInput{
	"""
	Given name.
	"""
	firstName: String
	"""
	Family name.
	"""
	lastName: String
	"""
	Billing address of the customer.
	"""
	defaultBillingAddress: AddressInput
	"""
	Shipping address of the customer.
	"""
	defaultShippingAddress: AddressInput
	"""
	User language code.
	"""
	languageCode: LanguageCodeEnum
}

"""
Sends an email with the account removal link for the logged-in user.
"""
type AccountRequestDeletion{
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Remove user account.
"""
type AccountDelete{
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	user: User
}

"""
Creates user address.
"""
type AddressCreate{
	"""
	A user instance for which the address was created.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	address: Address
}

"""
Updates an address.
"""
type AddressUpdate{
	"""
	A user object for which the address was edited.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	address: Address
}

"""
Deletes an address.
"""
type AddressDelete{
	"""
	A user instance for which the address was deleted.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	address: Address
}

"""
Sets a default address for the given user.
"""
type AddressSetDefault{
	"""
	An updated user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Creates a new customer.
"""
type CustomerCreate{
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	user: User
}

input UserCreateInput{
	"""
	Billing address of the customer.
	"""
	defaultBillingAddress: AddressInput
	"""
	Shipping address of the customer.
	"""
	defaultShippingAddress: AddressInput
	"""
	Given name.
	"""
	firstName: String
	"""
	Family name.
	"""
	lastName: String
	"""
	The unique email address of the user.
	"""
	email: String
	"""
	User account is active.
	"""
	isActive: Boolean
	"""
	A note about the user.
	"""
	note: String
	"""
	User language code.
	"""
	languageCode: LanguageCodeEnum
	"""
	URL of a view where users should be redirected to set the password. URL in RFC 1808 format.
	"""
	redirectUrl: String
	"""
	Slug of a channel which will be used for notify user. Optional when only one channel exists.
	"""
	channel: String
}

"""
Updates an existing customer.
"""
type CustomerUpdate{
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	user: User
}

input CustomerInput{
	"""
	Billing address of the customer.
	"""
	defaultBillingAddress: AddressInput
	"""
	Shipping address of the customer.
	"""
	defaultShippingAddress: AddressInput
	"""
	Given name.
	"""
	firstName: String
	"""
	Family name.
	"""
	lastName: String
	"""
	The unique email address of the user.
	"""
	email: String
	"""
	User account is active.
	"""
	isActive: Boolean
	"""
	A note about the user.
	"""
	note: String
	"""
	User language code.
	"""
	languageCode: LanguageCodeEnum
}

"""
Deletes a customer.
"""
type CustomerDelete{
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
	user: User
}

"""
Deletes customers.
"""
type CustomerBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Creates a new staff user.
"""
type StaffCreate{
	staffErrors: [StaffError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [StaffError!]!
	user: User
}

type StaffError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: AccountErrorCode!
	"""
	A type of address that causes the error.
	"""
	addressType: AddressTypeEnum
	"""
	List of permissions which causes the error.
	"""
	permissions: [PermissionEnum!]
	"""
	List of permission group IDs which cause the error.
	"""
	groups: [ID!]
	"""
	List of user IDs which causes the error.
	"""
	users: [ID!]
}

input StaffCreateInput{
	"""
	Given name.
	"""
	firstName: String
	"""
	Family name.
	"""
	lastName: String
	"""
	The unique email address of the user.
	"""
	email: String
	"""
	User account is active.
	"""
	isActive: Boolean
	"""
	A note about the user.
	"""
	note: String
	"""
	List of permission group IDs to which user should be assigned.
	"""
	addGroups: [ID!]
	"""
	URL of a view where users should be redirected to set the password. URL in RFC 1808 format.
	"""
	redirectUrl: String
}

"""
Updates an existing staff user.
"""
type StaffUpdate{
	staffErrors: [StaffError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [StaffError!]!
	user: User
}

input StaffUpdateInput{
	"""
	Given name.
	"""
	firstName: String
	"""
	Family name.
	"""
	lastName: String
	"""
	The unique email address of the user.
	"""
	email: String
	"""
	User account is active.
	"""
	isActive: Boolean
	"""
	A note about the user.
	"""
	note: String
	"""
	List of permission group IDs to which user should be assigned.
	"""
	addGroups: [ID!]
	"""
	List of permission group IDs from which user should be unassigned.
	"""
	removeGroups: [ID!]
}

"""
Deletes a staff user.
"""
type StaffDelete{
	staffErrors: [StaffError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [StaffError!]!
	user: User
}

"""
Deletes staff users.
"""
type StaffBulkDelete{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	staffErrors: [StaffError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [StaffError!]!
}

"""
Create a user avatar. Only for staff members. This mutation must be sent as a  request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
"""
type UserAvatarUpdate{
	"""
	An updated user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Deletes a user avatar. Only for staff members.
"""
type UserAvatarDelete{
	"""
	An updated user instance.
	"""
	user: User
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Activate or deactivate users.
"""
type UserBulkSetActive{
	"""
	Returns how many objects were affected.
	"""
	count: Int!
	accountErrors: [AccountError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [AccountError!]!
}

"""
Create new permission group.
"""
type PermissionGroupCreate{
	permissionGroupErrors: [PermissionGroupError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PermissionGroupError!]!
	group: Group
}

type PermissionGroupError{
	"""
	Name of a field that caused the error. A value of  indicates that the error isn't associated with a particular field.
	"""
	field: String
	"""
	The error message.
	"""
	message: String
	"""
	The error code.
	"""
	code: PermissionGroupErrorCode!
	"""
	List of permissions which causes the error.
	"""
	permissions: [PermissionEnum!]
	"""
	List of user IDs which causes the error.
	"""
	users: [ID!]
}

"""
An enumeration.
"""
enum PermissionGroupErrorCode{
	ASSIGN_NON_STAFF_MEMBER
	DUPLICATED_INPUT_ITEM
	CANNOT_REMOVE_FROM_LAST_GROUP
	LEFT_NOT_MANAGEABLE_PERMISSION
	OUT_OF_SCOPE_PERMISSION
	OUT_OF_SCOPE_USER
	REQUIRED
	UNIQUE
}

input PermissionGroupCreateInput{
	"""
	List of permission code names to assign to this group.
	"""
	addPermissions: [PermissionEnum!]
	"""
	List of users to assign to this group.
	"""
	addUsers: [ID!]
	"""
	Group name.
	"""
	name: String!
}

"""
Update permission group.
"""
type PermissionGroupUpdate{
	permissionGroupErrors: [PermissionGroupError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PermissionGroupError!]!
	group: Group
}

input PermissionGroupUpdateInput{
	"""
	List of permission code names to assign to this group.
	"""
	addPermissions: [PermissionEnum!]
	"""
	List of users to assign to this group.
	"""
	addUsers: [ID!]
	"""
	Group name.
	"""
	name: String
	"""
	List of permission code names to unassign from this group.
	"""
	removePermissions: [PermissionEnum!]
	"""
	List of users to unassign from this group.
	"""
	removeUsers: [ID!]
}

"""
Delete permission group.
"""
type PermissionGroupDelete{
	permissionGroupErrors: [PermissionGroupError!]! @deprecated(
	reason: "Use errors field instead. This field will be removed in Saleor 4.0."
)
	errors: [PermissionGroupError!]!
	group: Group
}

"""
An enumeration.
"""
enum DistanceUnitsEnum{
	CM
	M
	KM
	FT
	YD
	INCH
}

"""
An enumeration.
"""
enum AreaUnitsEnum{
	SQ_CM
	SQ_M
	SQ_KM
	SQ_FT
	SQ_YD
	SQ_INCH
}

"""
An enumeration.
"""
enum VolumeUnitsEnum{
	CUBIC_MILLIMETER
	CUBIC_CENTIMETER
	CUBIC_DECIMETER
	CUBIC_METER
	LITER
	CUBIC_FOOT
	CUBIC_INCH
	CUBIC_YARD
	QT
	PINT
	FL_OZ
	ACRE_IN
	ACRE_FT
}
schema{
	query: Query,
	mutation: Mutation
}    

`;
