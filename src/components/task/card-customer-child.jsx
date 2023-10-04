import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import IconOct from "react-native-vector-icons/Octicons";
import IconEnt from "react-native-vector-icons/Entypo";
import IconAnt from "react-native-vector-icons/AntDesign";
import Popover from "react-native-popover-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  setSelectedInstrument,
  setReportService,
  initServiceReport,
  printPDF,
  downloadPDF,
} from "../../stores/action";

import Checker from "../home/checker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setSelectedInstrument,
  setReportService,
  initServiceReport,
  printPDF,
  downloadPDF,
};

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const cardStatus = (props) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [modalParts, setModalParts] = useState(false);
  const [modalSaveParts, setModalSaveParts] = useState(false);
  const [alreadyWrite, setAlredyWrite] = useState(false);
  const [alreadyChecked, setAlreadyChecked] = useState(false);
  const [status, setStatus] = useState("4");
  const [partInstrument, setInstrument] = useState([]); //master part instrument
  const [selectedPart, setSelectedPart] = useState([]);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    thePart();
    getPart();
  }, [props.trigger]);

  useEffect(() => {
    // console.log('INI KEPANGGIL')
    checkID();
  }, [props.report, props.checklist, props.serviceReport, props.trigger]);

  //select master part that collected from server
  const thePart = () => {
    // console.log('thepart terpanggil')
    let result = [];
    props.selectedTask.part.detail.forEach((element) => {
      result.push({
        idInstrument: props.el.idInstrument,
        idPart: element.idMaterial,
        idServiceT: props.idService,
        qty: 0,
        useDate: null,
        name: element.part,
        checked: false,
        maxCap: element.qty_approval,
        price: element.price,
      });
    });
    setInstrument(result);
  };

  //function to define selected part from selected popup modal
  const _selectPart = (value) => {
    // console.log('_selectpart terpanggil')
    let data = partInstrument;
    let index = data.findIndex((el) => el.name === value.name);
    data[index].checked = value.checked;
    // console.log('ini data nya loohh',data)
    setSelectedPart(data);
    // setInstrument(data)
  };

  //function to take part selected on each instrument
  async function getPart() {
    // console.log('getpart terpanggil')
    try {
      let partFromStorage = await AsyncStorage.getItem(
        `selectedPart-${props.selectedTask.idTask}-${props.idService}`
      );
      if (partFromStorage !== null) {
        // console.log('partFromStorage :',JSON.parse(partFromStorage))
        setSelectedPart(JSON.parse(partFromStorage));
        // setAsync(JSON.parse(partFromStorage))
      }
    } catch (error) {
      console.log("error");
    }
  }

  //accept and set selected part to asyncstorage
  const _pushPart = () => {
    // console.log('_pushpart terpanggil')
    let temp = [];
    partInstrument.forEach(async (el, index) => {
      // console.log('ini adalah elnya',el)
      if (el.checked) {
        temp.push(el);
      }
    });
    setSelectedPart(temp);
    AsyncStorage.setItem(
      `selectedPart-${props.selectedTask.idTask}-${props.idService}`,
      JSON.stringify(temp)
    );
  };

  //function to check if all instrument is reported and checklisted
  function checkID() {
    // console.log(props.checklist, 'INI CHECKLISTNYS')
    if (props.report) {
      props.report.forEach((el) => {
        if (el.idService == props.idService) {
          // console.log('ini ke true2222', el.idService);
          // console.log((el.status, 'ini statusnya'));
          setStatus(el.status);
          setAlredyWrite(true);
        }
      });
    }
    if (props.checklist) {
      props.checklist.forEach((el) => {
        console.log("ini props", props.idService);
        if (el.idService == props.idService) {
          // console.log('ini ke true', el.idService);
          setAlreadyChecked(true);
        }
      });
    }
  }

  //function to check stock,every time rendered masterstock will always synchorized with reported stock, so that number of total part that brought will always same quantity.
  function checkStock() {
    selectedPart.forEach((elSelected) => {
      partInstrument.forEach((elPart) => {
        if (elSelected.idPart === elPart.idPart) {
          // console.log('ini max cap dari elpart atau part instrument',elPart.maxCap)
          elSelected.maxCap = elPart.maxCap;
        }
      });
    });

    // console.log('ini selectedpartnya: ',selectedPart)
    let found = props.report.find((el) => {
      return el.idService == props.idService;
    });

    // console.log('ini foundnya',found)
    let selectedTempPart = [];
    if (found) {
      // console.log('disini : found')
      selectedPart.forEach((elSelected) => {
        found.part.forEach((elReport) => {
          // console.log(elSelected.idPart ,'<== selectedpart id, report part id ==>', elReport.idPart)
          if (elSelected.idPart === elReport.idPart) {
            // console.log('ini elreportnya')
            // elSelected = {...elReport, maxCap : elSelected.maxCap}
            elSelected = {
              ...elReport,
              maxCap: elSelected.maxCap + elSelected.qty,
            };
            elSelected.pastQty = elSelected.qty;

            // elSelected = {...elReport,maxCap: 7 }
            // console.log('ini el report : ',elReport)
            // console.log('---===---')
            // console.log('ini el selected : ',elSelected)
          }
        });
        selectedTempPart.push(elSelected);
      });
    } else {
      // console.log('disiini : notfound')
      selectedPart.forEach((elSelected) => {
        // console.log('ini elselectednya', elSelected)
        selectedTempPart.push({ ...elSelected, pastQty: elSelected.qty });
      });
    }

    // console.log('ini selected temp partnya : ', selectedTempPart)
    // console.log('ini selectedpartnya : ', selectedPart)
    AsyncStorage.setItem(
      `selectedPart-${props.selectedTask.idTask}-${props.idService}`,
      JSON.stringify(selectedTempPart)
    );
  }

  async function redirToReport() {
    // console.log(props.serviceReport, ' ini service report datri reducer~~')
    // console.log(props.idService,' ini dari card-customer-child')
    // console.log(props.report,' ini dari card-customer-child')
    // console.log(props.serviceNumber,' ini dari card-customer-child')
    // console.log('ini requesttime', props.requestTime)
    checkStock();
    setPopoverVisible(!popoverVisible);
    props.setSelectedInstrument({
      data: props.el,
      customer: props.customer,
      phone: props.phone,
      address: props.address,
      parts: partInstrument,
      report: props.report,
      serviceNumber: props.serviceNumber,
      requestTime: props.requestTime,
    });
    try {
      let found = props.selectedTask.part.report.find(
        (el) => el.idService === props.idService
      );
      found.status = "4";
      await props.initServiceReport(found);
      await props.setReportService("idService", props.idService);
      await props.setReportService("serviceReportNumber", props.serviceNumber);
      // console.log('disini')
      props.nav.navigate("TaskReport", {
        data: { el: props.el, customer: props.customer },
      });
    } catch (error) {
      console.error(error, "ini erornya");
    }
  }

  function redirToChecklist() {
    setPopoverVisible(!popoverVisible);
    props.setSelectedInstrument({
      data: props.el,
      customer: props.customer,
      report: props.report,
      parts: partInstrument,
      nomer: props.nomer,
    });
    let customer = {
      idService: props.idService,
      customerId: props.idCustomer,
      customerName: props.customer,
    };
    // console.log('ini yang dikirim ke checklist page',props.el.checklistInstrument)
    props.nav.navigate("ChecklistFormScreen", {
      data: props.el,
      customer,
      nomer: props.nomer,
    });
  }

  async function download() {
    setPopoverVisible(!popoverVisible);
    setUpload(true);
    try {
      // console.log('[TRY]', props.serviceReport.instrumentSign)
      let hasil = await props.downloadPDF(props.idService, props.customer);
      // console.log('[ PROPS ][ idService ]',props.idService)
      // console.log('[ PROPS ][ selectedInstrument ] [ customer ]',props.customer)
      // FileViewer.open(hasil);
      setUpload(false);
    } catch (error) {
      setUpload(false);
      Alert.alert("Error", "Network error.");
      console.error(error);
    }
  }
  return (
    <View>
      <View
        style={{
          ...styles.container,
          backgroundColor: "rgba(154, 158, 180, 0.22)",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: "4%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {alreadyChecked && alreadyWrite ? (
            <IconAnt
              name="checkcircle"
              color={status === "4" ? "#31C149" : "#F9A602"}
              backgroundColor="transparent"
              size={17}
              style={{ marginRight: "5%", alignSelf: "center" }}
            />
          ) : (
            // <IconOct
            //   name="primitive-dot"
            //   color="rgba(112, 112, 112, 0.53)"
            //   backgroundColor="transparent"
            //   size={30}
            //   style={{ marginRight: '5%', alignSelf: 'center' }}
            // />
            <IconAnt
              name="checkcircle"
              color={status === "4" ? "#31C149" : "#F9A602"}
              backgroundColor="transparent"
              size={17}
              style={{ marginRight: "5%", alignSelf: "center" }}
            />
          )}
          <View>
            <Text
              style={{
                ...textStyles.title,
                textTransform: "capitalize",
                color:
                  alreadyChecked && alreadyWrite && status === "4"
                    ? "#31C149"
                    : alreadyChecked && alreadyWrite && status === "6"
                    ? "#F9A602"
                    : "#000000C4",
              }}
            >
              Merk : {props.el.merk}
            </Text>
            <Text
              style={{
                ...textStyles.title,
                textTransform: "capitalize",
                color:
                  alreadyChecked && alreadyWrite && status === "4"
                    ? "#31C149"
                    : alreadyChecked && alreadyWrite && status === "6"
                    ? "#F9A602"
                    : "#000000C4",
              }}
            >
              Type : {props.el.type}
            </Text>
            <Text
              style={{
                ...textStyles.title,
                textTransform: "capitalize",
                color:
                  alreadyChecked && alreadyWrite && status === "4"
                    ? "#31C149"
                    : alreadyChecked && alreadyWrite && status === "6"
                    ? "#F9A602"
                    : "#000000C4",
              }}
            >
              Serial Number : {props.el.sn}
            </Text>
          </View>
        </View>

        {status == "6" && (
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#F9A602",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              P
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={() => setPopoverVisible(!popoverVisible)}
        >
          <IconEnt
            name="dots-three-vertical"
            color="rgba(0, 0, 0, 1)"
            backgroundColor="transparent"
            size={22}
          />
        </TouchableOpacity>
        <Popover
          isVisible={popoverVisible}
          // debug={true}
          // onCloseComplete={() => console.log('berhasil dengan baik')}>
          onRequestClose={() => setPopoverVisible(false)}
        >
          <View
            style={{
              width: wp("40%"),
              height: hp("18%"),
              justifyContent: "space-evenly",
              padding: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setPopoverVisible(!popoverVisible);
                setModalParts(!modalParts);
              }}
            >
              <Text style={{ fontSize: 16, padding: 8 }}>Select Part</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => redirToChecklist()}>
              <Text
                style={{
                  fontSize: 16,
                  padding: 8,
                  color: alreadyChecked ? "green" : "black",
                }}
              >
                Checklist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                redirToReport();
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  padding: 8,
                  color: alreadyWrite ? "green" : "black",
                }}
              >
                Report
              </Text>
            </TouchableOpacity>
            {alreadyWrite && (
              <TouchableOpacity
                onPress={() => {
                  download();
                }}
              >
                <Text style={{ fontSize: 16, padding: 8 }}>
                  Download Report
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Popover>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalParts}
          onRequestClose={() => {
            setModalParts(!modalParts);
          }}
        >
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              backgroundColor: "rgba(100,100,100, 0.5)",
              padding: 20,
            }}
          >
            <View
              style={{
                width: wp("80%"),
                height: hp("50%"),
                backgroundColor: "#fff",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "black",
                  borderBottomWidth: 0.6,
                  borderStyle: "solid",
                  flex: 1,
                  width: "100%",
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    SELECT PART ({props.el.merk})
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flex: 4,
                  width: "100%",
                }}
              >
                <ScrollView>
                  {partInstrument.map((el, i) => {
                    return (
                      <Checker key={i} data={el} selectPart={_selectPart} />
                    );
                  })}
                </ScrollView>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  paddingRight: 20,
                }}
              >
                <TouchableOpacity onPress={() => setModalParts(!modalParts)}>
                  <Text
                    style={{
                      color: "rgba(41, 155, 232, 1)",
                      fontWeight: "bold",
                    }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <View style={{ margin: 20 }} />
                <TouchableOpacity
                  onPress={() => {
                    setModalSaveParts(!modalSaveParts);
                    setModalParts(!modalParts);
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(41, 155, 232, 1)",
                      fontWeight: "bold",
                    }}
                  >
                    DONE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalSaveParts}
          onRequestClose={() => {
            setModalSaveParts(!modalSaveParts);
          }}
        >
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              backgroundColor: "rgba(100,100,100, 0.5)",
              padding: 20,
            }}
          >
            <View
              style={{
                width: wp("70%"),
                height: hp("25%"),
                backgroundColor: "#fff",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  width: "100%",
                  paddingLeft: "5%",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}
                >
                  Save Part?
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                    fontWeight: "bold",
                  }}
                >
                  All Part will be installed
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  paddingRight: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalSaveParts(!modalSaveParts)}
                >
                  <Text style={{ color: "#299BE8", fontWeight: "bold" }}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <View style={{ margin: 20 }} />
                <TouchableOpacity
                  onPress={() => {
                    setModalSaveParts(!modalSaveParts);
                    _pushPart();
                  }}
                >
                  <Text style={{ color: "#299BE8", fontWeight: "bold" }}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="none" transparent={true} visible={upload}>
          <View
            style={{
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
              opacity: 0.5,
            }}
          >
            <ActivityIndicator size="large" color="#37ed26" />
            <Text
              style={{
                color: "white",
                marginTop: 10,
              }}
            >
              {" "}
              Downloading...{" "}
            </Text>
          </View>
        </Modal>
      </View>
      {selectedPart.length !== 0 &&
        selectedPart.map((el, i) => {
          return (
            <View
              key={i}
              style={{
                ...styles.container,
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: "rgba(84, 174, 188, 0.14)",
              }}
            >
              <View>
                <Text
                  style={{ ...textStyles.title, textTransform: "capitalize" }}
                >
                  {el.name}
                </Text>
              </View>
            </View>
          );
        })}
      {/* <Text>{JSON.stringify(selectedPart, 'utf8',2)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: dimHeight * 0.09,
    width: "95%",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderRadius: 1,
    shadowOpacity: 0.61,
    shadowRadius: 1,
    elevation: 1,
    alignSelf: "center",
    marginBottom: 10,
    padding: 10,
  },
  date: {
    flexDirection: "row",
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(cardStatus);
