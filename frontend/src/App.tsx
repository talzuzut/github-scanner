import React, {useState} from 'react';
import {Alert, Button, Container, CssBaseline, Typography} from '@mui/material';
import SearchForm from './components/SearchForm';
import axios, {AxiosResponse} from 'axios';
import {RepositoryFormattedDetails, RepositoryListItem} from './types/RepositoryType';
import './styling/App.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import RepositoryList from './components/RepositoryList';
import {Route, Routes, useNavigate} from 'react-router-dom';
import SingleRepository from "./components/SingleRepository.tsx";

export const BACKEND_BASE_URL = 'http://localhost:3000';
const App: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [repositoryDetails, setRepositoryDetails] = useState<RepositoryFormattedDetails | null>(null);
    const [repositoryList, setRepositoryList] = useState<RepositoryListItem[] | null>(null);
    const api = axios.create({
        baseURL: BACKEND_BASE_URL,
    });
    const navigate = useNavigate();
    const handleError = (response: AxiosResponse | null, error:any) => {

        const message =  error?.response?.data || "Github API token is invalid or reached the limit of requests..";
        console.error(message);
        if (!response) {
            setRepositoryList(null);
            setRepositoryDetails(null);
            setErrorMessage(message);
            return true;
        } else {
            setErrorMessage(null);
            return false;
        }
    };

    const handleSingleRepositorySearch = async (owner: string, repositoryName: string) => {
        try {
            if (!owner || !repositoryName) {
                setErrorMessage("Owner and repository name are required");
                return;
            }
            const response = await fetchRepositoryByNameAndOwner(owner, repositoryName);
            if (handleError(response, "Repository doesn't exist!")) {
                return;
            }
            setErrorMessage(null);
            setRepositoryList(null);
            setRepositoryDetails(response.data);
            navigate(`/${owner}/${repositoryName}`);
        } catch (error: any) {
            handleError(null, error);
            return;
        }
    };

    const handleRepositoryListSearch = async (owner: string) => {
        try {
            if (!owner) {
                setErrorMessage("Owner is required");
                return;
            }
            const response = await fetchAllRepositoriesByOwner(owner);

            setRepositoryDetails(null);
            setErrorMessage(null);
            setRepositoryList(response);
            navigate(`/${owner}`);
        } catch (error: any) {
            handleError(null, error);
            return;
        }
    };

    const fetchRepositoryByNameAndOwner = async (owner: string, repositoryName: string) => {
        try {
            if (!owner || !repositoryName) {
                setErrorMessage("Owner and repository name are required");
                return;
            }
            const response = await api.get(`/repositories/${owner}/${repositoryName}`);
            if (handleError(response, "Repository doesn't exist!")) {
                return;
            }
            return response.data;
        } catch (error: any) {
            handleError(null, error);
            return;
        }
    };

    const fetchAllRepositoriesByOwner = async (owner: string) => {
        try {
            const response = await api.get(`/repositories/${owner}`);
            return response.data;
        } catch (error: any) {
            console.log(error);
            debugger;
            throw error;
        }
    };

    const fetchAllRepositories = async () => {
        try {
            const response = await api.get('/repositories');
            console.log(response);
            if (handleError(response, "Github API token is invalid or reached the limit of requests..")) {
                return;
            }
            setRepositoryDetails(null);
            setErrorMessage(null);
            setRepositoryList(response.data);
        } catch (error: any) {
            handleError(null, error);
            return;
        }
    };

    const navigateToCurrentUserRepositories = () => {
        fetchAllRepositories();
        navigate('/currentUser');
    };
    return (
        <div>
            <div className="header">
                <GitHubIcon sx={{fontSize: 100}}/>
                <Typography variant="h3" gutterBottom>
                    GitHub Repository Explorer
                </Typography>
            </div>
            <Container maxWidth="md">
                <CssBaseline/>
                <div className="search-panel">
                    <SearchForm
                        singleRepositorySearch={handleSingleRepositorySearch}
                        repositoryListSearch={handleRepositoryListSearch}
                    />
                    <Button variant="contained" onClick={navigateToCurrentUserRepositories}>
                        Current User Repositories
                    </Button>
                </div>
                {errorMessage ? (
                    <Alert severity="error">{errorMessage}</Alert>
                ) : (
                    <div>
                        <Routes>
                            <Route path="/" element={<></>}/>
                            <Route path="/:owner" element={<RepositoryList repositories={repositoryList}/>}/>
                            <Route path="/currentUser" element={<RepositoryList repositories={repositoryList}/>}/>
                            <Route path="/:owner/:name" element={<SingleRepository/>}/>
                        </Routes>
                    </div>
                )}
            </Container>
        </div>

    );
};

export default App;
