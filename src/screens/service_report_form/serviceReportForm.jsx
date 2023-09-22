import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DateTimePicker from "@react-native-community/datetimepicker";
import IconFont from "react-native-vector-icons/FontAwesome";
import IconMat from "react-native-vector-icons/MaterialIcons";
import IconMatC from "react-native-vector-icons/MaterialCommunityIcons";
import IconFontist from "react-native-vector-icons/Fontisto";
import IconIO from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

//component
import Header from "../../components/home/header";
import { ScrollView } from "react-native-gesture-handler";

import { setReportService } from "../../stores/action";

function serviceReportForm(props) {
  const [custDataVis, setCustDataVis] = useState(true);
  const [instrumentVis, setInstrumentVis] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(date);
  const [starting, setStarting] = useState({
    date: new Date(),
    time: new Date(),
  });
  const [finish, setFinish] = useState({
    date: new Date(),
    time: new Date(),
  });
  const [mode, setMode] = useState("date");
  const [showDateStart, setShowDateS] = useState(false);
  const [showDateFinish, setShowDateF] = useState(false);
  const [showTimeStart, setShowTimeS] = useState(false);
  const [showTimeFinish, setShowTimeF] = useState(false);
  const [laborTime, setLaborTime] = useState("");
  const [travelTime, setTravelTime] = useState("");

  const [margin, setMargin] = useState(false);

  function set(field, when) {
    setMode(field);
    if (when === "start") {
      field === "date" ? setShowDateS(true) : setShowTimeS(true);
    } else {
      field === "date" ? setShowDateF(true) : setShowTimeF(true);
    }
  }

  async function next() {
    let kirimLaborTime = 0;
    let kirimTravelTime = 0;

    laborTime === "" ? (kirimLaborTime = 0) : (kirimLaborTime = laborTime);
    travelTime === "" ? (kirimTravelTime = 0) : (kirimTravelTime = travelTime);

    let startFusion = `${starting.date.toLocaleDateString()} ${starting.time.toLocaleTimeString()}`;
    let finishFusion = `${finish.date.toLocaleDateString()} ${finish.time.toLocaleTimeString()}`;
    let startDate = new Date(startFusion);
    let finishDate = new Date(finishFusion);
    let diffMs = finishDate - startDate; // Ms difference
    let minutes = Math.round(diffMs / 60000);

    try {
      await props.setReportService("totalTime", minutes);
      await props.setReportService("startTimeInstrument", startFusion);
      await props.setReportService("finishTimeInstrument", finishFusion);
      await props.setReportService("laborTime", kirimLaborTime);
      await props.setReportService("travelTime", kirimTravelTime);
      // console.log('ini service reportnya~~',props.serviceReport)
      props.navigation.navigate("AddProblemScreen");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <KeyboardAvoidingView
      style={viewStyles.container}
      behaviour={("padding", "position")}
      enabled
    >
      <Header navigation={props.navigation} title={"Service Report Form"} />
      <View style={viewStyles.headerExtend} />
      <ScrollView>
        {/* <Text>{JSON.stringify(props.selectedInstrument, 'utf8', 2)}</Text> */}

        {/* <Text>{JSON.stringify(props.selectedTask, 'utf8', 2)}</Text> */}
        <TouchableWithoutFeedback onPress={() => setCustDataVis(!custDataVis)}>
          {custDataVis ? (
            <View style={viewStyles.card}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "#e9e9e9",
                  padding: 5,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <IconMat name="person-outline" size={19} />
                  <Text
                    style={{
                      color: "rgba(0, 0, 0, 1)",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Customer Data{" "}
                  </Text>
                </View>
                <IconIO name="ios-arrow-down" size={18} />
              </View>
              <View style={{ maxHeight: hp("30%"), marginTop: 20 }}>
                <View style={viewStyles.visible}>
                  <Text style={viewStyles.cardContent}>Customers</Text>
                  <Text style={{ width: wp("55%"), color: "rgba(0, 0, 0, 1)" }}>
                    {props.selectedInstrument.customer}
                  </Text>
                </View>
                <View style={viewStyles.visible}>
                  <Text style={viewStyles.cardContent}>Adresss</Text>
                  <Text style={{ width: wp("55%") }}>
                    {props.selectedInstrument.address}
                  </Text>
                </View>
                <View style={viewStyles.visible}>
                  <Text style={viewStyles.cardContent}>Phone</Text>
                  <Text style={{ width: wp("55%") }}>
                    {props.selectedInstrument.phone}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={viewStyles.card}>
              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <IconMat name="person-outline" size={19} />
                  <Text
                    style={{
                      color: "rgba(0, 0, 0, 1)",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Customer Data{" "}
                  </Text>
                </View>
                <IconIO name="ios-arrow-up" size={18} />
              </View>
            </View>
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => setInstrumentVis(!instrumentVis)}
        >
          {instrumentVis ? (
            <View style={viewStyles.card}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "#e9e9e9",
                  padding: 5,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <IconMatC name="chip" size={20} style={{ marginRight: 5 }} />
                  <Text
                    style={{
                      color: "rgba(0, 0, 0, 1)",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Instrument{" "}
                  </Text>
                </View>
                <IconIO name="ios-arrow-down" size={18} />
              </View>

              <View style={{ maxHeight: hp("30%"), marginTop: 20 }}>
                <View style={viewStyles.visible}>
                  <Text style={viewStyles.cardContent}>Merk</Text>
                  <Text style={{ width: wp("55%") }}>
                    {props.navigation.getParam("data").el.merk}
                  </Text>
                </View>
                <View style={viewStyles.visible}>
                  <Text style={viewStyles.cardContent}>Type</Text>
                  <Text style={{ width: wp("55%") }}>
                    {props.navigation.getParam("data").el.type}
                  </Text>
                </View>
                <View style={viewStyles.visible}>
                  <Text style={viewStyles.cardContent}>SN</Text>
                  <Text style={{ width: wp("55%") }}>
                    {props.navigation.getParam("data").el.sn}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={viewStyles.card}>
              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <IconMatC name="chip" size={20} style={{ marginRight: 5 }} />
                  <Text
                    style={{
                      color: "rgba(0, 0, 0, 1)",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Instrument{" "}
                  </Text>
                </View>
                <IconIO name="ios-arrow-up" size={18} />
              </View>
            </View>
          )}
        </TouchableWithoutFeedback>

        <View
          style={{
            ...viewStyles.card,
            padding: 0,
            marginBottom: margin ? 160 : 20,
          }}
        >
          <View
            style={{
              minHeight: hp("10%"),
              width: "100%",
              backgroundColor: "#45BFD9",
              padding: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <IconFontist
                name="clock"
                size={17}
                color="white"
                style={{ marginRight: 7, paddingLeft: 2, paddingTop: 2 }}
              />
              <Text
                style={{
                  marginBottom: 10,
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 14,
                }}
              >
                {" "}
                Requested Time
              </Text>
            </View>
            <View style={viewStyles.reqTime}>
              <View style={viewStyles.dateTime}>
                <Text style={{ color: "white" }}>Date</Text>
                <Text style={{ color: "white" }}>
                  {new Date(
                    props.selectedInstrument.requestTime
                  ).toLocaleDateString()}
                </Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  marginHorizontal: 20,
                  borderRightColor: "white",
                }}
              />
              <View style={viewStyles.dateTime}>
                <Text style={{ color: "white" }}>Time</Text>
                <Text style={{ color: "white" }}>
                  {new Date().toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
          {/* //starting */}
          <View
            style={{
              minHeight: hp("10%"),
              width: "100%",
              backgroundColor: "#fff",
              padding: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <IconFontist
                name="clock"
                size={13}
                color="#32DC5F"
                style={{ marginRight: 7, paddingLeft: 2, paddingTop: 4 }}
              />
              <Text
                style={{
                  marginBottom: 10,
                  fontWeight: "bold",
                  color: "#32DC5F",
                }}
              >
                {" "}
                Starting Time
              </Text>
            </View>
            <View style={viewStyles.reqTime}>
              {/* starting date */}
              <View style={viewStyles.dateTimeButton}>
                <Text style={{ color: "#353535" }}>Date</Text>
                <Text style={{ color: "#353535", fontWeight: "bold" }}>
                  {starting.date.toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  onPress={() => set("date", "start")}
                  style={viewStyles.picker}
                >
                  <IconFont
                    name={"cog"}
                    size={15}
                    style={{ color: "#4C7EF3" }}
                  />
                </TouchableOpacity>
              </View>
              {/* starting time */}
              <View
                style={{ marginHorizontal: 20, borderRightColor: "#353535" }}
              />
              <View style={viewStyles.dateTimeButton}>
                <Text style={{ color: "#353535" }}>Time</Text>
                <Text style={{ color: "#353535", fontWeight: "bold" }}>
                  {starting.time.toLocaleTimeString()}
                </Text>
                <TouchableOpacity
                  onPress={() => set("time", "start")}
                  style={viewStyles.picker}
                >
                  <IconFont
                    name={"cog"}
                    size={15}
                    style={{ color: "#4C7EF3" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* finish */}
          <View
            style={{
              minHeight: hp("10%"),
              width: "100%",
              backgroundColor: "#fff",
              padding: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <IconFontist
                name="clock"
                size={13}
                color="#F27284"
                style={{ marginRight: 7, paddingLeft: 2, paddingTop: 4 }}
              />
              <Text
                style={{
                  marginBottom: 10,
                  fontWeight: "bold",
                  color: "#F27284",
                }}
              >
                {" "}
                Finish Time
              </Text>
            </View>
            <View style={viewStyles.reqTime}>
              {/* finish date */}
              <View style={viewStyles.dateTimeButton}>
                <Text style={{ color: "#353535" }}>Date</Text>
                <Text style={{ color: "#353535", fontWeight: "bold" }}>
                  {finish.date.toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  onPress={() => set("date", "finish")}
                  style={viewStyles.picker}
                >
                  <IconFont
                    name={"cog"}
                    size={15}
                    style={{ color: "#4C7EF3" }}
                  />
                </TouchableOpacity>
              </View>
              {/* finish time */}
              <View
                style={{ marginHorizontal: 20, borderRightColor: "#353535" }}
              />
              <View style={viewStyles.dateTimeButton}>
                <Text style={{ color: "#353535" }}>Time</Text>
                <Text style={{ color: "#353535", fontWeight: "bold" }}>
                  {finish.time.toLocaleTimeString()}
                </Text>
                <TouchableOpacity
                  onPress={() => set("time", "finish")}
                  style={viewStyles.picker}
                >
                  <IconFont
                    name={"cog"}
                    size={15}
                    style={{ color: "#4C7EF3" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              minHeight: hp("5%"),
              alignItems: "center",
              width: "100%",
              backgroundColor: "#fff",
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* labor time */}
            <View style={{ flexDirection: "row" }}>
              <IconFontist
                name="clock"
                size={13}
                color="#272b28"
                style={{ marginRight: 7, paddingLeft: 2, paddingTop: 4 }}
              />
              <Text style={{ fontWeight: "bold" }}> Labor Time</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: wp("6%"),
              }}
            >
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 2,
                  padding: 0,
                  height: 20,
                  width: wp("10%"),
                  paddingHorizontal: 5,
                  marginRight: 5,
                  borderColor: "rgba(158, 150, 150, .5)",
                }}
                onFocus={() => setMargin(!margin)}
                onEndEditing={() => setMargin(!margin)}
                keyboardType={"number-pad"}
                onChangeText={(text) => setLaborTime(text)}
                value={laborTime}
                placeholder={"0"}
              />
              <Text>Hour</Text>
            </View>
          </View>
          <View
            style={{
              minHeight: hp("5%"),
              alignItems: "center",
              width: "100%",
              backgroundColor: "#fff",
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* travel time */}
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <IconFontist
                name="clock"
                size={13}
                color="#272b28"
                style={{ marginRight: 7, paddingLeft: 2, paddingTop: 4 }}
              />
              <Text style={{ fontWeight: "bold" }}> Travel Time</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: wp("6%"),
              }}
            >
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 2,
                  padding: 0,
                  height: 20,
                  width: wp("10%"),
                  paddingHorizontal: 5,
                  marginRight: 5,
                  borderColor: "rgba(158, 150, 150, .5)",
                }}
                onFocus={() => setMargin(!margin)}
                onEndEditing={() => setMargin(!margin)}
                keyboardType={"number-pad"}
                onChangeText={(text) => setTravelTime(text)}
                value={travelTime}
                placeholder={"0"}
              />
              <Text>Hour</Text>
            </View>
          </View>
        </View>
        {showDateStart && (
          <DateTimePicker
            value={starting.date}
            mode={mode}
            minimumDate={new Date(props.selectedInstrument.requestTime)}
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              // console.log(date, 'ini datenya yang dari date ')
              setShowDateS(false);
              setStarting({ ...starting, date: date || new Date() });
              setFinish({ ...finish, date: date || new Date() });
            }}
          />
        )}
        {showTimeStart && (
          <DateTimePicker
            value={starting.time}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              // console.log(event, 'ini eventnya')
              // console.log(date, 'ini datenya yang dari time')
              setShowTimeS(false);
              setStarting({ ...starting, time: date || new Date() });
            }}
          />
        )}
        {showDateFinish && (
          <DateTimePicker
            value={finish.date}
            mode={mode}
            is24Hour={true}
            display="default"
            minimumDate={starting.date}
            onChange={(event, date) => {
              // console.log(date, 'ini datenya yang dari date ')
              setShowDateF(false);
              setFinish({ ...finish, date: date || new Date() });
            }}
          />
        )}
        {showTimeFinish && (
          <DateTimePicker
            value={finish.time}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              // console.log(event, 'ini eventnya')
              // console.log(date, 'ini datenya yang dari time')
              setShowTimeF(false);
              setFinish({ ...finish, time: date || new Date() });
            }}
          />
        )}
      </ScrollView>
      <View style={viewStyles.footer}>
        <TouchableOpacity
          onPress={() => {
            next();
          }}
        >
          <Text style={textStyles.next}> NEXT </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const viewStyles = StyleSheet.create({
  container: {
    paddingTop: hp("9%"),
    minHeight: hp("100%"),
    flex: 1,
    justifyContent: "flex-start",
  },
  card: {
    minHeight: hp("7%"),
    backgroundColor: "white",
    marginVertical: 7,
    marginHorizontal: 10,
    borderRadius: 3,
    marginBottom: 20,
    padding: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  visible: {
    flexDirection: "row",
    margin: 3,
  },
  headerExtend: {
    backgroundColor: "#4052ae",
    position: "absolute",
    top: hp("10%"),
    zIndex: 0,
    height: hp("6%"),
    width: wp("100%"),
  },
  reqTime: {
    flexDirection: "row",
  },
  dateTime: {
    flexDirection: "row",
    width: wp("25%"),
    justifyContent: "space-between",
    marginHorizontal: 2,
  },
  dateTimeButton: {
    flexDirection: "row",
    width: wp("35%"),
    justifyContent: "space-between",
    marginHorizontal: 2,
    borderRadius: 6,
  },
  footer: {
    height: hp("10%"),
    width: wp("100%"),
    backgroundColor: "#e6e6e6",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    justifyContent: "center",
    marginTop: 15,
    padding: 30,
    marginBottom: 20,
    zIndex: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  cardContent: {
    marginRight: wp("5%"),
    width: wp("20%"),
    color: "rgba(0, 0, 0, 0.4)",
  },
  picker: {
    height: 20,
    width: 20,
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
  //   fetchData
  setReportService,
};

export default connect(mapStateToProps, mapDispatchToProps)(serviceReportForm);
