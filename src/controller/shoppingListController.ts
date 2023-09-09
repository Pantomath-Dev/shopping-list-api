import ShoppingListItem from '../types/ShoppingListItem';

let nextUserId = 1;

class ShoppingListController {
    private shoppingListItems: ShoppingListItem[];

    constructor() {
        this.shoppingListItems = [];
    }

    addShoppingListItem(shoppingListItem: ShoppingListItem, cb: (error: any, shoppingListItem: ShoppingListItem) => void) {
        shoppingListItem.id = nextUserId++;
        this.shoppingListItems.push(shoppingListItem);

        cb(null, shoppingListItem);
    }

    listShoppingListItems(cb: (error: any, shoppingListItem: ShoppingListItem[]) => void) {
        cb(null, this.shoppingListItems);
    }

    updateShoppingListItem(shoppingListItem: ShoppingListItem, cb: (error: any, updatedShoppingListItem: ShoppingListItem | null) => void) {
        const matchingItems = this.shoppingListItems.filter((item) => item.id == shoppingListItem.id);

        if(matchingItems.length == 0){
            cb('Shopping list item not found', null);
        } 

        const itemToUpdate = matchingItems[0];
        
        itemToUpdate.name = shoppingListItem.name;
        itemToUpdate.price = shoppingListItem.price;
        itemToUpdate.quantity = shoppingListItem.quantity;

        cb(null, itemToUpdate);
    }

    removeShoppingListItem(id: number, cb: (error: any) => void){
        const matchingItems = this.shoppingListItems.filter((item) => item.id == id);

        if(matchingItems.length == 0){
            cb("Remove failed as no such shopping list item exists");
        } 

        this.shoppingListItems = this.shoppingListItems.filter((item) => item.id != id);

        cb(null);
    }
}

export { ShoppingListController };