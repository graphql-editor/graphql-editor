export const mergedLibs = {
  code: `
  input AddBeer{
    kind: BeerKind
    name: String!
    price: Int!
    SKU: String!
  }
  
  scalar Anything
  
  type Beer implements Product{
    kind: BeerKind
    name: String!
    price: Int!
    sku: String!
    """
    To test if available functions in interface
    """
    reviews(
      string: String
    ): String!
  }
  
  enum BeerKind{
    Ale
    APA
    IPA
    Lager
    Sour
  }
  
  type ClientQuery{
    beers: [Beer!]!
    products: [Product!]!
    productUnions: [ProductUnion!]!
  }
  
  input EditBeer{
    kind: BeerKind
    name: String
    price: Int
  }
  
  input FileInput{
    contentType: String!
    filename: String!
  }
  
  type FileUploadResponse{
    fileKey: String!
    putUrl: String!
  }
  
  type Order{
    createdAt: String!
    number: Int!
    orderedBeers: [OrderedBeer!]!
  }
  
  input OrderDetail{
    number: Int!
  }
  
  type OrderedBeer{
    beer: Beer!
    quantity: Int!
  }
  
  interface Product{
    name: String!
    sku: String!
  }
  
  input ProductInOrder{
    quantity: Int!
    SKU: String!
  }
  
  input ProxyInput{
    val: String!
  }
  
  type PubMutation{
    addBeer(
      beer: AddBeer!
    ): Boolean
    cancelOrder(
      orderDetail: OrderDetail!
    ): Boolean
    editBeer(
      editBeer: EditBeer!
      SKUInput: SKUInput!
    ): Boolean
    removeBeer(
      SKUInput: SKUInput!
    ): Boolean
    submitOrder(
      order: SubmitOrder!
    ): Boolean
    uploadFile(
      fileInput: FileInput!
    ): FileUploadResponse!
  }
  
  type PubQuery{
    orders: [Order!]!
  }
  
  
  
  schema{
    mutation: Mutation
    query: Query
  }
  
  input SKUInput{
    SKU: String!
  }
  
  input SubmitOrder{
    productInOrder: [ProductInOrder!]! = []
  }
  
  type Snack implements Product{
    name: String!
    sku: String!
  }
  
  union ProductUnion = Beer | Snack
  
  type Mutation{
    pubMutation: PubMutation
  }
  
  type Query{
    clientQuery: ClientQuery!
    getFile(
      fileKey: String!
    ): String
    pubQuery: PubQuery!
    restProxy: Anything
  }
  
`,
  libraries: `
  input ProfileInput{
    username: String!
    abstract: String
    avatar: String!
    baseColor: BaseColor!
  }
  
  """
  Used to create public twits
  """
  input TwitInput{
    content: String!
    author: ProfileInput!
  }
  
  interface Node{
    _id: String
    createdAt: Date
  }
  
  type User implements Node{
    _id: String
    createdAt: Date
    username: String!
    description: String
    avatarUrl: String!
    avatarFrameColor: BaseColor!
    """
    Basic Twit object to display message Author and connected retweets and likes
    """
    likedTwits: [Twit!]!
  }
  
  input registerInput{
    username: String!
    password: String!
    confirmPassword: String!
  }
  
  input LoginInput{
    username: String!
    password: String!
  }
  
  """
  Color of the avatar ring
  """
  enum BaseColor{
    indigo
    green
    purple
    blue
    pink
    yellow
  }
  
  type Mutation{
    """
    Create new twit in shared database
    """
    twit(
      twitInput: TwitInput!
    ): Twit
    register(
      registerInput: registerInput!
    ): Token
  }
  
  """
  Basic Twit object to display message Author and connected retweets and likes
  """
  type Twit implements Node{
    content: String!
    author: User!
    likes: Int!
    createDate: Date!
    _id: String
    createdAt: Date
  }
  
  type Query{
    """
    Get my profile
    """
    me: User!
    """
    Get user twits
    """
    myTwits: [Twit!]!
    """
    Get all twits
    """
    twits: [Twit!]!
    auth(
      loginInput: LoginInput!
    ): Token
    string: String
  }
  
  scalar Date
  
  scalar Token
  
  input createTwit{
    content: String!
  }
  
  schema{
    query: Query
    mutation: Mutation
  }
  
`,
};
