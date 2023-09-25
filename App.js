import 'react-native-gesture-handler';
import * as React from 'react';
import thunk from "redux-thunk";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/stores/reducers";
import Home from "./src/navigation"
import signIn from "./src/screens/signIn";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";

const store = createStore(reducer, applyMiddleware(thunk));
const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={signIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
