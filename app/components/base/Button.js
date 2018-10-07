import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import * as colors from "../../constants/Colors";

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    height: 40,
    width: 240
  },
  primary: {
    backgroundColor: colors.Primary
  },
  inverse: {
    backgroundColor: colors.TextOnPrimary
  },
  text: {
    textAlign: "center",
    lineHeight: 32,
    fontSize: 16
  },
  primaryText: {
    color: colors.TextOnPrimary
  },
  inverseText: {
    color: colors.Primary
  },
  disabled: {
    opacity: 0.5
  }
});

const Button = ({ style, title, onPress, type, disabled = false }) => {
  const buttonStyle = [styles.button, styles[type], style];
  const textStyle = [styles.text, styles[`${type}Text`]];
  const text = <Text style={textStyle}>{title}</Text>;
  let button;
  if (!disabled) {
    button = (
      <TouchableHighlight
        underlayColor={"#efefef"}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={buttonStyle}>{text}</View>
      </TouchableHighlight>
    );
  } else {
    button = <View style={[buttonStyle, styles.disabled]}>{text}</View>;
  }

  return button;
};

export default Button;
