import dotenv from 'dotenv';
import express from 'express';
import {router as repositoryRouter}    from "./routes/repositoryRoute.ts";
dotenv.config();
const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = express();
app.use("/repositories",repositoryRouter );
app.use("*", (req, res) => {
    res.status(404).send("Not Found");
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

//TODO add pagination to fetchAllRepositories
//TODO fetch repository files recursively
//TODO fetch repository yaml file
//TODO fetch repository webhooks
