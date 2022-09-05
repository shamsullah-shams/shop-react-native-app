import React from "react";
import { FlatList, Button, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PruductItem from "../../components/shop/ProductItem";
import { deletePorduct } from "../../store/actions/product";
import { FontAwesome5 } from '@expo/vector-icons';


const UserProductScreen = props => {

    const dispatch = useDispatch()

    const userProducts = useSelector(state => state.products.userProducts);

    const onSelect = (id, title) => {
        props.navigation.navigate("Product Details", {
            prodId: id,
            name: title,
        })
    }


    const editHandler = (id, title) => {
        props.navigation.navigate("edit", {
            prodId: id,
            name: title,
        })
    }



    props.navigation.setOptions({
        headerRight: () => (
            <FontAwesome5 name="shopping-cart" size={24} color="white" onPress={() => {
                props.navigation.navigate("edit", {
                    prodId: undefined,
                });
            }} />
        ),
    });


    const deleteHandler = (id) => {
        Alert.alert("Are you sure", 'You want to perminantly delete this item',
            [
                { text: "NO", style: "default" },
                {
                    text: "OK", style: "destructive", onPress: () => {
                        dispatch(deletePorduct(id))
                    }
                }
            ])
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
                    deleteHandler(itemData.item.id);
                }} />
                <Button title="Edit" onPress={() => {
                    editHandler(itemData.item.id, itemData.item.title);
                }} />
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