import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import BillList from "../pages/Shipper/History/BillList";
import BillDetail from "../pages/Shipper/History/BillDetail";

const ShipperBillStack = createStackNavigator();

const ShipperBillStackNavigation = () => {
  return (
    <ShipperBillStack.Navigator>
      <ShipperBillStack.Screen
        name="bill-list"
        component={BillList}
        options={({ navigation }) => ({
          title: "Lịch sử giao nhận",
          headerRight: () => (
            <View style={styles.titleBar}>
              <TouchableOpacity
                style={styles.iconBtnBar}
                onPress={() => navigation.push("order-filter")}
              >
                <Ionicons name="filter" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="notifications" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtnBar}
                onPress={() => navigation.push("order-search")}
              >
                <Ionicons name="search-sharp" size={24} color="#000040" />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: { borderBottomWidth: 0 },
        })}
      />
      <ShipperBillStack.Screen
        name="bill-detail"
        component={BillDetail}
        options={({ navigation, route }) => ({
          title: "Chi tiết hóa đơn",
        })}
      />
    </ShipperBillStack.Navigator>
  );
};

export default ShipperBillStackNavigation;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
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
