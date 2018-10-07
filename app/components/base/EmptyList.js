import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import * as Images from "../../constants/Images";
import Colors from "../../constants/Colors";

const EmptyList = ({ title, text }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      resizeMode="contain"
      source={Images.backgroundIcon}
    />
    <View style={styles.childrenContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  childrenContainer: {
    width: 300
  },
  image: {
    flex: 1,
    width: 160,
    height: 200,
    margin: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.LightText,
    textAlign: "center",
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: Colors.LighterText,
    textAlign: "center"
  }
});

export default EmptyList;
