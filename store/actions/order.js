export const ORDER_NOW = "ORDER_NOW";

export const addOrder = (cartItems, totalAmount) => {
    return {
        type: ORDER_NOW,
        orderData: {
            items: cartItems,
            amount: totalAmount,
        }
    }
};