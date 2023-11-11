export interface RepositoryFormattedDetails {
    name: string;
    size: string;
    owner: string;
    isPrivate?: boolean;
    visibility?: string;
    filesCount?: number;
    yamlFile?: string;
}

export interface RepositoryFileDetails {
    name: string;
    type: string;
    extension?: string;
    path?: string;
    owner?: string;
    repository?: string;
}

