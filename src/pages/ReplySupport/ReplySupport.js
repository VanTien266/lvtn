import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReplySupport({ navigation }) {
  return (
    <View>
      <View style={styles.infoRow}>
        <View style={{ flex: 6 }}>
          <Text style={styles.infoTitle}>Mã đơn đặt hàng: </Text>
        </View>
        <View style={{ flex: 6 }}>
          <Text style={styles.infoValue}>MĐH1234</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={{ flex: 6 }}>
          <Text style={styles.infoTitle}>Tên khách hàng: </Text>
        </View>
        <View style={{ flex: 6 }}>
          <Text style={styles.infoValue}>Trần Trọng Nghĩa</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View>
          <Text style={styles.infoTitle}>Nội dung cần hỗ trợ</Text>
        </View>
        <View>
          <Text>Nhân viên có thái độ không tốt đề nghị xem xét lại</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoRow: { flex: 1, flexDirection: "row", paddingLeft: 20, marginTop: 10, marginBottom: 10 },
  infoTitle: { color: "#000040", fontWeight: "700", fontSize: 14 },
  infoValue: {
    color: "#000040",
    fontWeight: "500",
    fontSize: 14,
  },
});
