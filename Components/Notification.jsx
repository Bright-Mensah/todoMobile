import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BLACK, BORDER, GRAY, PRIMARY, SECONDARY, WHITE } from "./Colors";
import ActionBtn from "./ActionBtn";

const Notification = ({
  visible,
  title = "Notification",
  message = "Default message",
  type = "notification", // Can be 'notification' or 'prompt'
  icon = "notifications", // Default icon
  primaryAction, // { label: 'Yes', onPress: onYes }
  secondaryAction, // { label: 'No', onPress: onNo }
  close, // Function to close the modal
}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.8}
      backdropColor="black"
    >
      <View style={styles.header}>
        {/* Dynamic icon */}
        <Ionicons name={icon} size={24} color={WHITE} />

        {/* Dynamic title */}
        <Text style={styles.title}>{title}</Text>

        {/* Info icon */}
        <Ionicons name="information-circle" size={24} color={WHITE} />
      </View>

      <View style={styles.body}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <View style={styles.divider}></View>

      {/* Conditional buttons based on type */}
      <View
        style={[
          styles.footer,
          type === "prompt" && styles.cBtn, // Adjust for prompt layout
        ]}
      >
        {type === "prompt" ? (
          <>
            <ActionBtn
              title={primaryAction?.label || "Yes"}
              action={primaryAction?.onPress}
              styles={styles.actionBtn}
            />
            <ActionBtn
              title={secondaryAction?.label || "No"}
              action={secondaryAction?.onPress}
            />
          </>
        ) : (
          <ActionBtn title="Ok" action={close} />
        )}
      </View>
    </Modal>
  );
};

export default Notification;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: PRIMARY,
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: SECONDARY,
  },
  title: {
    color: WHITE,
    fontSize: 18,
  },
  message: {
    color: WHITE,
    fontSize: 16,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "white",
  },
  footer: {
    backgroundColor: SECONDARY,
    alignItems: "flex-end",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 10,
  },
  cBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionBtn: {
    marginRight: 30,
  },
});
