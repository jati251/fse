import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import GetLocation from "react-native-get-location";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import Card from "./Card";
import CardActive from "../components/home/card-task-active";
import CardComplete from "../components/home/car-task-close";

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

const Home = (props) => {
  const { navigation, isLoading } = props;
  const [active, setActive] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);

  const _changeTab = (param) => {
    if (param == "active") {
      setActive(true);
      setWaiting(false);
      setPending(false);
      setComplete(false);
    } else if (param == "waiting") {
      props.getTaskWaiting();
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

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then((location) => {
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
    }
  }, [props.loggedUser]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.greyContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.customInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Find your tasks here..."
            />
            <TouchableOpacity style={styles.inputIcon}>
              <Ionicons name={"search"} size={24} color="#C6D4DC" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Task Wizard</Text>
        </View>

        {/* Bagian Opsi Tab */}
        <ScrollView
          style={styles.scrollButton}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => _changeTab("waiting")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Waiting</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>
                {props.taskWaiting?.task && props.taskWaiting.task.length !== 0
                  ? props.taskWaiting.task.length
                  : 0}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _changeTab("active")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Active</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>
                {props.taskActive && props.taskActive.length !== 0
                  ? props.taskActive.length
                  : 0}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _changeTab("pending")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Pending</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>
                {props.instrumentPending && props.instrumentPending.length !== 0
                  ? props.instrumentPending.length
                  : 0}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _changeTab("complete")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Complete</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>3</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Container Task */}
      {isLoading && <ActivityIndicator size="large" color="blue" />}

      {/* Jika ada di posisi Waiting */}
      {waiting && (
        <View style={styles.cardContainer}>
          {props.taskWaiting !== null &&
            props.taskWaiting.task &&
            props.taskWaiting.task.length !== 0 &&
            props.taskWaiting.task.map((el, i) => {
              return <Card task={el} nomer={i + 1} />;
            })}
        </View>
      )}

      {/* Jika Tab posisi ada di Active */}
      {active && (
        <View style={styles.cardContainer}>
          {props.taskActive.length > 0 && !props.isLoading ? (
            props.taskActive.map((el, i) => {
              return <CardActive key={i} task={el} nomer={i + 1} />;
            })
          ) : (
            <View style={{ alignSelf: "center" }}>
              <Text>No Task Active</Text>
            </View>
          )}
        </View>
      )}

      {/* Jika Tab posisi ada di pending */}
      {pending && (
        <View style={styles.cardContainer}>
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
                    <Text style={{ fontSize: 15, marginHorizontal: 5 }}>:</Text>
                    <View style={{ flexShrink: 1 }}>
                      <Text style={{ fontSize: 15 }}>{el.problem}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Solution{" "}
                    </Text>
                    <Text style={{ fontSize: 15, marginHorizontal: 5 }}>:</Text>
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
          {complete && (
            <View style={styles.cardContainer}>
              {props.taskComplete.length > 0 && !props.isLoading ? (
                props.taskComplete.map((el, i) => {
                  // console.log("ini task complete", props.taskComplete);
                  return <CardComplete key={i} task={el} nomer={i + 1} />;
                })
              ) : (
                <View style={{ alignSelf: "center" }}>
                  <Text>No Task Complete</Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  customInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  inputIcon: {
    padding: 10,
  },

  greyContainer: {
    paddingBottom: 16,
    backgroundColor: "#3A4555",
  },
  headerContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: "#3A4555",
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  cardContainer: {
    padding: 16,
    flexDirection: "column",
    alignItems: "stretch",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 21,
  },
  button: {
    height: 40,
    flexDirection: "row",
    marginHorizontal: 6,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "white",
  },
  scrollButton: {
    paddingLeft: 16,
  },
  buttonText: {
    paddingHorizontal: 3,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  numberContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 7,
    marginHorizontal: 4,
  },
  numberText: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
