import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
// import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function DashBoard() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");

  //refresh page
  const [refreshing, setRefreshing] = useState(false);
  const [freshChart, setFreshChart] = useState(false);
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, value) => {
    const currentDate = value || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setDate(new Date(Date.now()));
    wait(2000).then(() => setRefreshing(false));
  }, []);

  let year = date.getFullYear();
  let month = date.getUTCMonth() + 1;

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <View style={styles.overview}>
              <Text style={styles.textTitle}>Tổng quan</Text>
              <View style={styles.containerDate}>
                <View style={styles.containerDateComponent}>
                  <View style={styles.pickedDateContainer}>
                    <Text style={styles.pickedDate}>
                      Tháng {month}, {year}{" "}
                    </Text>
                  </View>
                  <View style={styles.iconDatePicker}>
                    <Icon
                      style={styles.iconDatePickerStyle}
                      name="calendar-outline"
                      type="ionicon"
                      color="grey"
                      solid="true"
                      size={28}
                      onPress={showDatepicker}
                    />
                  </View>

                  {/* The date picker */}
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode={"date"}
                      onChange={onChange}
                      style={styles.datePicker}
                      display="default"
                    />
                  )}
                </View>
              </View>

              <View style={styles.iconSearch}>
                <Icon
                  style={styles.iconSearchStyle}
                  name="search"
                  type="evillcons"
                  color="grey"
                  solid="true"
                  size={28}
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
                />
              </View>
            </View>
          }
          ListFooterComponent={
            <>
              <View style={styles.statistics}>
                <View style={styles.orderbillStatistics}>
                  <View style={styles.orderStatistics}>
                    <TotalSale date={date} />
                  </View>
                  <View style={styles.billStatistics}>
                    <BillCompleted date={date} />
                  </View>
                </View>

                <View style={styles.revenuefabricStatistics}>
                  <View style={styles.revenueStatistics}>
                    <Revenue date={date} />
                  </View>
                  <View style={styles.fabricStatistics}>
                    <FabricRollCompleted date={date} />
                  </View>
                </View>
              </View>

              <View style={styles.chartordermonthly}>
                <ChartOrderMonthly date={date} />
              </View>

              <View style={styles.chartfabricwarehouse}>
                <ChartFabricWarehouse />
              </View>

              <View style={styles.charttopproduct}>
                <ChartTopProduct date={date} />
              </View>

              <View style={styles.chartorderstatus}>
                <ChartOrderStatus date={date} />
              </View>

              <View style={styles.chartbillstatus}>
                <ChartBillStatus date={date} />
              </View>
            </>
          }
        />
      )}
    </SafeAreaView>
  );
}

export default React.memo(DashBoard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overview: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  statistics: {
    flex: 1,
  },
  chartordermonthly: {
    flex: 1,
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
  },
  title: {
    flex: 1,
  },
  containerDate: {
    flex: 7,
  },
  iconSearch: {
    flex: 1,
  },
  iconNotification: {
    flex: 1,
  },
  containerDateComponent: {
    flex: 1,
    flexDirection: "row",
  },
  pickedDateContainer: {
    flex: 2,
    paddingTop: 3,
    paddingLeft: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  iconDatePicker: {
    flex: 1,
  },
});
