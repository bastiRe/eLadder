import React from "react";
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

class CreateLeagueForm extends React.Component {
  state = {
    title: ""
  };

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          autoCapitalize={"none"}
          placeholder={"Title"}
          onChangeText={title => this.setState({ title })}
        />
        <Button
          title="Submit"
          type="primary"
          onPress={() => this.onSubmit()}
          style={styles.button}
          disabled={this.state.title.length === 0}
        />
      </View>
    );
  }
}

export default CreateLeagueForm;
