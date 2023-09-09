import dotenv from "dotenv";
import express from 'express';
import * as routes from "./routes";

// initialize configuration
dotenv.config();

// Initialize the express engine
const app: express.Application = express();

// Take a port 5000 for running server.
// TODO: update this to use process.env.SERVER_PORT if you have time
const port: number = 5000;

routes.register(app);

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
});
