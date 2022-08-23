import React from "react";
import { FlatList, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PruductItem from "../../components/shop/ProductItem";
import { DeletePorduct } from "../../store/actions/product";


const UserProductScreen = props => {

    const dispatch = useDispatch()

    const userProducts = useSelector(state => state.products.userProducts);

    const onSelect = (id, title) => {
        props.navigation.navigate("Product Details", {
            prodId: id,
            name: title,
        })
    }


    return (
        <FlatList
            style={styles.flatlist}
            data={userProducts}
            renderItem={itemData => <PruductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    onSelect(itemData.item.id, itemData.item.title);
                }}
            >
                <Button title="Delete" onPress={() => {
                    dispatch(DeletePorduct(itemData.item.id))
                }} />
                <Button title="Edit" onPress={() => { }} />
            </PruductItem>}
        />
    )
}


const styles = StyleSheet.create({
    flatlist: {
        marginHorizontal: 10,
        marginVertical: 10,
    }
})


export default UserProductScreen;