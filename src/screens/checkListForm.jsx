//tidak dipakai yang ini

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Group from "../components/checklist/_group";
import Header from "../components/home/header";
import { trigger } from "../stores/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  trigger,
};

const checkListForm = (props) => {
  // console.log(props.navigation.getParam('customer').idService, 'ini di Service dari from')

  const [wanted, setWanted] = useState(null);
  const [checkData, setCheckData] = useState(null);
  const [group, setGroup] = useState(false);
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState("");
  const [modalDone, setModalDone] = useState(false);

  useEffect(() => {
    dataWanted(props.navigation.getParam("data"));
  }, [props.navigation.getParam("data")]);

  useEffect(() => {
    // AsyncStorage.removeItem(`checklist-history`)
    _getHistory();
  }, []);

  async function _getHistory() {
    // console.log('ini kepanggil cuk')
    try {
      let hist = await AsyncStorage.getItem("checklist-history");
      // console.log('inihistorynya',JSON.parse(hist))
      if (hist !== null) {
        setHistory(JSON.parse(hist));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const dataWanted = (data) => {
    let dataWanted = {};
    data.checklistInstrument.forEach((element) => {
      if (!dataWanted[element.GroupCheck]) {
        dataWanted[element.GroupCheck] = {};
        if (!dataWanted[element.GroupCheck][element.HeadcheckItemName]) {
          dataWanted[element.GroupCheck][element.HeadcheckItemName] =
            element.parentCheckItem;
        }
      } else {
        if (!dataWanted[element.GroupCheck][element.HeadcheckItemName]) {
          dataWanted[element.GroupCheck][element.HeadcheckItemName] =
            element.parentCheckItem;
        }
      }
    });

    for (let key in dataWanted) {
      let name = [];
      for (let key2 in dataWanted[key]) {
        dataWanted[key][key2].forEach((el) => {
          name.push(el.nameParent);
        });
        if (name.findIndex((el2) => el2 == key2) !== -1) {
          // console.log(key2);
          delete dataWanted[key][key2];
        }
      }
    }
    setWanted(dataWanted);

    let checklistData = [];
    let groupCheck = {};
    data.checklistInstrument.forEach((el, index) => {
      // console.log('ini elnyaa~~',el)
      // console.log('ini elnyaa terus lengthnya parent checkitem~~',el.parentCheckItem.length)
      if (!groupCheck[el.GroupCheck]) {
        let newParent = [];
        if (el.parentCheckItem.length !== 0) {
          el.parentCheckItem.forEach((el) => {
            newParent.push({ ...el, value: "", attachment: null });
          });
        }
        // if(groupCheck[el.GroupCheck].HeadcheckItemName)
        groupCheck[el.GroupCheck] = {
          group: el.GroupCheck,
          idInstrument: el.idInstrument,
          head: [
            {
              name: el.HeadcheckItemName,
              idCheckItem: el.idCheckitem,
              value: "",
              attachment: null,
              parent: newParent,
            },
          ],
        };
      } else if (groupCheck[el.GroupCheck]) {
        let newParent = [];
        if (el.parentCheckItem.length !== 0) {
          el.parentCheckItem.forEach((el) => {
            newParent.push({ ...el, value: "", attachment: null });
          });
        }
        groupCheck[el.GroupCheck].head.push({
          name: el.HeadcheckItemName,
          idCheckItem: el.idCheckitem,
          value: "",
          attachment: null,
          parent: newParent,
        });
      }
    });

    // console.log('ini ololololo',groupCheck)
    let newData = [];
    Object.keys(groupCheck).forEach((el) => {
      // console.log('ini elnya-=-=',el)
      let newHead = [];
      groupCheck[el].head.forEach((ela) => {
        if (newHead.length === 0) {
          newHead.push(ela);
        } else {
          let flag = true;
          newHead.forEach((eli) => {
            eli.name === ela.name ? (flag = false) : null;
          });
          flag ? newHead.push(ela) : null;
        }
      });
      // console.log(groupCheck[el].head)
      // console.log(newHead.length)
      groupCheck[el].head = newHead;
      newData.push(groupCheck[el]);
    });
    setCheckData(newData);
  };
  function setHead(input, setChange) {
    let baru = input.head.map((el) => {
      return el.parent.length === 0
        ? el.name === setChange.head
          ? { ...el, value: setChange.value }
          : { ...el }
        : { ...el, parent: setParent(el, setChange) };
    });
    return baru;
  }
  function setParent(input, setChange) {
    let newArr = input.parent.map((el) => {
      return setChange.parent === el.nameParent
        ? { ...el, value: setChange.value }
        : { ...el };
    });
    return newArr;
  }
  function changeValue(input) {
    // console.log('ini changevalue yang ada di paling ujung',input)
    let newSet = checkData.map((el, index) => {
      // console.log(el.group)
      return el.group === input.group
        ? { ...el, head: setHead(el, input) }
        : { ...el };
    });
    //   console.log('inihasil new setnya',newSet)
    // console.log('ini loh hadeuuhhh', input.group)
    // console.log('ini loh hadeuuhhh', checkData[0])
    //   let newHis = history.filter(el => {
    //       return el.includes(input.value)
    //   })
    setCheckData(newSet);
  }
  function setAttachHead(input, setAttach) {
    let baru = input.head.map((el) => {
      return el.parent.length === 0
        ? el.name === setAttach.head
          ? { ...el, attachment: setAttach.attachment }
          : { ...el }
        : { ...el, parent: setAttachParent(el, setAttach) };
    });
    return baru;
  }
  function setAttachParent(input, setAttach) {
    let newArr = input.parent.map((el) => {
      return setAttach.parent === el.nameParent
        ? { ...el, attachment: setAttach.attachment }
        : { ...el };
    });
    return newArr;
  }
  function attachFileGroup(input) {
    // console.log('ini input bossqueueee~~',input)
    let newSet = checkData.map((el, index) => {
      return el.group === input.group
        ? { ...el, head: setAttachHead(el, input) }
        : { ...el };
    });
    // console.log(newSet)
    setCheckData(newSet);
  }
  function _sethistory(input) {
    let historytype = [...history];
    let flag = true;
    historytype.forEach((el) => {
      el === input ? (flag = false) : null;
    });
    if (flag && input !== "" && input.length >= 3) {
      historytype.push(input);
    }

    // console.log('ini heduhe',historytype)
    setHistory(historytype);
    AsyncStorage.setItem(`checklist-history`, JSON.stringify(historytype));
    // console.log('ini heduhe',history)
  }

  async function done() {
    try {
      // log('ini checkdata abis berubah ubah harusnya',checkData)
      // console.log('ini selectedtasknya',props.selectedTask)
      // console.log('ini selected instrumentnya', props.navigation.getParam('customer'))
      let { customerName, customerId, idService } =
        props.navigation.getParam("customer");
      let sendToAsync = {
        customerName: customerName,
        idCustomer: customerId,
        idService: idService,
        checklistData: checkData,
      };
      await AsyncStorage.removeItem(
        `instrumentChecklist-${props.selectedTask.idTask}-${idService}`
      );
      // console.log(`instrumentChecklist-${props.selectedTask.idTask}-${idService}`)
      // await AsyncStorage.setItem(`instrumentChecklist-${props.selectedTask.idTask}-${idService}`, JSON.stringify(sendToAsync))
      // AsyncStorage.setItem(`checklist-history`, JSON.stringify(history))
      await props.trigger();
      // props.
      // props.navigation.navigate('Task')
    } catch (error) {
      console.error(error);
    }
  }
  // console.log('ini customer data ya', props.navigation.getParam('nomer'))

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        title={`Checklist ${props.navigation.getParam("nomer")}`}
      />
      <ScrollView>
        {/* {
                    wanted !== null && Object.entries(wanted).map((el, i) => {
                        // console.log('ini adalah elnya cuyy',el)
                        return (
                            <GroupI key={i} data={el} />
                        )
                    })
                } */}
        {checkData !== null &&
          checkData.map((el, i) => {
            return (
              <Group
                group={el}
                index={i}
                key={i}
                changeValue={changeValue}
                setHistory={_sethistory}
                history={history}
                attach={attachFileGroup}
              />
            );
          })}
        {/* <Text>
                    {JSON.stringify(show,'utf8', 2)}
                    {JSON.stringify(history,'utf8', 2)}
                    {JSON.stringify(checkData,'utf8', 2)}
                </Text> */}
      </ScrollView>
      <View style={styles.downList}>
        <TouchableOpacity
          onPress={() => setModalDone(!modalDone)}
          style={{
            width: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "gray" }}>DONE</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalDone}
        onRequestClose={() => {
          setModalDone(!modalDone);
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
            borderRadius: 6,
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
                style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}
              >
                Save Checklist?
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
              <TouchableOpacity onPress={() => setModalDone(!modalDone)}>
                <Text style={{ color: "#299BE8", fontWeight: "bold" }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <View style={{ margin: 20 }}></View>
              <TouchableOpacity
                onPress={() => {
                  setModalDone(!modalDone);
                  done();
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: hp("10%"),
    flex: 1,
  },
  downList: {
    backgroundColor: "#E6E6E6",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: hp("10%"),
    padding: 10,
    bottom: 0,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(checkListForm);
