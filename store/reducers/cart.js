import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ORDER_NOW } from "../actions/order";
import Cart from "../../models/cart";
import { DELETE_PRODUCT } from "../actions/product";


const initialState = {
    items: {},
    totalAmount: 0,
};



export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = action.product.price;
            const prodTitle = action.product.title;
            let newOrUpdatedItem;
            if (state.items[addedProduct.id]) {

                // already exist the product
                newOrUpdatedItem = new Cart(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice,
                );

            } else {
                newOrUpdatedItem = new Cart(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: newOrUpdatedItem },
                totalAmount: state.totalAmount + prodPrice,
            }
        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.productId];
            const currentQut = selectedItem.quantity;
            let updatedCartItems;
            if (currentQut > 1) {
                // reduce it 
                const updatedItem = new Cart(currentQut - 1, selectedItem.productPrice, selectedItem.productTitle, selectedItem.sum - selectedItem.productPrice);

                updatedCartItems = { ...state.items, [action.productId]: updatedItem }

            } else {
                // remove it 
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.productId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedItem.productPrice,
            }

        case DELETE_PRODUCT:
            const selectedDeletion = state.items[action.productId];
            if (selectedDeletion) {

                const deletedSelection = { ...state.items };
                delete deletedSelection[action.productId];

                return {
                    ...state,
                    items: deletedSelection,
                    totalAmount: state.totalAmount - (selectedDeletion.productPrice * selectedDeletion.quantity)
                }
            }
        case ORDER_NOW:
            return initialState;

    }
    return state;
}