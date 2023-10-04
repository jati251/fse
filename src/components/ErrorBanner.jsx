import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Platform, Text } from "react-native";
// import {Surface, Button} from 'react-native-paper';

const ErrorBanner = ({ visible, image, children, color, style, ...rest }) => {
  const [position, setPosition] = useState(new Animated.Value(visible ? 1 : 0));
  const [layout, setLayout] = useState({
    height: 0,
    measured: false,
  });

  const handleLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent.layout;

    setLayout({ height: height, measured: true });
  };

  const show = () => {
    Animated.timing(position, {
      duration: 250,
      toValue: 1,
    }).start();
  };

  const hide = () => {
    Animated.timing(position, {
      duration: 200,
      toValue: 0,
    }).start();
  };

  const toggle = () => {
    if (visible) {
      show();
    } else {
      hide();
    }
  };

  // The banner animation has 2 parts:
  // 1. Blank spacer element which animates its height to move the content
  // 2. Actual banner which animates its translateY
  // In initial render, we position everything normally and measure the height of the banner
  // Once we have the height, we apply the height to the spacer and switch the banner to position: absolute
  // We need this because we need to move the content below as if banner's height was being animated
  // However we can't animated banner's height directly as it'll also resize the content inside

  const height = Animated.multiply(position, layout.height);

  const translateY = Animated.multiply(
    Animated.add(position, -1),
    layout.height
  );

  useEffect(() => {
    toggle();
  }, [visible]);

  return (
    // <Surface {...rest} style={[style, styles.absolute]}>
    <View
      style={[
        color ? { backgroundColor: color } : { backgroundColor: "#FFFFF" },
        styles.wrapper,
      ]}
    >
      <Animated.View style={{ height }} />
      <Animated.View
        onLayout={handleLayout}
        style={[
          layout.measured || !visible
            ? // If we have measured banner's height or it's invisible,
              // Position it absolutely, the layout will be taken care of the spacer
              [styles.absolute, { transform: [{ translateY }] }]
            : // Otherwise position it normally
              null,
          !layout.measured && !visible
            ? // If we haven't measured banner's height yet and it's invisible,
              // hide it with opacity: 0 so user doesn't see it
              { opacity: 0 }
            : null,
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.message} color="white">
            {children}
          </Text>
        </View>
      </Animated.View>
    </View>
    // </Surface>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
  },
  absolute: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 0,
  },
  image: {
    margin: 8,
  },
  message: {
    flex: 1,
    margin: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 4,
  },
  button: {
    margin: 4,
  },
});

export default ErrorBanner;
