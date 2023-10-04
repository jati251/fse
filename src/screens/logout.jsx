import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { connect, useDispatch } from "react-redux";

import { logout } from "../stores/action";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = {
  logout,
};

const logoutScreen = (props) => {
  const dispatch = useDispatch();
  function toLogout() {
    dispatch(logout());
    props.navigation.navigate("SignIn");
  }

  useEffect(() => {
    toLogout();
  }, []);

  return (
    <View
      style={{
        width: widthPercentageToDP("100%"),
        height: heightPercentageToDP("100%"),
        backgroundColor: "blue",
      }}
    >
      <Button title="logging out" onPress={() => toLogout()} />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(logoutScreen);
