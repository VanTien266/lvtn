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
  let completedBill;
  let exportedBill;
  let failedBill;
  let shippingBill;
  if (length === 1) {
    if (billstatus[0]._id === "completed") {
      completedBill = billstatus[0].lastStatusBill;
      exportedBill = failedBill = shippingBill = 0;
    } else if (billstatus[0]._id === "exported") {
      exportedBill = billstatus[0].lastStatusBill;
      completedBill = failedBill = shippingBill = 0;
    } else if (billstatus[0]._id === "failed") {
      failedBill = billstatus[0].lastStatusBill;
      completedBill = exportedBill = shippingBill = 0;
    } else {
      shippingBill = billstatus[0].lastStatusBill;
      completedBill = exportedBill = failedBill = 0;
    }
  } else if (length === 2) {
    if (billstatus[0]._id === "completed" && billstatus[1]._id === "exported") {
      completedBill = billstatus[0].lastStatusBill;
      exportedBill = billstatus[1].lastStatusBill;
      failedBill = shippingBill = 0;
    } else if (
      billstatus[0]._id === "completed" &&
      billstatus[1]._id === "failed"
    ) {
      completedBill = billstatus[0].lastStatusBill;
      failedBill = billstatus[1].lastStatusBill;
      shippingBill = exportedBill = 0;
    } else if (
      billstatus[0]._id === "completed" &&
      billstatus[1]._id === "shipping"
    ) {
      completedBill = billstatus[0].lastStatusBill;
      shippingBill = billstatus[1].lastStatusBill;
      failedBill = exportedBill = 0;
    } else if (
      billstatus[0]._id === "exported" &&
      billstatus[1]._id === "failed"
    ) {
      exportedBill = billstatus[0].lastStatusBill;
      failedBill = billstatus[1].lastStatusBill;
      completedBill = shippingBill = 0;
    } else if (
      billstatus[0]._id === "exported" &&
      billstatus[1]._id === "shipping"
    ) {
      exportedBill = billstatus[0].lastStatusBill;
      shippingBill = billstatus[1].lastStatusBill;
      completedBill = failedBill = 0;
    } else if (
      billstatus[0]._id === "failed" &&
      billstatus[1]._id === "shipping"
    ) {
      failedBill = billstatus[0].lastStatusBill;
      shippingBill = billstatus[1].lastStatusBill;
      completedBill = exportedBill = 0;
    }
  } else if (length === 3) {
    if (
      billstatus[0]._id === "completed" &&
      billstatus[1]._id === "exported" &&
      billstatus[2]._id === "failed"
    ) {
      completedBill = billstatus[0].lastStatusBill;
      exportedBill = billstatus[1].lastStatusBill;
      failedBill = billstatus[2].lastStatusBill;
      shippingBill = 0;
    } else if (
      billstatus[0]._id === "completed" &&
      billstatus[1]._id === "exported" &&
      billstatus[2]._id === "shipping"
    ) {
      completedBill = billstatus[0].lastStatusBill;
      exportedBill = billstatus[1].lastStatusBill;
      shippingBill = billstatus[2].lastStatusBill;
      failedBill = 0;
    } else if (
      billstatus[0]._id === "completed" &&
      billstatus[1]._id === "failed" &&
      billstatus[2]._id === "shipping"
    ) {
      completedBill = billstatus[0].lastStatusBill;
      failedBill = billstatus[1].lastStatusBill;
      shippingBill = billstatus[2].lastStatusBill;
      exportedBill = 0;
    } else if (
      billstatus[0]._id === "exported" &&
      billstatus[1]._id === "failed" &&
      billstatus[2]._id === "shipping"
    ) {
      exportedBill = billstatus[0].lastStatusBill;
      failedBill = billstatus[1].lastStatusBill;
      shippingBill = billstatus[2].lastStatusBill;
      completedBill = 0;
    }
  } else {
    billstatus.forEach(function (item) {
      CountBill.push(item.lastStatusBill);
    });
    completedBill = CountBill[0];
    exportedBill = CountBill[1];
    failedBill = CountBill[2];
    shippingBill = CountBill[3];
  }
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
                  name: "Đã xuất",
                  myCountBill: exportedBill,
                  color: "#f8ca00",
                  legendFontColor: "#f8ca00",
                  legendFontSize: 13,
                },
                {
                  name: "Đang vận chuyển",
                  myCountBill: shippingBill,
                  color: "#F0622F",
                  legendFontColor: "#F0622F",
                  legendFontSize: 13,
                },
                {
                  name: "Thành công",
                  myCountBill: completedBill,
                  color: "#4caf50",
                  legendFontColor: "#4caf50",
                  legendFontSize: 13,
                },
                {
                  name: "Thất bại",
                  myCountBill: failedBill,
                  color: "#FF0000",
                  legendFontColor: "#FF0000",
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

export default React.memo(ChartBillStatus);

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
