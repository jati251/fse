import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
  ToastAndroid,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import IconMi from "react-native-vector-icons/MaterialIcons";
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconIO from "react-native-vector-icons/Ionicons";
import IconPrint from "react-native-vector-icons/AntDesign";
import SignatureCapture from "react-native-signature-capture";
import { connect } from "react-redux";
import {
  setImage,
  setReportService,
  trigger,
  printPDF,
  readjustMaxCap,
  refresh_selectedTask,
  donePerService,
} from "../../stores/action";
const RNFS = require("react-native-fs");

import Header from "../../components/home/header";
import { ScrollView } from "react-native-gesture-handler";
import CameraScreen from "../../components/camera/test_camera";
import AsyncStorage from "@react-native-community/async-storage";
import RNBackgroundDownloader from "react-native-background-downloader";
import FileViewer from "react-native-file-viewer";

const ServiceEngineer = (props) => {
  // console.log('masuk ke serviceEngginer.js')
  // console.log('ini serveice reportnya', props.serviceReport)
  const sign = useRef(null);
  const sign2 = useRef(null);
  const [modalDone, setModalDone] = useState(false);
  const [modalCetak, setModalCetak] = useState(false);
  const [engineer, setEngineer] = useState(true);
  const [customer, setCustomer] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [modalVisible, setModalVisibe] = useState(false);
  const [whosOn, setWhosOn] = useState({
    customer: false,
    engineer: false,
  });
  const [reportSign, setReportSign] = useState({
    engineerSign: "",
    customerSign: "",
    customerName: "",
    customerSignTypeFile: null,
    engineerSignTypeFile: null,
  });
  const [dataModal, setDataModal] = useState(false);
  const [downloadFlag, setDownloadFlag] = useState({
    progress: 0,
    loading: false,
  });
  const [upload, setUpload] = useState(false); //untuk flagging loading pas upload report dan nunggu balikan buat print cetak pdf

  //function
  const setShowImage = function (uri) {
    if (whosOn.customer) {
      setImage2(uri);
      // image2 = uri
    } else if (whosOn.engineer) {
      setImage1(uri);
      // image1 = uri
    }
    setWhosOn({ customer: false, engineer: false });
  };

  const saveSign = function () {
    sign.current.saveImage();
    // setEngineer(!engineer)
  };

  const resetSign = function () {
    sign.current.resetImage();
  };

  const saveSign2 = function () {
    sign2.current.saveImage();
    // setEngineer(!customer)
  };

  const resetSign2 = function () {
    sign2.current.resetImage();
  };

  const _onSaveEvent = function (result, who) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    const base64String = `${result.encoded}`;
    // console.log(base64String, 'ini dia');
    // console.log('ini dari onssave event',result.pathName);
    saveToReport(base64String, who, "png");
  };

  const _onDragEvent = function () {
    // This callback will be called when the user enters signature
    console.log("dragged");
  };

  const getBase64 = async (param, who) => {
    // console.log('ini param yang masuknya', param)
    let data = await RNFS.readFile(param, "base64");
    const base64String = `${data}`;

    let type = param.split(".");

    // console.log(type, 'ini typenyarnr')
    // console.log(base64String)
    // console.log('ini data base nyaa coki2 ');
    // console.log('ini data base 64nyaa', data);
    saveToReport(base64String, who, type[type.length - 1]);
  };

  function saveToReport(base64, who, type) {
    // console.log('ini base64nya mau di report', base64)
    // console.log('ini kepada siapa mau disimpan', who)
    // console.log('ini typenya', type)
    if (who === "engineer") {
      setReportSign({
        ...reportSign,
        engineerSignTypeFile: type,
        customerName: props.selectedInstrument.customer,
        engineerSign: base64,
      });
      setEngineer(!engineer);
    } else if (who === "customer") {
      setReportSign({
        ...reportSign,
        customerSignTypeFile: type,
        customerName: props.selectedInstrument.customer,
        customerSign: base64,
      });
      setCustomer(!customer);
    } else {
      console.log("mo ngapain sihh luu~~");
    }
    // console.log('ini lhooo',reportSign.customerSignTypeFile)
  }

  function showAlert() {
    Alert.alert(
      "Save Report",
      "Your report will be saved",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel",
        },
        ,
        { text: "Save", onPress: () => done() },
      ],
      { cancelable: false }
    );
  }

  async function cetak() {
    try {
      await props.setReportService("instrumentSign", reportSign);
      // console.log('ini id service',props.serviceReport.idService)
      // console.log('ini id task',props.selectedTask.idTask)
      let toAsync = {
        ...props.serviceReport,
        instrumentSign: reportSign,
      };
      setDataModal(toAsync);
      setModalCetak(!modalCetak);
      // await console.log('ini masuk')
      // await console.log('ini service reportnya broohh',props.serviceReport)
    } catch (error) {
      console.log(error);
    }
  }

  async function print(data) {
    setUpload(true);
    try {
      // console.log('masuk disiini dulu')
      // console.log('[ PROPS ][ SELECTED INSTRUMENT ][ CUSTOMER ]',props.selectedInstrument.customer)
      let hasil = await props.printPDF(
        {
          ...props.serviceReport,
          idTask: props.selectedTask.idTask,
          instrumentSign: reportSign,
        },
        props.selectedInstrument.customer
      );
      // console.log('ini adalah asil balikan',hasil)
      if (hasil) {
        FileViewer.open(hasil);
      }
      setUpload(false);
    } catch (error) {
      setUpload(false);
      Alert.alert("Error", error);
    }
  }

  async function done() {
    try {
      await props.setReportService("instrumentSign", reportSign);

      await props.donePerService(
        {
          ...props.serviceReport,
          idTask: props.selectedTask.idTask,
          instrumentSign: reportSign,
        },
        props.selectedInstrument.customer
      );
      // console.log(
      //   JSON.stringify(
      //     {
      //       ...props.serviceReport,
      //       idTask: props.selectedTask.idTask,
      //       instrumentSign: reportSign,
      //     },
      //     props.selectedInstrument.customer,
      //   ),
      // );
      // console.log('ini id service',props.serviceReport.idService)
      // console.log('ini id task',props.selectedTask.idTask)
      props.readjustMaxCap(props.selectedTask.idTask, props.serviceReport.part);
      let toAsync = {
        ...props.serviceReport,
        instrumentSign: reportSign,
      };
      await AsyncStorage.setItem(
        `instrumentReport-${props.selectedTask.idTask}-${props.serviceReport.idService}`,
        JSON.stringify(toAsync)
      );
      await props.refresh_selectedTask({
        selectedTask: props.selectedTask,
        reportPart: props.serviceReport.part,
        idService: props.serviceReport.idService,
      });
      await props.trigger();
      await props.navigation.navigate("Task", { date: new Date() });
      // console.log(reportSign)
    } catch (error) {
      console.error(error);
      // console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={viewStyles.container}
      behaviour={("padding", "position")}
      enabled
    >
      <Header navigation={props.navigation} title={"Service Report Form"} />
      <Modal animationType="none" transparent={true} visible={props.isLoading}>
        <View style={viewStyles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      </Modal>
      <View style={viewStyles.content}>
        <View style={viewStyles.headerExtend} />
        <ScrollView>
          <TouchableOpacity
            onPress={() => setEngineer(!engineer)}
            style={viewStyles.engineerCard}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={viewStyles.photo}>
                <IconMi name="person-outline" size={25} color="white" />
              </View>
              <View style={viewStyles.nametitle}>
                <Text>Service Engineer</Text>
                {/* <Text>{JSON.stringify(props.loggedUser)}</Text> */}
                <Text style={{ textTransform: "capitalize", color: "gray" }}>
                  {props.loggedUser.first_name +
                    " " +
                    props.loggedUser.last_name}
                </Text>
              </View>
            </View>
            {engineer ? (
              <IconIO name="ios-arrow-down" size={18} />
            ) : (
              <IconIO name="ios-arrow-up" size={18} />
            )}
          </TouchableOpacity>
          {engineer && (
            <View style={viewStyles.signContent}>
              <View style={viewStyles.titleContent}>
                <Text>Your Signature</Text>
                <Text>
                  {new Date().toLocaleTimeString() +
                    " - " +
                    new Date().toLocaleDateString()}
                </Text>
              </View>
              <View style={viewStyles.toSign}>
                {image1 == null && (
                  <SignatureCapture
                    style={[{ flex: 1 }, viewStyles.signature]}
                    ref={sign}
                    onSaveEvent={(sign) => _onSaveEvent(sign, "engineer")}
                    onDragEvent={_onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}
                  />
                )}
                {image1 != null && (
                  <Image style={{ flex: 1 }} source={{ uri: image1 }} />
                )}
              </View>
              {image1 == null && (
                <TouchableOpacity
                  onPress={() => {
                    resetSign();
                  }}
                  style={viewStyles.simpan}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
              )}
              {image1 == null && (
                <TouchableOpacity
                  onPress={() => {
                    saveSign();
                    ToastAndroid.show("Data saved", ToastAndroid.BOTTOM);
                    // setCustomer(!customer)
                  }}
                  style={viewStyles.simpan}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              )}
              {image1 != null && (
                <TouchableOpacity
                  onPress={() => getBase64(image1, "engineer")}
                  style={viewStyles.simpan}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              )}
              <View style={{ paddingVertical: 8 }}>
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  Or
                </Text>
              </View>
              {image1 == null && (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisibe(true);
                    setWhosOn({
                      customer: false,
                      engineer: true,
                    });
                  }}
                  style={viewStyles.ambil}
                >
                  <IconMi name={"add-a-photo"} size={25} color={"#1C87D8"} />
                  <Text
                    style={{
                      padding: 20,
                      color: "rgba(28, 135, 216, 1)",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Take Photo
                  </Text>
                </TouchableOpacity>
              )}
              {image1 != null && (
                <TouchableOpacity
                  onPress={() => {
                    setImage1(null);
                  }}
                  style={viewStyles.ambil}
                >
                  <IconFA name={"signature"} size={25} color={"#1C87D8"} />
                  <Text
                    style={{
                      padding: 20,
                      color: "rgba(28, 135, 216, 1)",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Signature
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <TouchableOpacity
            onPress={() => setCustomer(!customer)}
            style={
              customer
                ? viewStyles.customerCard
                : { ...viewStyles.customerCard, marginBottom: 20 }
            }
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={viewStyles.photo}>
                <IconMi name="person-outline" size={25} color="white" />
              </View>
              <View style={viewStyles.nametitle}>
                <Text>Customer</Text>
                <Text style={{ textTransform: "capitalize", color: "gray" }}>
                  {props.selectedInstrument.customer}
                </Text>
              </View>
            </View>
            {customer ? (
              <IconIO name="ios-arrow-down" size={18} />
            ) : (
              <IconIO name="ios-arrow-up" size={18} />
            )}
          </TouchableOpacity>
          {customer && (
            <View style={viewStyles.signContent}>
              <View style={viewStyles.titleContent}>
                <Text>Your Signature</Text>
                <Text>
                  {new Date().toLocaleTimeString() +
                    " - " +
                    new Date().toLocaleDateString()}
                </Text>
              </View>
              <View style={viewStyles.toSign}>
                {image2 == null && (
                  <SignatureCapture
                    style={[{ flex: 1 }, viewStyles.signature]}
                    ref={sign2}
                    onSaveEvent={(sign) => _onSaveEvent(sign, "customer")}
                    onDragEvent={_onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}
                  />
                )}
                {image2 != null && (
                  <Image style={{ flex: 1 }} source={{ uri: image2 }} />
                )}
              </View>
              {image2 == null && (
                <TouchableOpacity
                  onPress={() => {
                    resetSign2();
                  }}
                  style={viewStyles.simpan}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
              )}
              {image2 == null && (
                <TouchableOpacity
                  onPress={() => {
                    saveSign2();
                    // setEngineer(!engineer)
                    // setCustomer(!customer)
                    // setEngineer(!engineer)
                    ToastAndroid.show("Data saved", ToastAndroid.BOTTOM);
                  }}
                  style={viewStyles.simpan}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              )}
              {image2 != null && (
                <TouchableOpacity
                  onPress={() => getBase64(image2, "customer")}
                  style={viewStyles.simpan}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              )}
              <View style={{ paddingVertical: 8 }}>
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  Or
                </Text>
              </View>
              {image2 == null && (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisibe(true);
                    setWhosOn({
                      customer: true,
                      engineer: false,
                    });
                  }}
                  style={viewStyles.ambil}
                >
                  <IconMi name={"add-a-photo"} size={25} color={"#1C87D8"} />
                  <Text
                    style={{
                      padding: 20,
                      color: "rgba(28, 135, 216, 1)",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Take Photo
                  </Text>
                </TouchableOpacity>
              )}
              {image2 != null && (
                <TouchableOpacity
                  onPress={() => {
                    setImage2(null);
                  }}
                  style={viewStyles.ambil}
                >
                  <IconFA name={"signature"} size={25} color={"#1C87D8"} />
                  <Text
                    style={{
                      padding: 20,
                      color: "rgba(28, 135, 216, 1)",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Signature
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisibe(!modalVisible);
            setWhosOn({
              customer: false,
              engineer: false,
            });
          }}
        >
          <CameraScreen
            setModalVisibe={setModalVisibe}
            setShowImage={setShowImage}
          />
        </Modal>
      </View>
      {upload ? (
        <View style={{ ...viewStyles.print, backgroundColor: "#a8a8a8" }}>
          <ActivityIndicator size="small" color="#2df723" />
        </View>
      ) : (
        <TouchableOpacity
          style={viewStyles.print}
          onPress={() => print("ini yang dikirim")}
        >
          <IconPrint name={"printer"} size={25} color={"#ffff"} />
          <Text style={viewStyles.printText}>PRINT</Text>
        </TouchableOpacity>
      )}
      <View style={viewStyles.bottomBar}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={textStyles.next}>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showAlert()}>
          <Text style={textStyles.next}>DONE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    paddingTop: hp("10%"),
    height: hp("97%"),
    flex: 1,
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#606070",
    opacity: 0.5,
  },
  signature: {
    flex: 1,
    borderColor: "#000033",
    borderWidth: 0.5,
  },
  content: {
    flex: 7,
    paddingHorizontal: 10,
  },
  bottomBar: {
    backgroundColor: "#e6e6e6",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerExtend: {
    backgroundColor: "#4052ae",
    position: "absolute",
    // top: hp('20%'),
    zIndex: 0,
    height: hp("8%"),
    width: wp("100%"),
  },
  engineerCard: {
    // borderWidth: 1,
    minHeight: hp("10%"),
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customerCard: {
    // borderWidth: 1,
    minHeight: hp("10%"),
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginBottom: 20,
    marginTop: 20,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgba(79, 188, 236, 1)",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signContent: {
    minHeight: hp("40%"),
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "grey",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContent: {
    height: 40,
    width: "89%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  toSign: {
    width: "92%",
    height: hp("25%"),
    backgroundColor: "#e9e9e9",
    borderRadius: 3,
    marginVertical: 5,
  },
  simpan: {
    backgroundColor: "#1C87D8",
    height: 48,
    width: "92%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 3,
  },
  ambil: {
    height: 48,
    width: "92%",
    borderWidth: 2,
    borderColor: "#1C87D8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 3,
  },
  print: {
    height: 48,
    width: "97%",
    backgroundColor: "#1C87D8",
    // borderWidth: 2,
    // borderColor: '#1C87D8',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 3,
  },
  printText: {
    padding: 20,
    color: "#ffff",
    fontSize: 16,
    fontWeight: "bold",
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
  setImage,
  setReportService,
  trigger,
  printPDF,
  readjustMaxCap,
  refresh_selectedTask,
  donePerService,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEngineer);
