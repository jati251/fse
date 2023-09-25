import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ErrorBanner from "../components/ErrorBanner";

//import icon
import IconMat from "react-native-vector-icons/MaterialIcons";

//import action
import { login, setLoading, inputURL, versionCheck } from "../stores/action";

const mapDispatchToProps = {
  login,
  setLoading,
  inputURL,
  versionCheck,
};
const mapStateToProps = (state) => {
  return state;
};

function LoginPage(props) {
  //State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [URL, setURL] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [passwordShown, setPasswordShown] = useState("visibility-off");
  const [countPress, setCountPress] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  //Effect
  useEffect(() => {
    getToken();
  }, []);

  //function
  function toLogin() {
    // inputURL(URL)
    if (username === "" && password === "") {
      setWarningMessage("Mohon masukkan username dan password terlebih dahulu");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
    } else if (username === "" && password !== "") {
      setWarningMessage("Username tidak boleh kosong");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
    } else if (username !== "" && password === "") {
      setWarningMessage("Password tidak boleh kosong");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
    } else {
      props.setLoading(true);
      props
        .login({ username, password })
        .then(() => {
          props.setLoading(false);
          props.navigation.navigate("Home");
        })
        .catch((err) => {
          props.setLoading(false);
          setWarningMessage("Username atau password salah");
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 1500);
        });
    }
  }

  async function getToken() {
    props.setLoading(true);
    try {
      let access_token = await AsyncStorage.getItem("access_token");
      if (access_token !== null) {
        props.setLoading(false);
        props.navigation.navigate("Home");
      } else {
        props.setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (countPress === 1) {
      ToastAndroid.show("Tekan sekali lagi untuk keluar", 3000);
    } else if (countPress === 2) {
      BackHandler.exitApp();
    }
  }, [countPress]);

  const backPressed = () => {
    setCountPress((prevCountPress) => prevCountPress + 1);
    setTimeout(() => setCountPress(0), 3000);
    return true;
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", backPressed);
    }
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backPressed);
    };
  }, []);

  const handleTogglePassword = () => {
    setPasswordShown((passwordShown) => !passwordShown);
    setSecurePassword((securePassword) => !securePassword);
  };

  return (
    <View style={viewStyles.containers}>
      <ErrorBanner visible={showMessage} onPress={() => setShowMessage(false)}>
        {warningMessage}
      </ErrorBanner>
      {/* <Modal animationType="none" transparent={true} visible={props.isLoading}>
        <View style={viewStyles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      </Modal> */}

      <View style={viewStyles.inputContainer}>
        <IconMat
          name="person"
          size={25}
          color="white"
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={viewStyles.inputText}
          placeholder={"Username"}
          placeholderTextColor={"#fff"}
          onChangeText={(text) => setUsername(text)}
          value={username}
          autoCompleteType="username"
          maxLength={40}
        />
      </View>
      <View style={viewStyles.inputContainer}>
        <IconMat
          name="lock-outline"
          size={25}
          color="white"
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={viewStyles.inputTextPwd}
          placeholder={"Password"}
          placeholderTextColor={"#fff"}
          secureTextEntry={securePassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCompleteType="password"
        />
        <IconMat
          size={25}
          color="white"
          name={passwordShown ? "visibility-off" : "visibility"}
          onPress={handleTogglePassword}
          style={{ marginLeft: 10 }}
        />
      </View>
      <TouchableOpacity style={viewStyles.button} onPress={() => toLogin()}>
        <Text style={textStyles.login}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const viewStyles = StyleSheet.create({
  containers: {
    minHeight: hp("100%"),
    alignItems: "center",
    paddingTop: hp("25%"),
    backgroundColor: "#4686B7",
  },
  button: {
    width: wp("80%"),
    height: 50,
    backgroundColor: "#33B9A3",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  inputContainer: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    padding: 5,
    marginVertical: 10,
    flexDirection: "row",
  },
  inputText: {
    width: wp("80%"),
    height: 40,
    color: "#fff",
  },
  inputTextPwd: {
    width: wp("71%"),
    height: 40,
    color: "#fff",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#606070",
    opacity: 0.5,
  },
});

const textStyles = StyleSheet.create({
  login: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  lupapassword: {
    fontSize: 13,
    color: "#fff",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
