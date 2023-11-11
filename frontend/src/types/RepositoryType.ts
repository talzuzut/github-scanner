export interface RepositoryFormattedDetails {
    name: string;
    size: string;
    owner: string;
    isPrivate?: boolean;
    visibility?: string;
    filesCount?: number;
    yamlFile?: string;
}

export interface RepositoryListItem {
    name: string;
    size: string;
    owner: string;
}

