import { StyleSheet, View, StatusBar, SafeAreaView, ScrollView } from "react-native";
// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, Icon } from "react-native-elements";

import TotalSale from "./components/TotalSale";
import BillCompleted from "./components/BillCompleted";
import Revenue from "./components/Revenue";
import FabricRollCompleted from "./components/FabricRollCompleted";
import ChartFabricWarehouse from "./components/ChartFabricWarehouse";
import ChartOrderMonthly from "./components/ChartOrderMonthly";
import ChartBillStatus from "./components/ChartBillStatus";
import ChartOrderStatus from "./components/ChartOrderStatus";
import ChartTopProduct from "./components/ChartTopProduct";
import MonthYearPicker from "../../components/MonthYearPicker";

export default function DashBoard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.overview}>
        <Text style={styles.textTitle}>Tổng quan</Text>
        <View style={styles.containerDate}>
          <MonthYearPicker />
        </View>

        <View style={styles.iconSearch}>
          <Icon
            style={styles.iconSearchStyle}
            name="search"
            type="evillcons"
            color="grey"
            solid="true"
            size={28}
            onPress={() => console.log("search")}
          />
        </View>
        
        <View style={styles.iconNotification}>
          <Icon
            style={styles.iconNotificationStyle}
            name="notifications-outline"
            type="ionicon"
            color="grey"
            solid="true"
            size={28}
            onPress={() => console.log("notification")}
          />
        </View>
      </View>

      <View style={styles.statistics}>
        <View style={styles.orderbillStatistics}>
          <View style={styles.orderStatistics}>
            <TotalSale />
          </View>
          <View style={styles.billStatistics}>
            <BillCompleted />
          </View>
        </View>

        <View style={styles.revenuefabricStatistics}>
          <View style={styles.revenueStatistics}>
            <Revenue />
          </View>
          <View style={styles.fabricStatistics}>
            <FabricRollCompleted />
          </View>
        </View>
      </View>

      <View style={styles.chartordermonthly}>
        <ChartOrderMonthly />
      </View>

      <View style={styles.chartfabricwarehouse}>
        <ChartFabricWarehouse />
      </View>

      <View style={styles.charttopproduct}>
        <ChartTopProduct />
      </View>

      <View style={styles.chartorderstatus}>
        <ChartOrderStatus />
      </View>

      <View style={styles.chartbillstatus}>
        <ChartBillStatus />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overview: {
    flex: 1,
    flexDirection: "row",
    // position:'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
    // backgroundColor:"blue",
    padding: 5,
  },
  statistics: {
    flex: 1,
  },
  chartordermonthly: {
    flex: 1,
    // backgroundColor: "red",
  },
  chartfabricwarehouse: {
    flex: 1,
    backgroundColor: "blue",
  },
  chartfabrictypesell: {
    flex: 1,
    backgroundColor: "purple",
  },
  chartbillstatus: {
    flex: 1,
    backgroundColor: "orange",
  },
  chartorderstatus: {
    flex: 1,
    backgroundColor: "brown",
  },
  orderbillStatistics: {
    flex: 1,
    flexDirection: "row",
  },
  revenuefabricStatistics: {
    flex: 1,
    flexDirection: "row",
  },
  orderStatistics: {
    flex: 1,
    margin: 5,
  },
  billStatistics: {
    flex: 1,
    margin: 5,
  },
  revenueStatistics: {
    flex: 1,
    margin: 5,
  },
  fabricStatistics: {
    flex: 1,
    margin: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // margin: 5,
  },
  title: {
    flex: 1,
  },
  containerDate: {
    flex: 6,
  },
  iconSearch: {
    flex: 1,
  },
  iconNotification: {
    flex: 1,
  },
  iconNotification:{
    flex:1,
  }

});
