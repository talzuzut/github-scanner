export interface RepositoryEntry {
    type: string;
    name: string;
}

export interface RepositoryRawDetails {
    name: string ;
    diskUsage: number;
    owner: {login: string} ;
    isPrivate: boolean;
    defaultBranchRef: { name: string };
}

export interface RepositoryFormattedDetails {
    name: string ;
    size: string ;
    owner: string;
    isPrivate?: boolean;
    visibility?: string;
    filesCount?: number;
    yamlFile?: string;
    webhooks?: string[];
}

export interface RepositoryFileDetails {
    name: string;
    type: string;
    extension?: string ;
    path?: string;
    owner?: string;
    repository?: string;
}

