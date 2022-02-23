import React, { useState, useEffect } from "react";
import { Button, Input, Icon } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export default function OrderFilter() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("");
  const [showFromPickerDate, setShowFromPickerDate] = useState(false);
  const [showToPickerDate, setShowToPickerDate] = useState(false);
  const showFromPicker = () => {
    setShowFromPickerDate(true);
  };

  const showToPicker = () => {
    setShowToPickerDate(true);
  };

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShow(Platform.OS === "android");
    setFromDate(currentDate);
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShow(Platform.OS === "android");
    setToDate(currentDate);
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
            <Text style={styles.statusTxt}>Chờ xử lý</Text>
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
            <Text style={styles.statusTxt}>Đã xử lý</Text>
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
        <View>
          <Text>Từ:</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => showFromPicker}>
            <Text>{fromDate}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>tới:</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => showToPicker}>
            <Text>{toDate}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={fromDate}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChangeFromDate}
      />
      <DateTimePicker
        testID="dateTimePicker"
        value={toDate}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChangeToDate}
      />
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
});
