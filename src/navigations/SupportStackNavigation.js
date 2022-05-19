import { createStackNavigator } from "@react-navigation/stack";
import SupportList from "../pages/user/SupportList/SupportList";
import ReplySupport from "../pages/ReplySupport/ReplySupport";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CreateRequest from "../pages/user/SupportList/CreateRequest";

const SupportStack = createStackNavigator();

export default function SupportStackNavigation() {
  return (
    <SupportStack.Navigator initialRouteName="support-list">
      <SupportStack.Screen
        name="support-list"
        component={SupportList}
        options={{
          title: "Hỗ trợ",
          headerLeft: null,
          headerRight: () => (
            <View style={styles.titleBar}>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="filter" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="search-sharp" size={24} color="#000040" />
              </TouchableOpacity>
            </View>
          ),
        }}
      ></SupportStack.Screen>
      <SupportStack.Screen
        name="support-reply"
        component={ReplySupport}
        options={{
          title: "Phản hồi yêu cầu hỗ trợ",
        }}
      ></SupportStack.Screen>
      <SupportStack.Screen
        name="create-request"
        component={CreateRequest}
        options={{
          title: "Tạo yêu cầu hỗ trợ",
        }}
      ></SupportStack.Screen>
    </SupportStack.Navigator>
  );
}

const styles = StyleSheet.create({
  verticalCenter: {
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  orderItem: {
    backgroundColor: "#F6F6F8",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    minHeight: 40,
  },
  orderItemText: {
    fontFamily: "'Roboto', sans-serif",
    color: "#000040",
    fontSize: 12,
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
