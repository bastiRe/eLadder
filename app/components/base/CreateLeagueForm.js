import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "./Input";
import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20
  },
  button: {
    marginTop: 24
  }
});

function CreateLeagueForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  return (
    <View style={styles.container}>
      <Input
        autoCapitalize={"none"}
        placeholder={"Title"}
        onChangeText={setTitle}
      />
      <Button
        title="Submit"
        type="primary"
        onPress={() => onSubmit({ title })}
        style={styles.button}
        disabled={title.length === 0}
      />
    </View>
  );
}

export default CreateLeagueForm;
