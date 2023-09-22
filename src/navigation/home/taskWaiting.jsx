import React from 'react'
import { createStackNavigator } from "react-navigation-stack"
import Info from '../../screens/Waiting-Info'
import Customer from '../../screens/Waiting-Customer'
import Part from '../../screens/Waiting-Part'
import Detail from '../../screens/Waiting-Detail'
import Header from '../../components/home/header'

export default StackHome = createStackNavigator({
  Info: {
    screen: Info,
    navigationOptions: {
      header: null
    }
  },
  Customer: {
    screen: Customer,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Part: {
    screen: Part,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
}, {
  initialRouteName: 'Info'
})