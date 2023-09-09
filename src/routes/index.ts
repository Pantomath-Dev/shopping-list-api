import * as express from "express";
import * as api from "./api"
import ErrorResponse from "../types/ErrorResponse";

const apiKeyValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const apiKey = req.headers['api_key'];

    if (!apiKey || apiKey !== 'THISISTHEONLYVALIDAPIKEYFORTHISAPI') {
        let errorResponse: ErrorResponse = {
            status: "403",
            message: "Invalid input, invalid or missing API key"
        }

        return res.status(403).json(errorResponse);
    }

    next();
};


export const register = (app: express.Application) => {
    // Handling '/' Request
    app.get('/', (_req, _res) => {
        _res.send("You just hit the root");
    });

    app.use('/*', apiKeyValidator);

    api.register(app);
};