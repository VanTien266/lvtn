import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

//Pages
import AccountProfile from "../pages/Account/AccountProfile";
import Setting from "../pages/Account/Setting";
import ChangePassword from "../pages/Account/ChangePassword";
import MemberCard from "../pages/Account/MemberCard";

const AccountStack = createStackNavigator();

export default function AccountStackNavigation() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="accountprofile"
        component={AccountProfile}
        options={{
          title: "Thông tin tài khoản",
          headerLeft: null,
        }}
      ></AccountStack.Screen>
      <AccountStack.Screen
        name="setting"
        component={Setting}
        options={{
          title: "Cài đặt",
        }}
      ></AccountStack.Screen>

      <AccountStack.Screen
        name="changepassword"
        component={ChangePassword}
        options={{
          title: "Đổi mật khẩu",
        }}
      ></AccountStack.Screen>

      <AccountStack.Screen
        name="membercard"
        component={MemberCard}
        options={{
          title: "Thẻ thành viên",
        }}
      ></AccountStack.Screen>
    </AccountStack.Navigator>
  );
}

const styles = StyleSheet.create({
  verticalCenter: {
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleBar: {
    flex: 1,
    flexDirection: "row",
  },
  iconBtnBar: {
    marginLeft: 5,
    marginRight: 5,
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
