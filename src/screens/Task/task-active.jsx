import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TaskWizardBackground from "../icons/task-wizard-background";
import IcCommentIcon from "../icons/ic-riwayat-komentar";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import PartWizard from "../components/task-wizard/part-container";
import CustomerContainer from "../components/task-wizard/customer-container";

const TaskActive = () => {
  return (
    <ScrollView>
      <TaskWizardBackground />
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.header}>
          <IcCommentIcon />
          <Text style={styles.headerText}>Title</Text>
        </View>

        {/* Text elements */}
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Task Owner</Text>
          <Text style={styles.rightText}>Right Text</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Schedule</Text>
          <Text style={styles.rightText}>Right Text</Text>
        </View>
      </View>
      <CustomerContainer />
      <PartWizard />
      <PartWizard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0ECFA",
    borderRadius: 18,
    padding: 18,
    margin: 14,
    marginTop: 37,
  },
  header: {
    backgroundColor: "#E0ECFA",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  headerText: {
    color: "#344054",
    fontSize: 18,
    fontWeight: "bold",
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftText: {
    fontSize: 16,
  },
  rightText: {
    fontSize: 16,
  },
  horizontalLine: {
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});

export default TaskActive;
