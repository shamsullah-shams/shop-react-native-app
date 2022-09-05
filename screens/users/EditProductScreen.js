import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from '@expo/vector-icons';
import { updateProduct, createProduct } from "../../store/actions/product";



const EditProductScreen = props => {


    const prodId = props.route.params.prodId ? props.route.params.prodId : null;

    let selectedProduct;

    if (prodId) {
        selectedProduct = useSelector(state => state.products.userProducts.find(p => p.id === prodId));
    }

    const [title, setTitle] = useState(selectedProduct ? selectedProduct.title : '');
    const [price, setPrice] = useState(selectedProduct ? selectedProduct.price : '');
    const [imageUrl, setImageUrl] = useState(selectedProduct ? selectedProduct.imageUrl : "");
    const [description, setDiscription] = useState(selectedProduct ? selectedProduct.description : "");


    const dispatch = useDispatch();



    props.navigation.setOptions({
        title: selectedProduct ? "Edit" : "Add",
        headerRight: () => (
            <Entypo name="check" size={24} color="white" onPress={() => {
                if (selectedProduct) {
                    dispatch(updateProduct(prodId, title, +price, description, imageUrl));
                } else {
                    dispatch(createProduct(title, +price, description, imageUrl));
                }
            }} />
        )
    })


    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formcontrol}>
                    <Text style={styles.lable}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                {
                    selectedProduct ? null : (
                        <View style={styles.formcontrol}>
                            <Text style={styles.lable}>price</Text>
                            <TextInput
                                style={styles.input}
                                value={price}
                                onChangeText={text => setPrice(text)}
                            />
                        </View>
                    )
                }
                <View style={styles.formcontrol}>
                    <Text style={styles.lable}>imageUrl</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                <View style={styles.formcontrol}>
                    <Text style={styles.lable}>description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDiscription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formcontrol: {
        width: "100%",
    },
    lable: {
        fontFamily: "open-sans-bold",
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderColor: "#ccc",
        borderBottomWidth: 1,
    }
})

export default EditProductScreen;