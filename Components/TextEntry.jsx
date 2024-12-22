import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GRAY, SECONDARY, WHITE } from "./Colors";

const TextEntry = ({
  placeholder,
  label,
  required,
  multiline,
  numberOfLines,
  value,
  onChange,
}) => {
  return (
    <View>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{ color: "red", fontSize: 20 }}>*</Text>}
      </Text>
      {!multiline && (
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={value}
          onChangeText={onChange}
        />
      )}

      {multiline && (
        <TextInput
          placeholder={placeholder}
          style={styles.textArea}
          multiline={multiline}
          numberOfLines={numberOfLines}
          value={value}
          onChangeText={onChange}
        />
      )}
    </View>
  );
};

export default TextEntry;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "whitesmoke",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    borderColor: "gray",
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: "top",
    padding: 10,
  },
});
