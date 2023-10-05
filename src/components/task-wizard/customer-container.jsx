import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomerContainer() {
  const [showCards, setShowCards] = useState(false);

  const toggleCards = () => {
    setShowCards(!showCards);
  };
  return (
    <View style={styles.dropdown}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.text}>RSUD</Text>
          <Text>3 Instrument</Text>
        </View>

        <TouchableOpacity onPress={toggleCards} style={styles.iconButton}>
          <AntDesign
            name={showCards ? "downcircle" : "upcircle"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {showCards && (
        <View style={styles.cardsContainer}>
          {/* Text elements */}
          <Text style={styles.leftText}>Merk</Text>
          <Text>nama instrument</Text>
          <View style={styles.horizontalLine} />
          <View style={styles.textContainer}>
            <Text style={styles.leftText}>Type</Text>
            <Text style={styles.rightText}>Serial Number</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>123123</Text>
            <Text
              style={{
                paddingRight: 20,
              }}
            >
              1231 1231
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.textContainer}>
            <Text>No part used</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0ECFA",
    borderRadius: 18, // Adjust the border radius as needed
    padding: 18, // Adjust the padding as needed
    margin: 14,
    marginTop: 37,
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  rightText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingRight: 20,
  },
  horizontalLine: {
    marginVertical: 12,
    borderBottomWidth: 1, // Adjust the line thickness as needed
    borderBottomColor: "gray", // Adjust the line color as needed
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dropdown: {
    margin: 14,
    padding: 16,
    marginVertical: 10,
    backgroundColor: "#F4F4F4",
    elevation: 2,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#71ABFF",
  },
  cardsContainer: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    borderRadius: 15,
    padding: 16,
  },
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
});
