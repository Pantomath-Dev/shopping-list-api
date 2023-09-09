import * as express from "express";

//TODO: add auth
export const register = ( app: express.Application ) => {
    
    app.post('/shopping-list-items', (req, res) => {
        return res.json({ 
            "id": "1234567",
            "name": "milk",
            "price": 2.57,
            "quantity": 1
        });
    });

    app.get('/shopping-list-items', (req, res) => {
        return res.json({ 
            "id": "1234567",
            "name": "milk",
            "price": 2.57,
            "quantity": 1
        });
    });
    
    app.put('/shopping-list-items/:id', (req, res) => {
        return res.json({ 
            "id": req.params.id,
            "name": "milk",
            "price": 2.57,
            "quantity": 1
        }).status(200);
    });

    app.delete('/shopping-list-items/:id', (req, res) => {
        return res.status(200);
    });
};
