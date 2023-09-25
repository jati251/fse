import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView, ScrollView, View, Image, StyleSheet } from 'react-native';

import Home from '../screens/Home';
import { logout } from "../stores/action";
import logoutScreen from "../screens/logout";
import { useDispatch } from 'react-redux';


const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
});


function CustomDrawerContent(props) {
    const dispatch = useDispatch()


    const handleLogout = () => {
        dispatch(logout())
        props.navigation.navigate("SignIn");
    }
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container}>
                <View style={{ height: 150, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/images/Diapro.png')} style={{ height: 120, width: 250, resizeMode: 'contain' }} />
                </View>
                <ScrollView>
                    <DrawerItemList {...props} />
                </ScrollView>
                <DrawerItem
                    label="Logout"
                    onPress={handleLogout}
                />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

const HomeScreen = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}


        >
            <Drawer.Screen name="All Task" component={Home} options={{

                headerStyle: {
                    backgroundColor: '#2F3E9E',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </Drawer.Navigator>
    );
};

export default HomeScreen;




