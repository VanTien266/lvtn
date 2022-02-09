import { createStackNavigator } from "@react-navigation/stack";
import SupportList from "../pages/Support/SupportList";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const SupportStack = createStackNavigator();

export default function SupportStackNavigation() {
  return (
    <SupportStack.Navigator>
      <SupportStack.Screen
        name="support-list"
        component={SupportList}
        options={{
          title: "Hỗ trợ",
          headerRight: () => (
            <View style={styles.titleBar}>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="filter" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="notifications" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtnBar}
              >
                <Ionicons name="search-sharp" size={24} color="#000040" />
              </TouchableOpacity>
            </View>
          ),
        }}
      ></SupportStack.Screen>
      <SupportStack.Screen name="support-reply" component={SupportReply}>
      </SupportStack.Screen>
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