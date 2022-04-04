import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, TextArea, useToast } from "native-base";
import { useSelector } from "react-redux";
import supportApi from "../../api/supportApi";

export default function ReplySupport({ route, navigation }) {
  const { item } = route.params;
  const [response, setResponse] = useState("");
  const { role } = useSelector((state) => state.session);
  const toast = useToast();

  const handleResponse = () => {
    supportApi.response({ _id: item._id, content: response });
    toast.show({
      title: "Đã gửi",
      placement: "bottom",
    });
    navigation.navigate("support-list");
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>Mã đơn đặt hàng: </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoValue}>MHĐ{item?.order.orderId}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>Tên khách hàng: </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoValue}>{item?.customer.name}</Text>
        </View>
      </View>
      <View style={styles.support}>
        <View>
          <Text style={styles.infoTitle}>Nội dung cần hỗ trợ: </Text>
        </View>
        <View>
          <Text style={styles.supportContent}>{item?.request}</Text>
        </View>
      </View>
      <View style={styles.reply}>
        <View>
          <Text style={styles.replyTitle}>Phản hồi: </Text>
        </View>
        <View style={styles.replyInpBox}>
          <TextArea
            placeholder={item?.response}
            isDisabled={item.status || role === "USER" || role === "GUEST"}
            onChangeText={(value) => setResponse(value)}
          />
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={{ flex: 8 }}></View>
        {role === "SALESMAN" && (
          <Button style={styles.confirmBtn} onPress={() => handleResponse()}>
            <Text style={styles.btnTitle}>Xác nhận</Text>
          </Button>
        )}
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
