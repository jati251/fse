import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import {
    createBottomTabNavigator,
    createMaterialTopTabNavigator
} from 'react-navigation-tabs'
import React from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, Image } from 'react-native'
//screen
import HomeScreen from './home'
import Home from '../screens/Home'
import AcceptedFormScreen from '../screens/AcceptedForm'
import AllTaskScreen from '../screens/allTask'
import LogOutScreen from '../screens/logout'
import ServiceReportFormStack from './serviceReportForm'
import SettingScreen from '../screens/setting'
import TaskCloseWizardScreen from '../screens/taskClosedWizard'
import SignInScreen from '../screens/signIn'
import Header from '../components/home/header'
import SandboxPlayground from '../screens/playground/sandbox'
// import AcceptedForm from

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
});

const DrawerNavigation = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: "All Task",
            
        }),
    },
    // Sandbox: {
    //     screen: SandboxPlayground
    // },
    LogOut: {
        screen: LogOutScreen,
        navigationOptions: {
            drawerLabel: "Log Out"
        }
    },
}, {
    initialRouteName: 'Home',
    contentComponent: props => (
        <SafeAreaView style={styles.container}>
            <View style={{ height: 150, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../assets/images/Diapro.png')} style={{ height: 120, width: 250, resizeMode: 'contain' }}></Image>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>
    ),
})



const switchNavigation = createSwitchNavigator({
    Landing: {
        screen: DrawerNavigation
    },
    SignIn: {
        screen: SignInScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Demo Screen 2',
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
}, {
    initialRouteName: 'SignIn'
})


export default createAppContainer(switchNavigation)
