import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import WareHouseList from "../pages/WareHouse/WareHouseList";
import WareHouseDetail from "../pages/WareHouse/WareHouseDetail";

const WareHouseStack = createStackNavigator();

const WareHouseStackNavigation = () => {
  return (
    <WareHouseStack.Navigator>
      <WareHouseStack.Screen
        name="warehouse-list"
        component={WareHouseList}
        options={{
          title: "Danh sách kho hàng",
          headerLeft: null,
          headerStyle: { borderBottomWidth: 0 },
        }}
      />
      <WareHouseStack.Screen
        name="warehouse-detail"
        component={WareHouseDetail}
        options={{
          title: "Chi tiết kho hàng",
          headerStyle: { borderBottomWidth: 0 },
        }}
      />
    </WareHouseStack.Navigator>
  );
};

export default WareHouseStackNavigation;

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
