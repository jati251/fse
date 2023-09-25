import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChildScreen1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Child Screen 1</Text>
      <Text>This is Child Screen 1 content.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ChildScreen1;
