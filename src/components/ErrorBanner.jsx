import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";

const ErrorBanner = ({ visible, children,color, backgroundColor, style, ...rest }) => {
  const [position] = useState(new Animated.Value(visible ? 1 : 0));
  const [layout, setLayout] = useState({
    height: 0,
    measured: false,
  });

  useEffect(() => {
    _toggle();
  }, [visible]);

  const _handleLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent.layout;

    setLayout({ height: height, measured: true });
  };

  const _toggle = () => {
    if (visible) {
      _show();
    } else {
      _hide();
    }
  };

  const _show = () => {
    Animated.timing(position, {
      duration: 250,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const _hide = () => {
    Animated.timing(position, {
      duration: 200,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const height = Animated.multiply(position, layout.height);

  const translateY = Animated.multiply(
    Animated.add(position, -1),
    layout.height,
  );

  return (
    <View
    style={[
      color ? { backgroundColor: color } : { backgroundColor: '#FFFFF' },
      styles.wrapper,
    ]}>
    <Animated.View style={{ height }} />
    <Animated.View
      onLayout={_handleLayout}
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
      ]}>
      <View style={styles.content}>
        <Text style={styles.message} color="white">
          {children}
        </Text>
      </View>
    </Animated.View>
  </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 0,
  },
  message: {
    flex: 1,
    margin: 8,
  },
});

export default ErrorBanner;
