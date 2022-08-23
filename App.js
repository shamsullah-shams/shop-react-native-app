import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productReducer from "./store/reducers/products";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductOverScreen from "./screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from './screens/shop/ProductDetailScreen';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { useState } from 'react';
import cartReducer from './store/reducers/cart';
import CartScreen from './screens/shop/CartScreen';
import orderReducer from './store/reducers/order';
import OrderScreen from "./screens/shop/OrderScreen";
import UserProductScreen from './screens/users/UserProducts';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';





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
  orders: orderReducer,
})
// creating store object
const store = createStore(rootReducer);


// create stack
const Stack = createNativeStackNavigator();
// create tab
const Tab = createBottomTabNavigator();

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

const StackNavigation = () => {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={err => console.log(err)}
    />
  }


  return (
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
      <Stack.Screen
        name='order'
        options={Options("Orders")}
        component={OrderScreen}
      />
      <Stack.Screen
        name='user'
        options={Options("user")}
        component={TabNavigation}
      />
    </Stack.Navigator>
  );
}





const TabNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === "home") {
                return <Entypo name="home" size={24} color="white" />
              } else if (route.name === "user") {
                return <AntDesign name="user" size={24} color="white" />
              }
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "white",

            tabBarStyle: {
              backgroundColor: "#6495ed"
            }
          })}
        >
          <Tab.Screen name="home" component={StackNavigation} options={{
            headerShown: false,
          }} />
          <Tab.Screen name="user" component={UserProductScreen} options={Options("Admin")} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}



export default TabNavigation