import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HiddenCardContainer = () => {
  const [showCards, setShowCards] = useState(false);

  const toggleCards = () => {
    setShowCards(!showCards);
  };

  return (
    <View style={styles.container}>
      <Button
        title={showCards ? "Hide Cards" : "Show Cards"}
        onPress={toggleCards}
      />

      {showCards && (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text>Card 1</Text>
          </View>
          <View style={styles.card}>
            <Text>Card 2</Text>
          </View>
          <View style={styles.card}>
            <Text>Card 3</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical:10,
    backgroundColor: "#F8F8F8",
    elevation: 2,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  cardsContainer: {
    marginTop: 16,
    flexDirection: "column", // Display cards vertically
    alignItems: "center", // Center cards horizontally within the container
  },
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8, // Add vertical margin to separate cards
  },
});

export default HiddenCardContainer;


