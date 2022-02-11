import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SupportList({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerList}>
        <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}>
          <Text style={styles.headerText}>Đơn đặt hàng</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 5 }]}>
          <Text style={styles.headerText}>Khách hàng</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 3 }]}>
          <Text style={styles.headerText}>Số điện thoại</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => navigation.push("support-reply")}
      >
        <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}>
          <Text style={styles.orderItemText}>MHĐ13567</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 5 }]}>
          <Text style={styles.orderItemText}>Trần Trọng Nghĩa</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 3 }]}>
          <Text style={styles.orderItemText}>0123456789</Text>
        </View>
      </TouchableOpacity>
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
