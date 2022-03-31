import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import billApi from "../../../api/billApi";

const ChartBillStatus = (props) => {
  const [billstatus, setBillStatus] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBillStatus = async () => {
      try {
        const response = await billApi.getBillStatus(
          props.date.toISOString().slice(0, 10)
        );
        console.log(response);
        setBillStatus(response);
      } catch (error) {
        console.log("Failed to fetch bill status", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillStatus();
  }, [props.date]);
  const CountBill = [];
  const length = billstatus.length;
  billstatus.forEach(function (item) {
    CountBill.push(item.lastStatusBill);
  });
  const completedBill = CountBill[0];
  const exportedBill = CountBill[1];
  const failedBill = CountBill[2];
  const shippingBill = CountBill[3];
  console.log("Result:", completedBill, exportedBill, failedBill, shippingBill);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Tình trạng xử lý hóa đơn bán hàng</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : length > 0 ? (
            <PieChart
              data={[
                {
                  name: "Hoàn tất",
                  myCountBill: completedBill,
                  color: "#4caf50",
                  legendFontColor: "#4caf50",
                  legendFontSize: 13,
                },
                {
                  name: "Đã xuất",
                  myCountBill: exportedBill,
                  color: "#f8ca00",
                  legendFontColor: "#f8ca00",
                  legendFontSize: 13,
                },
                {
                  name: "Đang vận chuyển",
                  myCountBill: shippingBill,
                  color: "#2196f3",
                  legendFontColor: "#2196f3",
                  legendFontSize: 13,
                },
                {
                  name: "Thất bại",
                  myCountBill: failedBill,
                  color: "#f44336",
                  legendFontColor: "#f44336",
                  legendFontSize: 13,
                },
              ]}
              width={Dimensions.get("window").width - 16}
              height={220}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              accessor="myCountBill"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute //for the absolute number remove if you want percentage
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Không có dữ liệu để hiển thị
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChartBillStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    //   padding: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 16,
    padding: 10,
    marginTop: 10,
  },
  noDataContainer: {
    borderWidth: 1,
    borderColor: "#000",
    width: 300,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#efefef",
  },
});
