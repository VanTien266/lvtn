import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import InputPassword from "../../components/InputPassword";

export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <InputPassword name="oldpassword" placeholder="Mật khẩu hiện tại" />
      <View style={styles.titleContainer}>
        <Text style={styles.bigTitle}>
          Vui lòng nhập mật khẩu của bạn vào bên dưới
        </Text>
        <Text style={styles.smallTitle}>
          Tối thiểu 6 kí tự bao gồm cả chữ và số
        </Text>
      </View>
      <InputPassword name="newpassword" placeholder="Mật khẩu mới" />
      <InputPassword
        name="confirmpassword"
        placeholder="Nhập lại mật khẩu của bạn"
      />
      <TouchableOpacity
        style={styles.buttonChangePassword}
        onPress={() => {
          Alert.alert("Đổi mật khẩu");
        }}
      >
        <Text style={styles.textButton}>Thay đổi mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  titleContainer: {
    borderColor: "#000040",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  bigTitle: {
    fontSize: 18,
  },
  buttonChangePassword: {
    backgroundColor: "#000040",
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    marginVertical: 5,
    height: 50,
  },
  textButton: {
    fontSize: 18,
    color: "#fff",
  },
});
