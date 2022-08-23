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
    });


    const onSelect = (id, title) => {
        props.navigation.navigate("Product Details", {
            prodId: id,
            name: title,
        });
    }


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
                        onSelect={() => {
                            onSelect(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <Button title="View Details" onPress={() => {
                            onSelect(itemData.item.id, itemData.item.title)
                        }} />
                        <Button title="Add To Cart" onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }} />
                    </ProductItem>
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