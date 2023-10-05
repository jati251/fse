import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import the Ionicons icon library
import IcCommentIcon from "../icons/ic-riwayat-komentar";
import { setSelectedTask } from "../stores/action/index";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setSelectedTask,
};

const Card = (props) => {
  const { style, task } = props;

  if (task?.is_customer) {
    return (
      <View style={[styles.card, style]}>
        <View style={styles.header}>
          <IcCommentIcon />
          <Text style={styles.headerText}>
            Task
            {props.nomer < 10 ? ` 0${props.nomer}` : ` ${props.nomer}`}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.leftColumn}>
            <Text style={[styles.leftText, styles.boldText]}>Location</Text>
            <Text style={{ ...styles.leftText, textTransform: "capitalize" }}>
              {props.task.locations.departure.length < 12
                ? props.task.locations.departure
                : props.task.locations.departure.substr(0, 9) + "..."}{" "}
              -{" "}
              {props.task.locations.destination.length < 12
                ? props.task.locations.destination
                : props.task.locations.destination.substr(0, 9) + "..."}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <Ionicons name={"compass"} size={24} color="#C6D4DC" />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.leftColumn}>
            <Text style={[styles.leftText, styles.boldText]}>Schedule</Text>
            <Text style={styles.leftText}>20/04/2023 - 20/04/2023</Text>
          </View>
          <View style={styles.rightColumn}>
            <Ionicons name={"alarm"} size={24} color="#C6D4DC" />
          </View>
        </View>
        <View style={styles.bottomContent}>
          <View style={styles.bottomLeft}>
            <Text style={styles.bottomLeftText}>
              {props.task.sum_customers} Customer {props.task.parts} part{" "}
              {task.followers} Follower
            </Text>
          </View>
          <TouchableOpacity style={styles.bottomRightButton}>
            <Text style={styles.buttonText}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    elevation: 2,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  header: {
    backgroundColor: "#E0ECFA",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row", // Arrange title and icon in a row
    alignItems: "center", // Center vertically
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerText: {
    color: "#344054",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: "#344054",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftColumn: {
    color: "#344054",
    flex: 2,
  },
  leftText: {
    color: "#344054",
    fontSize: 16,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: "bold",
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bottomLeft: {
    color: "#344054",
    flex: 1,
    justifyContent: "center",
  },
  bottomLeftText: {
    color: "#344054",
    fontSize: 16,
  },
  bottomRightButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#035CDC",
  },
  buttonText: {
    color: "#035CDC",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

const textStyles = StyleSheet.create({
  customer: {
    fontSize: 12,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
