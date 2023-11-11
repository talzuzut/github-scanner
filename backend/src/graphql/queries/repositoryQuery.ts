
const fetchAllRepositoriesQuery = (nextPageCursor: String = "") => {
    const cursor = nextPageCursor ? `, after: "${nextPageCursor}"` : "";
    return `{
  viewer {
    repositories(first: 100, ${cursor} orderBy: {field: NAME, direction: ASC}) {
      pageInfo {
        hasNextPage
      }
      nodes {
        name
        diskUsage
        owner {
          login
        }
      }
    }
  }
}`
};

const fetchAllRepositoriesByOwnerQuery = (owner: String, nextPageCursor: String = "") => {
    const cursor = nextPageCursor ? `, after: "${nextPageCursor}"` : "";
    return `
    {
  user(login: "${owner}") {
    repositories(first: 100, ${cursor} orderBy: {field: NAME, direction: ASC}) {
      nodes {
        name
        diskUsage
        owner {
          login
        }
      }
    }
  }
}
    `;
}

const fetchRepositoryBasicDetailsByNameQuery = (owner: String, name: String) => {
    return `
{repository(owner:"${owner}", name:"${name}")
{
        name
        diskUsage
        owner {
            login
            }
        isPrivate
        
        defaultBranchRef{
        name
            }
      }
}
`
}
const fetchRepositoryFilesQuery = (owner: String, name: String, path: String = "", defaultBranch: String = "master") => {
    return `
{
  repository(owner: "${owner}", name: "${name}") {
    object(expression: "${defaultBranch}:${path}") {
      ... on Tree {
        entries {
          name
          type
          extension
        }
      }
    }
  }
}
`
};
const fetchRepositoryYamlFileQuery = (owner: String, name: String, path: string, defaultBranch: string = "master") => {
    return `{
  repository(owner: "${owner}", name: "${name}") {
    object(expression: "${defaultBranch}:${path}") {
      ... on Blob {
        text
      }
    }
  }
}`;
};


export {
    fetchAllRepositoriesQuery,
    fetchRepositoryBasicDetailsByNameQuery,
    fetchRepositoryFilesQuery,
    fetchRepositoryYamlFileQuery,
    fetchAllRepositoriesByOwnerQuery
}