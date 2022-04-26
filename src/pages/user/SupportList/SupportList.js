import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Button } from "native-base";
import supportApi from "../../../api/supportApi";
import { useSelector } from "react-redux";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SupportList({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [listSupportReq, setListSupportReq] = useState([]);
  const { role } = useSelector((state) => state.session);

  useEffect(() => {
    let mounted = true;
    const getListSupportReq = async () => {
      const response = await supportApi.getAll();
      setListSupportReq(response);
    };
    if (mounted && role !== "GUEST") {
      getListSupportReq();
    }
    return () => (mounted = false);
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {role === "USER" && (
        <Button onPress={() => navigation.navigate("create-request")}>
          Gửi yêu cầu
        </Button>
      )}
      <View style={styles.headerList}>
        <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 2 }]}>
          <Text style={styles.headerText}>Mã</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 3 }]}>
          <Text style={styles.headerText}>Đơn hàng</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Khách hàng</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Số điện thoại</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 3 }]}>
          <Text style={styles.headerText}>Trạng tháii</Text>
        </View>
      </View>
      {listSupportReq &&
        listSupportReq.map((item, index) => (
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.push("support-reply", { item: item })}
            key={index}
          >
            <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 2 }]}>
              <Text style={styles.orderItemText}>{item?.supportId}</Text>
            </View>
            <View style={[styles.verticalCenter, { flex: 3 }]}>
              <Text style={styles.orderItemText}>MHĐ{item?.order.orderId}</Text>
            </View>
            <View style={[styles.verticalCenter, { flex: 4 }]}>
              <Text style={styles.orderItemText}>{item?.customer.name}</Text>
            </View>
            <View style={[styles.verticalCenter, { flex: 4 }]}>
              <Text style={styles.orderItemText}>{item?.customer.phone}</Text>
            </View>
            <View style={[styles.verticalCenter, { flex: 3 }]}>
              <Text
                style={[
                  styles.orderItemText,
                  { fontWeight: "bold" },
                  item.status
                    ? { color: "rgb(90, 158, 75)" }
                    : { color: "rgb(209, 148, 49)" },
                ]}
              >
                {item?.status ? "Xong" : "Chưa"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

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
