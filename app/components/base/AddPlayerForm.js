import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "./Input";
import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  button: {
    marginTop: 24
  }
});

function AddPlayerForm({ onSubmit }) {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Input
        autoCapitalize={"none"}
        placeholder={"Name"}
        autoFocus={true}
        onChangeText={setName}
      />
      <Button
        title="Submit"
        type="primary"
        onPress={() => onSubmit({ name })}
        style={styles.button}
        disabled={name.length === 0}
      />
    </View>
  );
}

export default AddPlayerForm;
