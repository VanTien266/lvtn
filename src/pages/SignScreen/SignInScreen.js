import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import staffApi from "../../api/staffApi";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/sessionActions";
import customerApi from "../../api/customerApi";
import { useToast, Box } from "native-base";

const SignInScreen = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [isSecure, setIsSecure] = useState(true);
  const navigation = useNavigation();
  const toast = useToast();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const loginHandle = async (userEmail, password) => {
    if (data.email.length == 0 || data.password.length == 0) {
      toast.show({
        title: "Đăng nhập thất bại!",
        status: "error",
        description: "Tài khoản hoặc mật khẩu không thể trống",
        placement: "top-left",
      });
      return;
    }

    try {
      let response;
      if (userEmail.includes("@bk.fabric.com")) {
        response = await staffApi.login({
          email: userEmail,
          password: password,
        });
      } else {
        response = await customerApi.login({
          email: userEmail,
          password: password,
        });
      }
      dispatch(login(response));
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Đăng nhập thành công
            </Box>
          );
        },
        placement: "top",
      });

      switch (response.role) {
        case "SALESMAN":
          navigation.navigate("BottomNavigation", { screen: "dashboard" });
          break;
        case "SHIPPER":
          navigation.navigate("ShipperNavigation", { screen: "order-list" });
          break;
        default:
          navigation.navigate("UserNavigation", { screen: "product" });
          break;
      }
    } catch (err) {
      toast.show({
        title: "Đăng nhập thất bại!",
        status: "error",
        description: "Tài khoản hoặc mật khẩu không đúng",
        placement: "top",
      });
      return;
    }
  };

  return (
    <View style={styles.signInContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.text_header}>Welcome!</Text>
        <Text style={{ fontSize: 16, color: "white" }}>
          Đăng nhập để tiếp tục
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.text_form}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            name="useremail"
            placeholder="Địa chỉ email"
            autoCapitalize="none"
            autoCorrect={false}
            // value={text}
            enablesReturnKeyAutomatically
            onChangeText={(val) => textInputChange(val)}
          />
        </View>
        <Text style={styles.text_form}>Mật khẩu</Text>
        {/* <InputPassword name="password" placeholder="Nhập mật khẩu" /> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            name="password"
            placeholder="Nhập mật khẩu"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={isSecure}
            // value={password}
            enablesReturnKeyAutomatically
            onChangeText={(val) => handlePasswordChange(val)}
            maxLength={30}
          />
          <Ionicons
            style={{ marginRight: 5 }}
            name={isSecure ? "ios-eye-off-outline" : "ios-eye-outline"}
            size={24}
            color="grey"
            onPress={() => {
              setIsSecure((prev) => !prev);
            }}
          />
        </View>
        <TouchableOpacity style={{ marginVertical: 5 }}>
          <Text style={styles.text_formForgotPass}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => loginHandle(data.email, data.password)}
        >
          <Text style={styles.textbuttonPrimary}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("signupscreen")}
        >
          <Text style={styles.textbuttonSecondary}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    backgroundColor: "#4470B0",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  welcomeContainer: {
    height: "30%",
    padding: 30,
  },
  formContainer: {
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  buttonPrimary: {
    backgroundColor: "#000040",
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    borderColor: "#000040",
    justifyContent: "center",
    marginVertical: 5,
    height: 40,
  },
  textbuttonPrimary: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000040",
    justifyContent: "center",
    marginVertical: 5,
    height: 40,
  },
  textbuttonSecondary: {
    color: "#000040",
    fontSize: 16,
    fontWeight: "bold",
  },
  text_form: {
    fontSize: 16,
  },
  text_formForgotPass: {
    fontSize: 16,
    color: "#000040",
  },
  inputContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#000040",
    marginVertical: 5,
  },
  inputField: {
    width: "80%",
    padding: 10,
    fontSize: 16,
  },
});
export default SignInScreen;
