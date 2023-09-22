import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import {
  getTaskWaiting,
  setSelectedTask,
  getTaskActive,
  setNav,
  postTaskActive,
  getOfflineUser,
  downloadPDF,
  setFirstPending,
  setFirstComplete,
  setAfterClearCache,
  sendLocation,
  versionCheck,
} from "../stores/action";

import GetLocation from "react-native-get-location";
import IconFont from "react-native-vector-icons/Fontisto";
// import DeviceInfo from "react-native-device-info";
// import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import component
import Header from "../components/home/header";
import CardStatus from "../components/home/card-status";
import CardTask from "../components/home/card-task";
import CardActive from "../components/home/card-task-active";
import CardComplete from "../components/home/car-task-close";

//global file devine
const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  getTaskWaiting,
  setSelectedTask,
  getTaskActive,
  setNav,
  postTaskActive,
  getOfflineUser,
  downloadPDF,
  setFirstPending,
  setFirstComplete,
  setAfterClearCache,
  sendLocation,
  versionCheck,
};

function Home(props) {
  // console.log(props, 'props');
  const { navigation, loggedUser, isLoading } = props;
  //useState
  const [active, setActive] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [taskComplete, settaskComplete] = useState(props.taskComplete);

  //useEffect
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then((location) => {
        // console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
    props.getTaskWaiting();
    setRefreshing(false);
  }, [refreshing]);

  // JANGAN LUPA DI NYALAIN LAGI !!!!
  useEffect(() => {
    // let nowVer = DeviceInfo.getVersion();
    // console.log('ini adalah version sekarang',nowVer);
    //panggil version check disini
    // if (props.loggedUser && props.loggedUser.id) {
    //   props.versionCheck(props.loggedUser.id, nowVer);
    // }
  }, []);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then((location) => {
        // console.log(location);
        // console.log('ini loggedusernya',props.loggedUser)
        if (props.loggedUser && props.loggedUser.id) {
          props.sendLocation(props.loggedUser.id, location);
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
    props.getTaskWaiting();
    props.getOfflineUser();
    if (props.loggedUser) {
      props.getTaskActive(props.loggedUser.id);
      // props.getTaskActive(4)
    }
    props.setNav(props.navigation);
    AsyncStorage.getItem("pending-task")
      .then((data) => {
        if (data) {
          props.setFirstPending(JSON.parse(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    AsyncStorage.getItem("task-closed")
      .then((data) => {
        if (data) {
          props.setFirstComplete(JSON.parse(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (props.loggedUser) {
      props.getTaskActive(props.loggedUser.id);
      // props.getTaskActive(4)
    }
  }, [props.loggedUser]);

  useEffect(() => {
    reArrange();
    // askpermission();
  }, []);

  //function
  const askpermission = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.CAMERA,
    ]);
  };
  const clearCache = () => {
    Alert.alert(
      "Remove Saved Task",
      "This action will remove all saved task. Are you sure?",
      [
        {
          text: "Cancel",
          // onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            //udah bisa tapi kudu ngerefresh dan ngerender lagi, gimana tuh caranya? gw mau sholat dulu
            // console.log('pake i iya',await AsyncStorage.getAllKeys())
            AsyncStorage.removeItem("pending-task");
            AsyncStorage.removeItem("task-closed");
            AsyncStorage.removeItem("task-active");
            props.setAfterClearCache();
          },
          // AsyncStorage.clear()
        },
      ],
      { cancelable: false }
    );
  };
  // const _handleAppStateChange = appState => {
  //   if (appState === 'background') {
  //     // console.log('app is in background', appState);
  //     BackgroundTimer.runBackgroundTimer(() => {
  //       // code that will be called every 3 seconds
  //       GetLocation.getCurrentPosition({
  //         enableHighAccuracy: true,
  //       })
  //         .then(location => {
  //           // console.log(location);
  //           props.sendLocation(props.loggedUser.id,location)
  //         })
  //         .catch(error => {
  //           // const {code, message} = error;
  //           // console.warn(code, message);
  //           console.log('iniada errornya')
  //         });
  //       // console.log('ini dipangil')
  //       props.getTaskWaiting();
  //     }, 1800000);
  //     // }, 10000);
  //   } else {
  //     console.log('app is in foreground', appState);
  //     BackgroundTimer.stopBackgroundTimer();
  //   }
  // };
  const _changeTab = (param) => {
    if (param == "active") {
      // console.log('ini asu cok', props.taskActive, 'ini dia asunya');
      setActive(true);
      setWaiting(false);
      setPending(false);
      setComplete(false);
    } else if (param == "waiting") {
      setActive(false);
      setWaiting(true);
      setPending(false);
      setComplete(false);
    } else if (param == "pending") {
      setActive(false);
      setWaiting(false);
      setPending(true);
      setComplete(false);
    } else if (param == "complete") {
      setActive(false);
      setWaiting(false);
      setPending(false);
      setComplete(true);
    }
  };
  const reArrange = () => {
    // console.log('kepanggil cookk')
    // console.log(taskActive[0].startDate)

    // //Active task di sort berdasarkan tanggal mulai gunakan startDate, jika mau berdasarkan finish date gunakan finishDate // //
    // let newActive = taskActive.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1)

    // let newWaiting = taskWaiting.task.length !== 0 ? taskWaiting.task.sort((a, b) => (a.create_date > b.create_date) ? 1 : -1) : taskWaiting.task
    // console.log('taskWaiting',taskWaiting.task[0],2)
    // taskWaiting.task.forEach(element => {
    //     console.log('ini hadeuhhh', element)
    // })
    // console.log('taskWaiting',taskWaiting.task[1].create_date,2)

    // let newPending = instrumentPending.length !== 0 ? instrumentPending.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1) : instrumentPending
    // console.log('instrumentPending',instrumentPending,3)

    // //completed task di sort berdasarkan tanggal mulai gunakan startDate, jika mau berdasarkan finish date gunakan finishDate // //
    let newComplete = taskComplete.sort((a, b) =>
      a.startDate > b.startDate ? 1 : -1
    );
    // settaskActive(newActive)
    // settaskWaiting(newWaiting)
    // setinstrumentPending(newInstrument)
    settaskComplete(newComplete);
  };

  const truncate = (str, max) => {
    return str.length > max ? str.substr(0, max - 1) + "…" : str;
  };
  // console.log('-----======-----')
  // console.log('ini props.taksnya start_date',props.taskWaiting.start_date)
  // console.log('ini props.taksnya finish_date',props.taskWaiting.finish_date)
  // console.log('*****##########*****')

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.name}>
        {loggedUser && (
          <Text style={textStyles.name} numberOfLines={1}>
            {truncate(loggedUser.first_name, 30)}
          </Text>
        )}
        {/* {props.taskWaiting.jml_task_waiting !== 0 && ( */}
        <IconFont.Button
          onPress={clearCache}
          name="trash"
          size={25}
          color="black"
          backgroundColor="transparent"
          // style={{alignItems: 'center', justifyContent: 'center'}}
        />
        {/* )} */}
      </View>
      <CardStatus
        date={
          props.taskWaiting
            ? {
                start_date: props.taskWaiting.start_date,
                finish_date: props.taskWaiting.finish_date,
              }
            : ""
        }
        jumlahTask={
          props.taskWaiting ? { jml: props.taskWaiting.jml_task_waiting } : ""
        }
      />
      <View style={styles.selectTab}>
        <TouchableOpacity onPress={() => _changeTab("waiting")}>
          <Text
            style={
              waiting ? textStyles.textTabActive : textStyles.textTabUnactive
            }
          >
            Waiting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _changeTab("active")}>
          <Text
            style={
              active ? textStyles.textTabActive : textStyles.textTabUnactive
            }
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _changeTab("pending")}>
          <Text
            style={
              pending ? textStyles.textTabActive : textStyles.textTabUnactive
            }
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _changeTab("complete")}>
          <Text
            style={
              complete ? textStyles.textTabActive : textStyles.textTabUnactive
            }
          >
            Complete
          </Text>
        </TouchableOpacity>
      </View>
      {/* ini tab container */}
      <View style={styles.tabcontainer}>
        {isLoading && <ActivityIndicator size="large" color="blue" />}
        {waiting && (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {props.taskWaiting !== null &&
            props.taskWaiting.task &&
            props.taskWaiting.task.length !== 0 ? (
              props.taskWaiting.task.map((el, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      // props.setSelectedTask(el)
                    }}
                  >
                    <CardTask task={el} nomer={i + 1} />
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={{ alignSelf: "center" }}>
                <Text>No Task Waiting</Text>
              </View>
            )}
          </ScrollView>
        )}
        {active && (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {props.taskActive.length > 0 && !props.isLoading ? (
              props.taskActive.map((el, i) => {
                return <CardActive key={i} task={el} nomer={i + 1} />;
              })
            ) : (
              <View style={{ alignSelf: "center" }}>
                <Text>No Task Active</Text>
              </View>
            )}
          </ScrollView>
        )}
        {pending && (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {props.instrumentPending.length > 0 && !props.isLoading ? (
              props.instrumentPending.map((el, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      backgroundColor: "#ffff99",
                      marginHorizontal: 20,
                      padding: 20,
                      marginVertical: 10,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      {el.instrument.customer}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Text style={{ fontSize: 15 }}>Inst </Text>
                        <Text style={{ fontSize: 15 }}>Type </Text>
                        <Text style={{ fontSize: 15 }}>SN</Text>
                      </View>
                      <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 15 }}>:</Text>
                        <Text style={{ fontSize: 15 }}>:</Text>
                        <Text style={{ fontSize: 15 }}>:</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 15 }}>
                          {el.instrument.data.merk}
                        </Text>
                        <Text style={{ fontSize: 15 }}>
                          {el.instrument.data.type}
                        </Text>
                        <Text style={{ fontSize: 15 }}>
                          {el.instrument.data.sn}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Problem{" "}
                      </Text>
                      <Text style={{ fontSize: 15, marginHorizontal: 5 }}>
                        :
                      </Text>
                      <View style={{ flexShrink: 1 }}>
                        <Text style={{ fontSize: 15 }}>{el.problem}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Solution{" "}
                      </Text>
                      <Text style={{ fontSize: 15, marginHorizontal: 5 }}>
                        :
                      </Text>
                      <View style={{ flexShrink: 1 }}>
                        <Text style={{ fontSize: 15 }}>{el.solution}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={{ alignSelf: "center" }}>
                <Text>No Instrument Pending</Text>
              </View>
            )}
          </ScrollView>
        )}
        {complete && (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {props.taskComplete.length > 0 && !props.isLoading ? (
              props.taskComplete.map((el, i) => {
                console.log("ini task complete", props.taskComplete);
                return <CardComplete key={i} task={el} nomer={i + 1} />;
              })
            ) : (
              <View style={{ alignSelf: "center" }}>
                <Text>No Task Complete</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: dimHeight,
    width: dimWidth,
    paddingTop: dimHeight * 0.1,
  },
  name: {
    marginHorizontal: dimWidth * 0.045,
    marginTop: dimHeight * 0.025,
    marginBottom: dimHeight * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingRight: 5,
  },
  tabcontainer: {
    height: "65%",
    paddingBottom: dimHeight * 0.01,
    paddingTop: dimHeight * 0.02,
    width: dimWidth,
  },
  selectTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: dimWidth * 0.05,
    marginTop: dimHeight * 0.03,
    width: "90%",
  },
});

const textStyles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  textTabUnactive: {
    fontSize: 16,
    color: "gray",
    fontWeight: "500",
  },
  textTabActive: {
    fontSize: 16,
    color: "#6cbbe8",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
