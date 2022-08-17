import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";



const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);


    return (
        <FlatList
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
                        onAddToCart={() => { }}
                    />
                )
            }}
        />
    )
}


export default ProductOverviewScreen;