import React, {useState} from 'react';
import {Button, Container, TextField} from "@mui/material";

interface SearchFormProps {
    singleRepositorySearch: (owner: string, name: string) => void;
    repositoryListSearch: (owner: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({singleRepositorySearch, repositoryListSearch}) => {
    const [owner, setOwner] = useState('');
    const [name, setName] = useState('');

    const handleSingleRepositoriesSearch = () => {
        singleRepositorySearch(owner, name);

    };

    const handleAllRepositoriesByUserSearch = () => {
        repositoryListSearch(owner);
    };
    return (
        <Container>
            <TextField
                variant="outlined"
                label="Owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                style={{marginRight: '10px'}}
            />
            <TextField
                variant="outlined"
                label="Repository Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSingleRepositoriesSearch}
                style={{marginTop: '10px', marginLeft: '10px'}}
            >
                Repository Details
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAllRepositoriesByUserSearch}
                style={{marginTop: '10px', marginLeft: '10px'}}
            >
                All Repositories By User
            </Button>
        </Container>
    );
};

export default SearchForm;