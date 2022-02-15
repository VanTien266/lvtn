import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon } from "native-base";
import orderApi from "../../api/orderApi";
import transferOrderStatus from "../../utils/transferOrderStatus";

const OrderList = ({ navigation }) => {
  const [listOrder, setListOrder] = useState([
    { orderId: "", clientID: { name: "" }, receiverPhone: "" },
  ]);
  const [displaySearch, setDisplaySearch] = useState(false);
  let handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };
  useEffect(() => {
    const fetchListOrder = async () => {
      try {
        const response = await orderApi.getAll();
        setListOrder(response);
      } catch (error) {
        console.log("Failed to fetch bill complete count", error);
      }
    };
    fetchListOrder();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.titleBar}>
        <TouchableOpacity style={styles.iconBtnBar}>
          <Ionicons name="filter" size={24} color="#000040" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtnBar}>
          <Ionicons name="notifications" size={24} color="#000040" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtnBar}
          onPress={handleDisplaySearch}
        >
          <Ionicons name="search-sharp" size={24} color="#000040" />
        </TouchableOpacity>
      </View>
      {displaySearch && (
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          bg="gray.100"
          borderRadius="5"
          py="1"
          px="2"
          placeholderTextColor="gray.500"
          _hover={{ bg: "gray.200", borderWidth: 0 }}
          borderWidth="0"
          _web={{
            _focus: { style: { boxShadow: "none" } },
          }}
          InputLeftElement={
            <Icon
              ml="2"
              size="5"
              color="gray.500"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      )} */}
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
