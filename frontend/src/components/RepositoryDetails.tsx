/*
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
*/
import {RepositoryFormattedDetails} from "../types/RepositoryType";
import React from "react";
import {Card} from "react-bootstrap";


interface RepositoryDetailsProps {
    repository: RepositoryFormattedDetails;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({repository}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Text>
                    <h2>{repository.name} Details</h2>
                </Card.Text>
                <Card.Text>
                    <strong>Owner:</strong> {repository.owner}
                </Card.Text>
                <hr/>
                <Card.Text>
                    <strong>Size:</strong> {repository.size}
                </Card.Text>
                <hr/>
                <Card.Text>
                    <strong>Visibility:</strong> {repository.visibility}
                </Card.Text>
                <hr/>
                <Card.Text>
                    <strong>Files Count:</strong> {repository.filesCount}
                </Card.Text>
                <hr/>
                <Card.Text>
                    <strong>YAML File Contents:</strong> {repository.yamlFile}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RepositoryDetails;