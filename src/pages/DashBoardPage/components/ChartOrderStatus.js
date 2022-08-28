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
import orderApi from "../../../api/orderApi";

const ChartOrderStatus = (props) => {
  const [orderstatus, setOrderStatus] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await orderApi.getOrderStatus(
          props.date.toISOString().slice(0, 10)
        );
        setOrderStatus(response);
      } catch (error) {
        console.log("Failed to order status", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderStatus();
  }, [props.date]);
  // const CountOrder = [];
  // const length = orderstatus.length;
  // let cancelOrder;
  // if (length === 1) {
  //   if (orderstatus[0]._id === "cancel") {
  //     cancelOrder = orderstatus[0].lastStatusOrder;
  //     completedOrder = 0;
  //     pendingOrder = 0;
  //   } else if (orderstatus[0]._id === "completed") {
  //     completedOrder = orderstatus[0].lastStatusOrder;
  //     cancelOrder = 0;
  //     pendingOrder = 0;
  //   } else if (orderstatus[0]._id === "pending") {
  //     pendingOrder = orderstatus[0].lastStatusOrder;
  //     cancelOrder = 0;
  //     completedOrder = 0;
  //   }
  // } else if (length === 2) {
  //   if (orderstatus[0]._id === "cancel" && orderstatus[1]._id === "completed") {
  //     cancelOrder = orderstatus[0].lastStatusOrder;
  //     completedOrder = orderstatus[1].lastStatusOrder;
  //     pendingOrder = 0;
  //   } else if (
  //     orderstatus[0]._id === "completed" &&
  //     orderstatus[1]._id === "pending"
  //   ) {
  //     completedOrder = orderstatus[0].lastStatusOrder;
  //     cancelOrder = 0;
  //     pendingOrder = orderstatus[1].lastStatusOrder;
  //   } else if (
  //     orderstatus[0]._id === "cancel" &&
  //     orderstatus[1]._id === "pending"
  //   ) {
  //     pendingOrder = orderstatus[1].lastStatusOrder;
  //     cancelOrder = orderstatus[0].lastStatusOrder;
  //     completedOrder = 0;
  //   }
  // } else {
  //   orderstatus.forEach(function (item) {
  //     CountOrder.push(item.lastStatusOrder);
  //   });
  //   cancelOrder = CountOrder[0];
  //   completedOrder = CountOrder[1];
  //   pendingOrder = CountOrder[2];
  // }
  const CountOrder = [];
  const length = orderstatus.length;
  let cancelOrder;
  let completedOrder;
  let pendingOrder;
  let processingOrder;
  if (length === 1) {
    if (orderstatus[0]._id === "cancel") {
      cancelOrder = orderstatus[0].lastStatusOrder;
      completedOrder = pendingOrder = processingOrder = 0;
    } else if (orderstatus[0]._id === "completed") {
      completedOrder = orderstatus[0].lastStatusOrder;
      cancelOrder = pendingOrder = processingOrder = 0;
    } else if (orderstatus[0]._id === "pending") {
      pendingOrder = orderstatus[0].lastStatusOrder;
      cancelOrder = completedOrder = processingOrder = 0;
    } else {
      processingOrder = orderstatus[0].lastStatusOrder;
      cancelOrder = completedOrder = pendingOrder = 0;
    }
  } else if (length === 2) {
    if (orderstatus[0]._id === "cancel" && orderstatus[1]._id === "completed") {
      cancelOrder = orderstatus[0].lastStatusOrder;
      completedOrder = orderstatus[1].lastStatusOrder;
      pendingOrder = processingOrder = 0;
    } else if (
      orderstatus[0]._id === "cancel" &&
      orderstatus[1]._id === "pending"
    ) {
      cancelOrder = orderstatus[0].lastStatusOrder;
      pendingOrder = orderstatus[1].lastStatusOrder;
      completedOrder = processingOrder = 0;
    } else if (
      orderstatus[0]._id === "cancel" &&
      orderstatus[1]._id === "processing"
    ) {
      cancelOrder = orderstatus[0].lastStatusOrder;
      processingOrder = orderstatus[1].lastStatusOrder;
      completedOrder = pendingOrder = 0;
    } else if (
      orderstatus[0]._id === "completed" &&
      orderstatus[1]._id === "pending"
    ) {
      completedOrder = orderstatus[0].lastStatusOrder;
      pendingOrder = orderstatus[1].lastStatusOrder;
      cancelOrder = processingOrder = 0;
    } else if (
      orderstatus[0]._id === "completed" &&
      orderstatus[1]._id === "processing"
    ) {
      completedOrder = orderstatus[0].lastStatusOrder;
      processingOrder = orderstatus[1].lastStatusOrder;
      cancelOrder = pendingOrder = 0;
    } else if (
      orderstatus[0]._id === "pending" &&
      orderstatus[1]._id === "processing"
    ) {
      pendingOrder = orderstatus[0].lastStatusOrder;
      processingOrder = orderstatus[1].lastStatusOrder;
      cancelOrder = completedOrder = 0;
    }
  } else if (length === 3) {
    if (
      orderstatus[0]._id === "cancel" &&
      orderstatus[1]._id === "completed" &&
      orderstatus[2]._id === "pending"
    ) {
      cancelOrder = orderstatus[0].lastStatusOrder;
      completedOrder = orderstatus[1].lastStatusOrder;
      pendingOrder = orderstatus[2].lastStatusOrder;
      processingOrder = 0;
    } else if (
      orderstatus[0]._id === "cancel" &&
      orderstatus[1]._id === "completed" &&
      orderstatus[2]._id === "processing"
    ) {
      cancelOrder = orderstatus[0].lastStatusOrder;
      completedOrder = orderstatus[1].lastStatusOrder;
      processingOrder = orderstatus[2].lastStatusOrder;
      pendingOrder = 0;
    } else if (
      orderstatus[0]._id === "completed" &&
      orderstatus[1]._id === "pending" &&
      orderstatus[2]._id === "processing"
    ) {
      completedOrder = orderstatus[0].lastStatusOrder;
      pendingOrder = orderstatus[1].lastStatusOrder;
      processingOrder = orderstatus[2].lastStatusOrder;
      cancelOrder = 0;
    } else if (
      orderstatus[0]._id === "cancel" &&
      orderstatus[1]._id === "pending" &&
      orderstatus[2]._id === "processing"
    ) {
      cancelOrder = orderstatus[0].lastStatusOrder;
      pendingOrder = orderstatus[1].lastStatusOrder;
      processingOrder = orderstatus[2].lastStatusOrder;
      completedOrder = 0;
    }
  } else {
    orderstatus.forEach(function (item) {
      CountOrder.push(item.lastStatusOrder);
    });
    cancelOrder = CountOrder[0];
    completedOrder = CountOrder[1];
    pendingOrder = CountOrder[2];
    processingOrder = CountOrder[3];
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Tình trạng xử lý đơn đặt hàng</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : length > 0 ? (
            <PieChart
              data={[
                {
                  name: "Đợi xử lý",
                  myCountOrder: pendingOrder,
                  color: "#f8ca00",
                  legendFontColor: "#f8ca00",
                  legendFontSize: 13,
                },
                {
                  name: "Đang xử lý",
                  myCountOrder: processingOrder,
                  color: "#F0622F",
                  legendFontColor: "#F0622F",
                  legendFontSize: 13,
                },
                {
                  name: "Hoàn tất",
                  myCountOrder: completedOrder,
                  color: "#4caf50",
                  legendFontColor: "#4caf50",
                  legendFontSize: 13,
                },
                {
                  name: "Đã Hủy",
                  myCountOrder: cancelOrder,
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
              accessor="myCountOrder"
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

export default React.memo(ChartOrderStatus);

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
