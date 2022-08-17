import React from "react";
import { Button, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";


const ProductDetailScreen = (props) => {

    const { prodId } = props.route.params;


    const selectedProduct = useSelector(state => state.products.availableProducts.find(sp => sp.id === prodId));


    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.action}>
                <Button title="Add To Cart" onPress={() => { }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};






const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20,
    },
    action: {
        marginVertical: 10,
        alignItems: "center",
    }
});


export default ProductDetailScreen;