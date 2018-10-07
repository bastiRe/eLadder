import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CloseButton = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={onPress}>
      <Ionicons
        name="md-close"
        size={28}
        color={Colors.Primary}
        style={{ padding: 6, paddingLeft: 12 }}
      />
    </TouchableOpacity>
  );
};

export default CloseButton;
