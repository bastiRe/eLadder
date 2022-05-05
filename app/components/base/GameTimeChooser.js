import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import Colors from "../../constants/Colors";
import { GreyButton, GreyButtonText } from "../elements";

const TimeButton = styled(GreyButton)`
  width: 260px;
  align-self: center;
`;

class GameTimeChooser extends React.PureComponent {
  state = {
    isGameTimePickerVisible: false
  };

  _showGameTimePicker = () => this.setState({ isGameTimePickerVisible: true });

  _hideGameTimePicker = () => this.setState({ isGameTimePickerVisible: false });

  _handleGameTimePicked = date => {
    this.props.onChange(date);
    this.setState({ isGameTimePickerVisible: false });
  };

  render() {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={this._showGameTimePicker}>
          <TimeButton>
            <GreyButtonText>
              {this.props.date.format("MMMM Do YYYY, h:mm a")}
            </GreyButtonText>
          </TimeButton>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isGameTimePickerVisible}
          onConfirm={this._handleGameTimePicked}
          onCancel={this._hideGameTimePicker}
          date={this.props.date.toDate()}
          mode="datetime"
          confirmTextStyle={{ color: Colors.Primary }}
          cancelTextStyle={{ color: Colors.Primary }}
          maximumDate={new Date()}
        />
      </React.Fragment>
    );
  }
}

export default GameTimeChooser;
