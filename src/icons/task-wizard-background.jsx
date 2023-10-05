import React from "react";
import { Svg, Path } from "react-native-svg";
import { Dimensions, StyleSheet, View, Image } from "react-native";

const screenWidth = Dimensions.get("window").width;

const TaskWizardBackground = () => {
  return (
    <View>
      <Svg
        width={screenWidth}
        height={186}
        viewBox={`0 0 ${screenWidth} 186`}
        fill="none"
      >
        <Path
          d={`M${screenWidth} 186C${
            screenWidth / 2
          } 113.6 57.6667 155.834 -1 186V0H${screenWidth}V186Z`}
          fill="#035CDC"
        />
        <Image
          source={require("../assets/images/task_wizard.png")}
          style={styles.image}
          resizeMode="contain" // Adjust the resizeMode as needed
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%", // Adjust the width and height as needed
    height: "100%",
  },
});

export default TaskWizardBackground;
