import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../../constants/Colors";

const ScoreInput = ({ score, onChange }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.signContainer, styles.plusContainer]}
      onPress={() => onChange(score + 1)}
    >
      <Text style={styles.signText}>+</Text>
    </TouchableOpacity>
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>{score}</Text>
    </View>
    <TouchableOpacity
      style={[styles.signContainer, styles.minusContainer]}
      onPress={() => onChange(score - 1)}
      disabled={score === 0}
    >
      <Text
        style={[styles.signText, score === 0 ? styles.disabledText : undefined]}
      >
        -
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    borderRadius: 16,
    height: 240,
    margin: 20
  },
  scoreContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center"
  },
  signContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.Border
  },
  plusContainer: {
    borderBottomWidth: "1px"
  },
  minusContainer: {
    borderTopWidth: 1
  },
  scoreText: {
    fontSize: 48
  },
  signText: {
    fontSize: 32,
    color: Colors.Primary
  },
  disabledText: {
    opacity: 0.5
  }
});

export default ScoreInput;
