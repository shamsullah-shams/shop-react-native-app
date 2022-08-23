import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1"),
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            const newProductArray = state.availableProducts.filter(p => p.id !== action.productId);
            const userProducts = state.userProducts.filter(p => p.id !== action.productId);
            return {
                ...state,
                availableProducts: newProductArray,
                userProducts: userProducts,
            }
    }
    return state;
}; 