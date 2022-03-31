import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import orderApi from "../../../api/orderApi";

const ChartOrderMonthly = (props) => {
  const [orderstatus, setOrderStatus] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await orderApi.countOrderDailyMonthly(
          props.date.toISOString().slice(0, 10)
        );
        console.log(response);
        setOrderStatus(response);
      } catch (error) {
        console.log("Failed to order daily monthly", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderStatus();
  }, [props.date]);
  const OrderDailyLabel = [];
  const OrderDailyData = [];
  const length = orderstatus.length;
  orderstatus.forEach(function (item) {
    OrderDailyLabel.push(item._id.date);
    OrderDailyData.push(item.Total);
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Biểu đồ đơn đặt hàng</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : length > 0 ? (
            <LineChart
              data={{
                labels: OrderDailyLabel,
                datasets: [
                  {
                    data: OrderDailyData,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={Dimensions.get("window").width - 16}
              height={220}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={{fontSize: 16, fontWeight: "bold" }}>Không có dữ liệu để hiển thị</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChartOrderMonthly;

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
