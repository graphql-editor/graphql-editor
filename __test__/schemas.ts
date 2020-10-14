export const GraphQLScalars = `
scalar URL
scalar Date
`;

export const GraphQLPost = `
type Post{
    url: URL
    created: Date
    file: File
}
`;

export const GraphQLStorage = `
type File{
    url: URL
}
`;

export const GraphQLBlog = `
type Query{
    posts: [Post]
}
schema{
    query: Query
}
`;

export const GraphQLTransform = `
    type Post @model{
        name: String!
        content: String!
        createdAt: String!
    }

    type Author @model{
        name: String!
        posts: [Post!]!
    }

    type Query{
        version:String
    }
    type Mutation{
        version:String
    }

    directive @model on OBJECT
`;
