import React from "react";
import { StyleSheet, Platform } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

import { SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  icon: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16
  },
  dropdown: {
    width: "auto",
    height: "auto",
    paddingLeft: 8,
    paddingRight: 8
  },
  dropdownText: {
    fontSize: 16,
    lineHeight: 32,
    color: Colors.Text
  }
});

function HeaderDropdown({ options }) {
  const onSelect = index => {
    setTimeout(options[index].onSelect, 100);
  };

  const optionLabels = options.map(option => option.label);
  return (
    <ModalDropdown
      options={optionLabels}
      onSelect={onSelect}
      dropdownStyle={styles.dropdown}
      dropdownTextStyle={styles.dropdownText}
      animated={false}
      adjustFrame={frame => {
        const adjustedFrame = Object.assign({}, frame);
        if (Platform.OS === "ios") {
          adjustedFrame.right = frame.right + 4;
        } else {
          adjustedFrame.right = frame.right + 12;
          adjustedFrame.top = frame.top - 24;
        }
        return adjustedFrame;
      }}
    >
      <SimpleLineIcons
        name={Platform.OS === "ios" ? "options" : "options-vertical"}
        color={Colors.TextOnPrimary}
        size={20}
        style={styles.icon}
      />
    </ModalDropdown>
  );
}

export default HeaderDropdown;
