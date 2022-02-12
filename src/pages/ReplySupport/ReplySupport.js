import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function ReplySupport({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>Mã đơn đặt hàng: </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoValue}>MĐH1234</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>Tên khách hàng: </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoValue}>Trần Trọng Nghĩa</Text>
        </View>
      </View>
      <View style={styles.support}>
        <View>
          <Text style={styles.infoTitle}>Nội dung cần hỗ trợ: </Text>
        </View>
        <View>
          <Text style={styles.supportContent}>
            Nhân viên có thái độ không tốt đề nghị xem xét lại
          </Text>
        </View>
      </View>
      <View style={styles.reply}>
        <View>
          <Text style={styles.replyTitle}>Phản hồi: </Text>
        </View>
        <View style={styles.replyInpBox}>
          <TextInput editable numberOfLines={8} multiline />
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={{ flex: 8 }}></View>
        <Button style={styles.confirmBtn}>
          <Text style={styles.btnTitle}>Xác nhận</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 10,
  },
  infoRow: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  infoTitle: { color: "#000040", fontWeight: "700", fontSize: 14 },
  infoValue: {
    color: "#000040",
    fontWeight: "500",
    fontSize: 14,
  },
  supportContent: {
    marginTop: 10,
    paddingLeft: 5,
    color: "#000040",
    fontWeight: "500",
    fontSize: 14,
  },
  support: {
    marginTop: 10,
    marginBottom: 10,
  },
  reply: {
    marginTop: 10,
    marginBottom: 10,
  },
  replyTitle: {
    color: "#000040",
    fontWeight: "700",
    fontSize: 14,
  },
  replyInpBox: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#000040",
    borderRadius: 5,
  },
  confirmBtn: {
    backgroundColor: "#1B40FA",
    flex: 4,
  },
  btnTitle: {
    color: "#FFF",
  },
});
