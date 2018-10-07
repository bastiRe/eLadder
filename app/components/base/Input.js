import { StyleSheet, TextInput, View } from "react-native";
import React, { Component } from "react";
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

class Input extends Component {
  componentWillReceiveProps(nextProps) {
    const { focus } = nextProps;
    return focus && this.focus();
  }

  focus() {
    this.input.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          style={styles.input}
          ref={c => {
            this.input = c;
          }}
          {...this.props}
        />
      </View>
    );
  }
}

export default Input;
