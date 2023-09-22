import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";

import Header from "../../components/home/header";

import { setReportService } from "../../stores/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const part = (props) => {
  const [instrument, setInstrument] = useState([]);

  async function _setInstrument() {
    try {
      let partFromStorage = await AsyncStorage.getItem(
        `selectedPart-${props.selectedTask.idTask}-${props.serviceReport.idService}`
      );
      // console.log('ini partFrom Storagenya : ',JSON.parse(partFromStorage))
      if (partFromStorage) {
        setInstrument(JSON.parse(partFromStorage));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    _setInstrument();
  }, []);

  async function next() {
    let sentInstrument = instrument.map((el) => {
      return el.qty === 0 ? { ...el, totalPrice: 0 } : el;
    });
    try {
      await props.setReportService("part", sentInstrument);
      // console.log('ini hasildi nextnya : ', instrument)
      props.navigation.navigate("CostScreen");
    } catch (error) {
      console.log(error);
    }
  }

  function changeValue(punctuation, idx) {
    let data = [];
    instrument.forEach((el) => data.push({ ...el }));
    if (punctuation === "+") {
      data[idx].qty === instrument[idx].maxCap
        ? instrument[idx].maxCap
        : data[idx].qty++;
    } else {
      data[idx].qty === 0 ? data[idx].qty : data[idx].qty--;
    }
    data[idx].totalPrice = data[idx].qty * data[idx].price;
    setInstrument(data);
  }
  // console.log('ini instrumentnya di part', instrument)
  return (
    <View style={viewStyles.container}>
      <Header navigation={props.navigation} title={"Service Report Form"} />
      <View style={viewStyles.content}>
        <ScrollView>
          <View style={viewStyles.headerPage}>
            <Image
              source={require("../../assets/images/part.png")}
              style={{
                width: wp("100%"),
                height: "100%",
                resizeMode: "cover",
                position: "absolute",
                zIndex: 0,
              }}
            />
            <View
              style={{
                backgroundColor: "rgba(66, 204, 220, 0.4)",
                width: wp("100%"),
                height: "100%",
                position: "absolute",
              }}
            ></View>
            <View
              style={{
                backgroundColor: "rgba(74, 115, 228, 0.4)",
                width: wp("100%"),
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                {props.selectedInstrument.data.merk}
              </Text>
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                {" "}
                -{" "}
              </Text>
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                {props.selectedInstrument.data.type}
              </Text>
            </View>
          </View>
          <View style={viewStyles.head}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              {" "}
              Part{" "}
            </Text>
          </View>
          <View style={viewStyles.componentPart}>
            {instrument.map((part, index) => {
              return (
                <View style={viewStyles.part} key={index}>
                  <Text>{part.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => changeValue("-", index)}
                      style={{
                        ...viewStyles.button,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <Text style={{ color: "blue" }}> - </Text>
                    </TouchableOpacity>

                    <View style={viewStyles.button}>
                      <Text> {part.qty} </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => changeValue("+", index)}
                      style={{
                        ...viewStyles.button,
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                      }}
                    >
                      <Text style={{ color: "blue" }}> + </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={viewStyles.bottomBar}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={textStyles.next}>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => next()}>
          <Text style={textStyles.next}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    paddingTop: hp("10%"),
    height: hp("97%"),
    flex: 1,
  },
  content: {
    flex: 7,
    // padding: 10,
  },
  bottomBar: {
    backgroundColor: "#e6e6e6",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerPage: {
    height: hp("15%"),
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  head: {
    height: hp("8%"),
    backgroundColor: "rgba(69, 191, 217, 1)",
    justifyContent: "center",
    fontWeight: "bold",
    padding: 13,
  },
  part: {
    height: 35,
    margin: 10,
    width: "94%",
    paddingHorizontal: 10,
    borderBottomWidth: 0.4,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    width: 30,
    height: 25,
    padding: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const textStyles = StyleSheet.create({
  next: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#707070",
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setReportService,
};

export default connect(mapStateToProps, mapDispatchToProps)(part);
// export default part
