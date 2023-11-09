export const typeDefs = `#graphql
type Repository {
    name: String
    diskUsage: Int
    owner: String
}

type RepoDetails {
    name: String
    diskUsage: Int
    owner: String
    isPrivate: Boolean
    fileCount: Int
    yamlContent: String
    webhooks: Int
}

type Query {
    listRepositories(token: String): [Repository]
    getRepoDetails(token: String, name: String): RepoDetails
}
`;