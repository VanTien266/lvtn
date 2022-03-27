import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/sessionActions";

const Setting = ({ navigation }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    navigation.navigate("splashscreen");
  };

  return (
    <View style={styles.settingContainer}>
      <TouchableOpacity
        style={styles.layoutBox}
        onPress={() => navigation.push("changepassword")}
      >
        <Text style={styles.text}>Đổi mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.layoutBox}
        onPress={() => {
          signOut();
        }}
      >
        <Text style={styles.textSignOut}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};
const TEXT = {
  textAlign: "center",
  fontWeight: "bold",
  color: "#000040",
  fontSize: 16,
};
const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
    padding: 10,
  },
  layoutBox: {
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#fff",
    borderColor: "#000040",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 5,
  },
  text: {
    ...TEXT,
  },
  textSignOut: {
    ...TEXT,
    color: "red",
  },
});

export default Setting;
