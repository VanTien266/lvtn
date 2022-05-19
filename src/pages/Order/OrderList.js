import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import orderApi from "../../api/orderApi";
import transferOrderStatus from "../../utils/transferOrderStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const OrderList = ({ navigation }) => {
  const [listOrder, setListOrder] = useState([
    { orderId: "", clientID: { name: "" }, receiverPhone: "" },
  ]);
  const { role, user } = useSelector((state) => state.session);
  //Get order list
  const fetchListOrder = async () => {
    try {
      let response;
      if (role === "SALESMAN") {
        response = await orderApi.getAll();
      }
      if (role === "USER") {
        response = await orderApi.getOrderIdByCustomer(user._id);
      }
      setListOrder(response);
    } catch (error) {
      console.log("Failed to fetch order list", error);
    }
  };

  //refresh page
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (role !== "GUEST") fetchListOrder();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (role !== "GUEST") fetchListOrder();
    });
    return unsubscribe;
  }, [navigation]);

  const [displaySearch, setDisplaySearch] = useState(false);
  let handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };

  useEffect(() => {
    if (role !== "GUEST") fetchListOrder();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.headerList}>
        <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}>
          <Text style={styles.headerText}>Mã hóa đơn</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Người nhận</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Số điện thoại</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Trạng thái</Text>
        </View>
      </View>
      {listOrder.map(
        (order, idx) =>
          order.orderStatus && (
            <TouchableOpacity
              style={styles.orderItem}
              key={idx}
              onPress={() =>
                navigation.push("order-detail", { orderId: order._id })
              }
            >
              <View
                style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}
              >
                <Text style={styles.orderItemText}>MHĐ{order.orderId}</Text>
              </View>
              <View style={[styles.verticalCenter, { flex: 4 }]}>
                <Text style={styles.orderItemText}>{order.clientID.name}</Text>
              </View>
              <View style={[styles.verticalCenter, { flex: 4 }]}>
                <Text style={styles.orderItemText}>{order.receiverPhone}</Text>
              </View>
              <View style={[styles.verticalCenter, { flex: 4 }]}>
                <Text
                  style={[
                    styles.orderItemText,
                    transferOrderStatus(
                      order.orderStatus[order.orderStatus.length - 1].name
                    ).style,
                  ]}
                >
                  {
                    transferOrderStatus(
                      order.orderStatus[order.orderStatus.length - 1].name
                    ).name
                  }
                </Text>
              </View>
            </TouchableOpacity>
          )
      )}
    </ScrollView>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFF",
  },
  headerList: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#B4B4C1",
    borderRadius: 5,
    minHeight: 30,
    marginTop: 10,
    marginBottom: 5,
  },
  headerText: {
    fontFamily: "Roboto",
    color: "#000040",
    fontWeight: "600",
    fontSize: 12,
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
    fontFamily: "Roboto",
    color: "#000040",
    fontSize: 12,
  },
  pageTitle: {
    fontFamily: "Roboto",
    color: "#000040",
    fontSize: 14,
    fontWeight: "600",
  },
  titleBar: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    marginEnd: "auto",
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconBtnBar: {
    marginLeft: 5,
    marginRight: 5,
  },
});
