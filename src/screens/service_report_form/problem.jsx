import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";

import IconF5 from "react-native-vector-icons/FontAwesome5";
import IconF from "react-native-vector-icons/FontAwesome";
import Header from "../../components/home/header";

import { setReportService } from "../../stores/action";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setReportService,
};
const problem = (props) => {
  const [isNull, setIsNull] = useState(true);

  // console.log('ini anu propsnya service report', props.serviceReport)
  // console.log('ini selectedtasknya lho', props.selectedTask)
  // console.log('ini selected instrumentnya lho', props.selectedInstrument)
  return (
    <KeyboardAvoidingView
      style={viewStyles.container}
      behaviour={("padding", "position")}
      enabled
    >
      <Header navigation={props.navigation} title={"Service Report Form"} />
      <View style={viewStyles.belowHeader}>
        <ScrollView>
          {isNull && (
            <ImageBackground
              source={require("../../assets/images/nodata.png")}
              style={{ width: 163, height: 193 }}
            />
          )}
        </ScrollView>
      </View>
      <View style={viewStyles.option}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProblemScreen")}
          style={viewStyles.optionWraper}
        >
          <View style={viewStyles.box}>
            <IconF5 name={"plus"} size={20} color={"#fff"} />
          </View>
          <Text style={textStyles.caption}> Add Problem </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={viewStyles.optionWraper}
          onPress={() => props.navigation.navigate("PartScreen")}
        >
          <View style={viewStyles.box}>
            <IconF name={"mail-forward"} size={20} color={"#fff"} />
          </View>
          <Text style={textStyles.caption}> Skip</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    paddingTop: hp("10%"),
    flex: 1,
  },
  belowHeader: {
    height: hp("63%"),
    alignItems: "center",
    paddingTop: "15%",
    backgroundColor: "#ffffff",
    // borderWidth: 1
  },
  option: {
    backgroundColor: "#fff",
    height: hp("25%"),
    alignItems: "flex-start",
    flexDirection: "row",
    width: wp("100%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 20.0,
    elevation: 24,
  },
  box: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
    borderRadius: 6,
  },
  optionWraper: {
    margin: 20,
    justifyContent: "flex-start",
  },
});

const textStyles = StyleSheet.create({
  caption: {
    width: 60,
    paddingVertical: 5,
    fontSize: 12,
    color: "#333335",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(problem);
