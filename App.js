import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productReducer from "./store/reducers/products";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductOverScreen from "./screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from './screens/shop/ProductDetailScreen';


// combining reducers
const rootReducer = combineReducers({
  products: productReducer,
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


