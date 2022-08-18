import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productReducer from "./store/reducers/products";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductOverScreen from "./screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from './screens/shop/ProductDetailScreen';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { useState } from 'react';
import cartReducer from './store/reducers/cart';
import CartScreen from './screens/shop/CartScreen';




// fetch font
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require('./assets/fonts/OpenSans-Regular.ttf'),
    "open-sans-bold": require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}


// combining reducers
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
})
// creating store object
const store = createStore(rootReducer);



const Stack = createNativeStackNavigator();

// screen options
const Options = title => {
  return {
    title: title,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#6495ed",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={err => console.log(err)}
    />
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen
            options={Options("ProductOverView")}
            name='ProductOverView'
            component={ProductOverScreen}
          />
          <Stack.Screen
            name='Product Details'
            options={({ route }) => {
              return {
                ...Options(route.params.name),
              }
            }}
            component={ProductDetailScreen}
          />
          <Stack.Screen
            name="cart screen"
            options={Options("some")}
            component={CartScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


