import { StyleSheet, View } from "react-native";
import React from "react";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
import { PRIMARY } from "./Colors";
import Modal from "react-native-modal";

const ModalLoading = (props) => {
  return (
    <Modal
      isVisible={props.visible}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropOpacity={0.8}
      backdropColor={"#F7F7F7"}
    >
      <View style={styles.modalContainer}>
        <View>
          <WaveIndicator color={PRIMARY} size={55} count={6} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalLoading;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
