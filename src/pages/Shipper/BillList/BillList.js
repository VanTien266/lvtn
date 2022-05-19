import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import billApi from "../../../api/billApi";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const BillList = ({ navigation }) => {
  const [listBill, setListBill] = useState([]);

  //Get order list
  const fetchListBill = async () => {
    try {
      const response = await billApi.getUncomplete();
      setListBill(response);
    } catch (error) {
      console.log("Failed to fetch bill list", error);
    }
  };

  //refresh page by hand
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchListBill();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchListBill();
    });
    return unsubscribe;
  }, [navigation]);

  const [displaySearch, setDisplaySearch] = useState(false);
  let handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };
  useEffect(() => {
    fetchListBill();
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
        <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 3 }]}>
          <Text style={styles.headerText}>Mã hóa đơn</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Người nhận</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Số điện thoại</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 5 }]}>
          <Text style={styles.headerText}>Địa chỉ</Text>
        </View>
      </View>
      {listBill.map(
        (bill, idx) =>
          bill && (
            <TouchableOpacity
              style={styles.orderItem}
              key={idx}
              onPress={() => navigation.push("bill-detail", { bill: bill })}
            >
              <View
                style={[styles.verticalCenter, { paddingLeft: 5, flex: 3 }]}
              >
                <Text style={styles.orderItemText}>MHĐ{bill.billID}</Text>
              </View>
              <View style={[styles.verticalCenter, { flex: 4 }]}>
                <Text style={styles.orderItemText}>
                  {bill.orderID?.receiverName}
                </Text>
              </View>
              <View style={[styles.verticalCenter, { flex: 4 }]}>
                <Text style={styles.orderItemText}>
                  {bill.orderID?.receiverPhone}
                </Text>
              </View>
              <View style={[styles.verticalCenter, { flex: 5 }]}>
                <Text style={styles.orderItemText}>
                  {bill.orderID?.receiverAddress}
                </Text>
              </View>
            </TouchableOpacity>
          )
      )}
    </ScrollView>
  );
};

export default BillList;

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
