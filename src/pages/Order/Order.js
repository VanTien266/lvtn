import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Order = () => {
  const [listOrder, setListOrder] = useState([
    { orderId: "", clientID: { name: "" }, receiverPhone: "" },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/order")
      .then((response) => response.json())
      .then((data) => {
        setListOrder(data);
      });
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleBar}>
        <View style={styles.title}>
          <Text style={styles.pageTitle}>Danh sách đơn hàng</Text>
        </View>
        <TouchableOpacity style={styles.iconBtnBar}>
          <Ionicons name="filter" size={24} color="#000040" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtnBar}>
          <Ionicons name="notifications" size={24} color="#000040" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtnBar} onPress={handleDisplaySearch}>
          <Ionicons name="search-sharp" size={24} color="#000040" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerList}>
        <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}>
          <Text style={styles.headerText}>Mã hóa đơn</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 5 }]}>
          <Text style={styles.headerText}>Người nhận</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 3 }]}>
          <Text style={styles.headerText}>Số điện thoại</Text>
        </View>
      </View>
      {listOrder.map((order, idx) => (
        <TouchableOpacity style={styles.orderItem} key={idx}>
          <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}>
            <Text style={styles.orderItemText}>MHĐ{order.orderId}</Text>
          </View>
          <View style={[styles.verticalCenter, { flex: 5 }]}>
            <Text style={styles.orderItemText}>{order.clientID.name}</Text>
          </View>
          <View style={[styles.verticalCenter, { flex: 3 }]}>
            <Text style={styles.orderItemText}>{order.receiverPhone}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
    fontFamily: "'Roboto', sans-serif",
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
    fontFamily: "'Roboto', sans-serif",
    color: "#000040",
    fontSize: 12,
  },
  pageTitle: {
    fontFamily: "'Roboto', sans-serif",
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
    direction: "row",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconBtnBar: {
    marginLeft: 5,
    marginRight: 5,
  },
});
