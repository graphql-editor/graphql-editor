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
