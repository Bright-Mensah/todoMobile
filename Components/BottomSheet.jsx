import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Or any other icon library you prefer
// import Modal from "react-native-modal";
const BottomSheet = (props) => {
  return (
    <View style={styles.container}>
      {/* Bottom Sheet Modal */}
      <Modal
        visible={props.show}
        animationType="slide"
        transparent
        onRequestClose={props.close}

        // Calls the parent-provided close handler
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>{props.header}</Text>
              <TouchableOpacity onPress={props.close}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {props.body}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default BottomSheet;
