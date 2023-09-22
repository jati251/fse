import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

//import icon
import IconFont from "react-native-vector-icons/Fontisto";

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
        <Text style={textStyles.title}>{props.data.customer}</Text>
        <View style={{ flexDirection: "row" }}>
          <IconFont
            name="player-settings"
            color="#707070"
            backgroundColor="transparent"
            size={10}
            style={{ marginRight: "2%", alignSelf: "center" }}
          />
          <Text style={textStyles.subtitle}>
            {+props.data.instrument.length} Instrument
          </Text>
        </View>
      </TouchableOpacity>
      {child &&
        props.data.instrument.map((el, i) => {
          return (
            <View
              key={i}
              style={{
                ...styles.container,
                backgroundColor: "#fff",
                opacity: 1,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: "4%",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{ ...textStyles.title, textTransform: "uppercase" }}
                >
                  {" "}
                  Merk : {el.merk}{" "}
                </Text>
                <Text
                  style={{ ...textStyles.title, textTransform: "uppercase" }}
                >
                  {" "}
                  Type : {el.type}{" "}
                </Text>
                <Text
                  style={{ ...textStyles.title, textTransform: "uppercase" }}
                >
                  {" "}
                  Serial Number : {el.sn}{" "}
                </Text>
              </View>
            </View>
          );
        })}
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
    marginBottom: dimHeight * 0.01,
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

export default connect(mapStateToProps)(cardStatus);
