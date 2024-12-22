import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { WHITE } from "./Colors";

const ActionBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.action} style={props.styles}>
      {!props.title && props.body}
      {!props.body && <Text style={styles.title}>{props.title}</Text>}
    </TouchableOpacity>
  );
};

export default ActionBtn;

const styles = StyleSheet.create({
  title: {
    color: WHITE,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
  },
});
