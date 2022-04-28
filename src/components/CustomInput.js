import { View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

const CustomInput = (props) => {
  const { name, placeholder } = props;
  const [text, setText] = useState("");
  const onChangeText = (text) => {
    setText(text);
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputField}
        name={name}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        value={text}
        enablesReturnKeyAutomatically
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000040",
    marginVertical: 5,
  },
  inputField: {
    padding: 10,
    fontSize: 16,
  },
});
export default CustomInput;
