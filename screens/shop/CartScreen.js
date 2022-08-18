import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import { onRemove } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";


const CartScreen = props => {
    const total = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();

    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (let key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    })

    props.navigation.setOptions({
        title: "Cart Screen",
    })

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total : <Text style={styles.amount}>${total.toFixed(2)}</Text>
                </Text>
                <Button
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(addOrder(cartItems, total))
                    }} />
            </View>
            <FlatList
                data={cartItems}
                renderItem={itemData => <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    deleteable
                    amount={itemData.item.sum}
                    onRemove={() => {
                        dispatch(onRemove(itemData.item.productId));
                        // console.log(itemData.item);
                    }}
                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 5,
    },
    summaryText: {
        fontFamily: "open-sans-bold",
    },
    amount: {
        color: "tomato",
    },
});


export default CartScreen;