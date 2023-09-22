import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import CustChild from "./groupChild";

const mapStateToProps = (state) => {
  return state;
};

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const cardStatus = (props) => {
  const [child, setChild] = useState(false);
  // console.log(props.data, 'ini datany');
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setChild(!child)}
      >
        <Text style={textStyles.title}>{props.data[0]}</Text>
      </TouchableOpacity>
      {/* <Text>{JSON.stringify(props.data[1])}</Text> */}
      {child &&
        Object.entries(props.data[1]).map((el, i) => {
          return <CustChild data={el} key={i} />;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: dimHeight * 0.09,
    width: "100%",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    justifyContent: "center",
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
    marginBottom: dimHeight * 0.01,
  },
  date: {
    flexDirection: "row",
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "100",
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
});

export default connect(mapStateToProps)(cardStatus);
