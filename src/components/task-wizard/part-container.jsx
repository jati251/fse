import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PartWizard() {
  const [showCards, setShowCards] = useState(false);

  const toggleCards = () => {
    setShowCards(!showCards);
  };
  return (
    <View style={styles.dropdown}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Part</Text>
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
          <View style={styles.card}>
            <Text>Card 1</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    shadowOpacity: 0.8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EEEAEA",
  },
  cardsContainer: {
    marginTop: 16,
    flexDirection: "column",
    alignItems: "center",
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
