import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';





const CartItem = props => {
    return (
        <View style={styles.cart}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text numberOfLines={2} style={styles.mainText}>{props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <View>
                    <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Ionicons name="trash-sharp" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    cart: {
        padding: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center",

    },
    quantity: {
        fontFamily: "open-sans",
        color: "#888",
        fontSize: 16,

    },
    mainText: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 20
    },
});


export default CartItem;