import React from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import { FontAwesome5, Octicons } from '@expo/vector-icons';




const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    props.navigation.setOptions({
        headerRight: () => (
            <FontAwesome5 name="shopping-cart" size={24} color="white" onPress={() => {
                props.navigation.navigate("cart screen");
            }} />
        ),
        headerLeft: () => (
            <Octicons name="checklist" size={24} color="white" onPress={() => {
                props.navigation.navigate("order");
            }} />
        ),
    })
    return (
        <FlatList
            style={styles.flatlist}
            data={products}
            keyExtractor={item => item.id}
            renderItem={(itemData) => {
                return (
                    <ProductItem
                        title={itemData.item.title}
                        price={itemData.item.price}
                        image={itemData.item.imageUrl}
                        onViewDetail={() => {
                            props.navigation.navigate("Product Details", {
                                prodId: itemData.item.id,
                                name: itemData.item.title,
                            });
                        }}
                        onAddToCart={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
                    />
                )
            }}
        />
    )
}


const styles = StyleSheet.create({
    flatlist: {
        marginHorizontal: 10,
        marginVertical: 10,
    }
})

export default ProductOverviewScreen;