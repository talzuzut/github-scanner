import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {BACKEND_BASE_URL} from "../App.tsx";
import {RepositoryFormattedDetails} from "../types/RepositoryType";
import RepositoryDetails from "./RepositoryDetails.tsx";

const SingleRepository = () => {
    const { name, owner } = useParams<{ name: string; owner: string }>();
    const [repositoryDetails, setRepositoryDetails] = useState<RepositoryFormattedDetails | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_BASE_URL}/repositories/${owner}/${name}`)
            .then(response => {
                setRepositoryDetails(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [name, owner]);

    if (!repositoryDetails) {
        return <div>Loading...</div>;
    }

    return (
        <RepositoryDetails repository={repositoryDetails}/>


    );
};

export default SingleRepository;
