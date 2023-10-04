import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Card from "./Card";
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.greyContainer}>
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

        <ScrollView
          style={styles.scrollButton}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Waiting</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Active</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Pending</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Complete</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>3</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.whiteContainer}></View>
      <View style={styles.cardContainer}>
        {props.taskWaiting !== null &&
          props.taskWaiting.task &&
          props.taskWaiting.task.length !== 0 &&
          props.taskWaiting.task.map((el, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  // props.setSelectedTask(el)
                }}
              >
                <Card task={el} nomer={i + 1} />
              </TouchableOpacity>
            );
          })}
      </View>
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
    flex: 1,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
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
    backgroundColor: "white", // Set the background color for the number container
    borderRadius: 10,
    paddingHorizontal: 7,
    marginHorizontal: 4,
  },
  numberText: {
    color: "blue", // Set the text color for the number
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
