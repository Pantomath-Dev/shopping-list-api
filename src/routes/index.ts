import * as express from "express";
import * as api from "./api"

export const register = (app: express.Application) => {
    // Handling '/' Request
    app.get('/', (_req, _res) => {
        _res.send("You just hit the root");
    });
    
    api.register(app);
};