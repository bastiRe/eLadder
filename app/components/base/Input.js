import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as colors from "../../constants/Colors";

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16
  },
  container: {
    marginTop: 4,
    marginBottom: 4,
    flexDirection: "row",
    alignSelf: "stretch",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.Background,
    borderRadius: 8,
    height: 40
  }
});

export function Input({ onChangeText, autoCapitalize, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        underlineColorAndroid="rgba(0, 0, 0, 0)"
        style={styles.input}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
      />
    </View>
  );
}

export default Input;
