import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from './Input';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    marginTop: 24
  }
});

class AddPlayerForm extends React.Component {
  state = {
    name: ''
  };

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          autoCapitalize={'none'}
          placeholder={'Name'}
          autoFocus={true}
          onChangeText={name => this.setState({ name })}
        />
        <Button
          title="Submit"
          type="primary"
          onPress={() => this.onSubmit()}
          style={styles.button}
          disabled={this.state.name.length === 0}
        />
      </View>
    );
  }
}

export default AddPlayerForm;
