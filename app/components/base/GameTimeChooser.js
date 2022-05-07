import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import Colors from "../../constants/Colors";
import { GreyButton, GreyButtonText } from "../elements";

const TimeButton = styled(GreyButton)`
  width: 260px;
  align-self: center;
`;

function GameTimeChooser({ onChange, date }) {
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const handleTimePicked = date => {
    onChange(date);
    setIsTimePickerVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setIsTimePickerVisible(true)}>
        <TimeButton>
          <GreyButtonText>{date.format("MMMM Do YYYY, h:mm a")}</GreyButtonText>
        </TimeButton>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isTimePickerVisible}
        onConfirm={handleTimePicked}
        onCancel={() => setIsTimePickerVisible(false)}
        date={date.toDate()}
        mode="datetime"
        confirmTextStyle={{ color: Colors.Primary }}
        cancelTextStyle={{ color: Colors.Primary }}
        maximumDate={new Date()}
      />
    </>
  );
}

export default GameTimeChooser;
