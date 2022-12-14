import PRODUCTS from "../../data/dummy-data";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/product";
import Product from "../../models/product";

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
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }

        case UPDATE_PRODUCT:
            const indexOfProduct = state.userProducts.findIndex(p => p.id === action.prodId);
            const updatedProduct = new Product(
                action.prodId,
                state.userProducts[indexOfProduct].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[indexOfProduct].price
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[indexOfProduct] = updatedProduct;

            const availableProductIndex = state.availableProducts.findIndex(p => p.id === action.prodId);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            }
    }
    return state;
}