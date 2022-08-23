import React from "react";
import { Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp onPress={props.onSelect}>
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.action}>
                    {
                        props.children
                    }
                </View>
            </View>
        </TouchableCmp>
    );
};


const styles = StyleSheet.create({
    product: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 5,
        height: 300,
        marginBottom: 20,
        borderColor: "black",
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: "open-sans-bold"
    },
    imageContainer: {
        width: "100%",
        height: "60%",
        overflow: "hidden",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    price: {
        fontSize: 14,
        color: "#888",
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "25%",
        paddingHorizontal: 20,
    },
    details: {
        alignItems: "center",
        height: "15%",
        padding: 10,
    }

});


export default ProductItem;