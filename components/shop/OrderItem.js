import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import CartItem from "./CartItem";

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);


    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>

            <Button title={showDetails ? "Hide Details" : "Show Details"} onPress={() => {
                setShowDetails(!showDetails);
            }} />
            {showDetails && <View style={styles.detailsItem}>
                {
                    props.items.map(cartItem => {
                        return (
                            <CartItem
                                key={cartItem.productId}
                                quantity={cartItem.quantity}
                                amount={cartItem.sum}
                                title={cartItem.productTitle}
                            />
                        )
                    })
                }

            </View>}
        </View>
    )
};


const styles = StyleSheet.create({
    orderItem: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        padding: 10,
        alignItems: "center",
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },
    amount: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        fontFamily: "open-sans",
        color: "#888",
    },
    detailsItem: {
        width: "100%",
    }
});


export default OrderItem;