import axios from "axios";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";



export const deletePorduct = (productId) => {
    return {
        productId: productId,
        type: DELETE_PRODUCT,
    };
};


export const createProduct = (title, price, description, imageUrl) => {
    return async dispatch => {


        const result = await axios.post("http://localhost:9000/product/create", {
            titleL: title,
            price: price, imageUrl: imageUrl, description: description,
        });


        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                title,
                price,
                description,
                imageUrl,
            }
        });
    }
};


export const updateProduct = (id, title, price, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        prodId: id,
        productData: {
            title,
            description,
            imageUrl,
        }
    }
};