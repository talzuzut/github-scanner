import React from 'react';
import {RepositoryListItem} from "../types/RepositoryType";
import {Card} from "react-bootstrap";
import {Divider} from "@mui/material";
import {Link} from 'react-router-dom';

interface RepositoryListProps {
    repositories: RepositoryListItem[] | null;

}

const RepositoryList: React.FC<RepositoryListProps> = ({repositories}) => {
    if (!repositories) {
        return <div></div>;
    }
    return (
        <div>
            <h2>Repository List</h2>
            {repositories.map((repository) => (
                <Card key={repository.name}>
                    <Card.Body>
                        <Card.Text><h3><Link to={`/${repository.owner}/${repository.name}`}>{repository.name}</Link>
                        </h3></Card.Text>
                        <Card.Text>
                            <strong>Size:</strong> {repository.size + " KB"}
                            <br/>
                            <strong>Owner:</strong> {repository.owner}
                        </Card.Text>
                    </Card.Body>
                    <Divider/>
                </Card>

            ))}
        </div>
    );
};
export default RepositoryList;