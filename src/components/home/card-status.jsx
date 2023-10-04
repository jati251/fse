import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import IconOct from "react-native-vector-icons/Octicons";

const mapStateToProps = (state) => {
  return state;
};

const dimHeight = Dimensions.get("screen").height;
const dimWidth = Dimensions.get("screen").width;
//   const mapDispatchToProps = {
//     setCurrentLocation,
//     changeLogin,
//     GetUser
//   }

function CardStatus(props) {
  const [jumlahTask, setJumlahTask] = useState(0);
  useEffect(() => {
    setJumlahTask(props.jumlahTask.jml);
  }, [props.jumlahTask]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={textStyles.task}>{jumlahTask} Task</Text>
      </View>
      <View
        style={{
          backgroundColor: "#A2A2A2",
          height: "100%",
          width: 1,
        }}
      ></View>
      <View>
        <Text style={textStyles.startfinish}>Start Date</Text>
        <View style={styles.date}>
          {/* <IconOct
            name="primitive-dot"
            color="green"
            backgroundColor="transparent"
            size={20}
            style={{ marginRight: "5%" }}
          /> */}
          <Text style={textStyles.date}>
            {props.date ? props.date.start_date : ""}
          </Text>
        </View>
      </View>
      <View>
        <Text style={textStyles.startfinish}>Finish Date</Text>
        <View style={styles.date}>
          {/* <IconOct
            name="primitive-dot"
            color="red"
            backgroundColor="transparent"
            size={20}
            style={{ marginRight: "5%" }}
          /> */}
          <Text style={textStyles.date}>
            {props.date ? props.date.finish_date : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: dimHeight * 0.1,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
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
  },
  date: {
    flexDirection: "row",
  },
});

const textStyles = StyleSheet.create({
  task: {
    fontSize: 16,
    fontWeight: "100",
  },
  startfinish: {
    fontSize: 12,
    color: "gray",
  },
  date: {
    fontSize: 16,
    fontWeight: "100",
  },
});

export default connect(mapStateToProps)(CardStatus);
