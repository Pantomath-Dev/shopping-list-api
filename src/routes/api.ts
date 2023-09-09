import * as express from "express";
import { ShoppingListController } from "../controller/shoppingListController";
import ShoppingListItem from "../types/ShoppingListItem";
import ErrorResponse from "../types/ErrorResponse";

const validateShoppingListItemRequestBody = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const item = req.body as ShoppingListItem;

    if (!item || !item.name || !item.price || !item.quantity) {
        let errorResponse: ErrorResponse = {
            status: "400",
            message: "Invalid input"
        };

        return res.status(400).json(errorResponse);
    }

    next();
}

export const register = (app: express.Application) => {

    const shoppingListController = new ShoppingListController();

    app.post('/shopping-list-items', validateShoppingListItemRequestBody, (req, res) => {
        const item = req.body as ShoppingListItem;

        shoppingListController.addShoppingListItem(item, (error, addedShoppingListItem) => {
            if (error) {
                const errorResponse: ErrorResponse = {
                    status: "500",
                    message: "Internal server error",
                };
                return res.status(500).json(errorResponse);
            } else {
                return res.status(200).json(addedShoppingListItem);
            }
        });
    });

    app.get('/shopping-list-items', (req, res) => {
        shoppingListController.listShoppingListItems((error, shoppingListItems) => {
            if(error){
                const errorResponse: ErrorResponse = {
                    status: "500",
                    message: "Internal server error",
                };
                return res.status(500).json(errorResponse);
            } else{
                return res.status(200).json(shoppingListItems);
            }
        });
    });

    app.put('/shopping-list-items/:id', validateShoppingListItemRequestBody, (req, res) => {
        const item = req.body as ShoppingListItem;

        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            let errorResponse: ErrorResponse = {
                status: "400",
                message: "Invalid input"
            };
    
            return res.status(400).json(errorResponse);
        }

        item.id = id;

        shoppingListController.updateShoppingListItem(item, (error, updatedShoppingListItem) => {
            if(error){
                const errorResponse: ErrorResponse = {
                    status: "500",
                    message: "Internal server error",
                };
                return res.status(500).json(errorResponse);
            } else{
                return res.status(200).json(updatedShoppingListItem);
            }
        });
    });

    app.delete('/shopping-list-items/:id', (req, res) => {
        
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            let errorResponse: ErrorResponse = {
                status: "400",
                message: "Invalid input"
            };
    
            return res.status(400).json(errorResponse);
        }
        
        shoppingListController.removeShoppingListItem(id, (error) => {
            if(error){
                const errorResponse: ErrorResponse = {
                    status: "404",
                    message: error,
                };

                return res.status(500).json(errorResponse);
            } else{
                return res.status(200).send();
            }        
        });
    });
};
