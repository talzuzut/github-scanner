import dotenv from 'dotenv';
import express from 'express';
import {router as repositoryRouter} from "./routes/repositoryRoute.ts";
import cors from 'cors';

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;
const reactAppUrl: string = process.env.REACT_APP_URL || 'http://localhost:3001';
const corsOptions = {
    origin: reactAppUrl, // Allow access from the react app domain
    methods: 'GET',
    optionsSuccessStatus: 200,
};

const app: express.Application = express();
app.use(cors(corsOptions));
app.use("/repositories", repositoryRouter);
app.use("*", (req, res) => {
    res.status(404).send("Not Found");
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

