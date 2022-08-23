export const DELETE_PRODUCT = "DELETE_PRODUCT";



export const DeletePorduct = (productId) => {
    return {
        productId: productId,
        type: DELETE_PRODUCT,
    }
}