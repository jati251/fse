// import React, { useState } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";

// const HiddenCardContainer = () => {
// const [showCards, setShowCards] = useState(false);

// const toggleCards = () => {
//   setShowCards(!showCards);
// };

//   return (
// <View style={styles.container}>
//   <Button
//     title={showCards ? "Hide Cards" : "Show Cards"}
//     onPress={toggleCards}
//   />

//   {showCards && (
//     <View style={styles.cardsContainer}>
//       <View style={styles.card}>
//         <Text>Card 1</Text>
//       </View>
//       <View style={styles.card}>
//         <Text>Card 2</Text>
//       </View>
//       <View style={styles.card}>
//         <Text>Card 3</Text>
//       </View>
//     </View>
//   )}
// </View>
//   );
// };

// const styles = StyleSheet.create({
// container: {
//   padding: 16,
//   marginVertical:10,
//   backgroundColor: "#F8F8F8",
//   elevation: 2,
//   shadowColor: "rgba(0,0,0,0.2)",
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.8,
// },
// cardsContainer: {
//   marginTop: 16,
//   flexDirection: "column", // Display cards vertically
//   alignItems: "center", // Center cards horizontally within the container
// },
// card: {
//   width: "100%",
//   height: 100,
//   backgroundColor: "#FFFFFF",
//   justifyContent: "center",
//   alignItems: "center",
//   marginVertical: 8, // Add vertical margin to separate cards
// },
// });

// export default HiddenCardContainer;

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
import ConsumablePart from "../components/task-wizard/consumable-part";

const TaskWaiting = () => {
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
      <ConsumablePart />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={{
            backgroundColor: "#035CDC",
            borderRadius: 13,
            padding: 15,
            marginVertical: 10,
          }}
        >
          <Text style={styles.buttonText}>Make Active</Text>
        </TouchableOpacity>
      </View>
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
  buttonText: {
    color: "white", // Adjust the text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TaskWaiting;
