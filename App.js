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


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import { View, Button } from 'react-native';

// function FirstPage({ navigation }) {
//   return (
//     <View>
//       <Button
//         title="Go to Second Page"
//         onPress={() => navigation.navigate('SecondPage')}
//       />
//     </View>
//   );
// }
// function SecondPage({ navigation }) {
//   return (
//     <View>
//       <Button
//         title="Go back to First Page"
//         onPress={() => navigation.goBack()}
//       />
//     </View>
//   );
// }

// SecondPage.navigationOptions = {
//   title: 'Second Page', // Add a title to the header
// };




// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="FirstPage">
//         <Stack.Screen name="FirstPage" component={FirstPage} />
//         <Stack.Screen name="SecondPage" component={SecondPage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
