import React, { useState, useEffect } from "react";
import { Button, Input, Icon } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import orderApi from "../../api/orderApi";
import moment from "moment";
import transferOrderStatus from "../../utils/transferOrderStatus";

export default function OrderFilter({ navigation }) {
  const [fromDate, setFromDate] = useState(new Date(Date.now()));
  const [toDate, setToDate] = useState(new Date(Date.now()));
  const [statusFilter, setStatusFilter] = useState("");
  const [showFromPickerDate, setShowFromPickerDate] = useState(false);
  const [showToPickerDate, setShowToPickerDate] = useState(false);
  const [result, setResult] = useState([]);
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const fetchListOrder = async () => {
      try {
        const response = await orderApi.getAll();
        setListOrder(response);
        if (listOrder.length > 0 && statusFilter.length > 0) {
          const filterResult = listOrder.filter(
            (item) =>
              item.orderStatus[item.orderStatus.length - 1].name ===
              statusFilter
          );
          console.log(filterResult);
          setResult(filterResult);
        }
      } catch (error) {
        console.log("Failed to fetch order list", error);
      }
    };
    fetchListOrder();
  }, [statusFilter]);

  const showFromPicker = () => {
    setShowFromPickerDate(true);
    console.log(showFromPickerDate);
  };

  const showToPicker = () => {
    setShowToPickerDate(true);
    console.log(showToPickerDate);
  };

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromDate(currentDate);
    if (Platform.OS === "android") {
      setShowFromPickerDate(false);
    }
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setToDate(currentDate);
    if (Platform.OS === "android") {
      setShowToPickerDate(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statusFilterBox}>
        <View>
          <Text style={styles.filterTypeTxt}>Lọc theo trạng thái</Text>
        </View>
        <View style={styles.statusRow}>
          <TouchableOpacity
            style={[
              styles.statusBtn,
              statusFilter === "pending" && {
                backgroundColor: "#CDAB34",
                borderColor: "#CDAB34",
              },
            ]}
            onPress={() => setStatusFilter("pending")}
          >
            <Text style={styles.statusTxt}>Đợi xử lý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusBtn,
              statusFilter === "processing" && {
                backgroundColor: "#747FFF",
                borderColor: "#747FFF",
              },
            ]}
            onPress={() => setStatusFilter("processing")}
          >
            <Text style={styles.statusTxt}>Đang xử lý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusBtn,
              statusFilter === "completed" && {
                backgroundColor: "#5A9E4B",
                borderColor: "#5A9E4B",
              },
            ]}
            onPress={() => setStatusFilter("completed")}
          >
            <Text style={styles.statusTxt}>Hoàn tất</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusBtn,
              statusFilter === "cancel" && {
                backgroundColor: "#BD2C2C",
                borderColor: "#BD2C2C",
              },
            ]}
            onPress={() => setStatusFilter("cancel")}
          >
            <Text style={styles.statusTxt}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View>
          <Text style={styles.filterTypeTxt}>Lọc theo ngày</Text>
        </View>
        <View style={styles.dateRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dateTitleTxt}>Từ:</Text>
          </View>
          <View style={{ flex: 3, marginHorizontal: "1%" }}>
            <TouchableOpacity
              onPress={showFromPicker}
              style={styles.datePickerBtn}
            >
              <Text>{moment(fromDate.toUTCString()).format("DD/MM/YYYY")}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dateTitleTxt}>tới:</Text>
          </View>
          <View style={{ flex: 3, marginHorizontal: "1%" }}>
            <TouchableOpacity
              onPress={showToPicker}
              style={styles.datePickerBtn}
            >
              <Text>{moment(toDate.toUTCString()).format("DD/MM/YYYY")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showFromPickerDate && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="calendar"
            onChange={onChangeFromDate}
          />
        )}
        {showToPickerDate && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="calendar"
            onChange={onChangeToDate}
          />
        )}
      </View>
      <View style={styles.resultBox}>
        {result.length > 0 ? (
          result.map(
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
                    <Text style={styles.orderItemText}>
                      {order.clientID.name}
                    </Text>
                  </View>
                  <View style={[styles.verticalCenter, { flex: 4 }]}>
                    <Text style={styles.orderItemText}>
                      {order.receiverPhone}
                    </Text>
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
          )
        ) : (
          <View style={styles.noResultTxt}>
            <Text>Không có kết quả phù hợp</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  filterTypeTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000040",
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  statusFilterBox: {
    flex: 1,
  },
  statusBtn: {
    borderRadius: 4,
    borderColor: "#000040",
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    minHeight: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  statusTxt: {
    fontWeight: "500",
    color: "#000040",
  },
  dateTitleTxt: {
    fontWeight: "500",
  },
  dateRow: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  datePickerBtn: {
    borderWidth: 1,
    borderColor: "#000040",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  resultBox: {
    marginTop: 10,
  },
  noResultTxt: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});
