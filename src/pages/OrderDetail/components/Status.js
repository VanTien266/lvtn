import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Timeline from "react-native-timeline-flatlist";

const Status = () => {
  const data = [
    {
      time: "09:00",
      title: "Đang đợi",
      description: "Đơn đặt hàng đang chờ xử lý",
    },
    {
      time: "10:45",
      title: "Đang xử lý",
      description: "Đơn đăt hàng đang được xử lý",
    },
    {
      time: "12:00",
      title: "Hoàn tất",
      description: "Đơn đặt hàng đã được xử lý hoàn tất",
    },
    {
      time: "14:00",
      title: "Đã hủy",
      description: "Đơn hàng đã bị hủy",
      timeStyle: styles.cancle,
      circleColor: "#BD2C2C",
      lineColor: "#BD2C2C",
      titleStyle: styles.cancle,
      descriptionStyle: styles.cancle,
    },
  ];
  return (
    <ScrollView>
      <Card>
        <Card.Title>Trạng thái</Card.Title>
        <Timeline
          data={data}
          circleColor="#B4B4C1"
          lineColor="#B4B4C1"
          descriptionStyle={styles.description}
          detailContainerStyle={{
            backgroundColor: "#F6F6F8",
            paddingLeft: 10,
            marginBottom: 5,
            borderRadius: 5,
          }}
        />
      </Card>
    </ScrollView>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
    width: "100%",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  description: {
    fontSize: 10,
  },
  wait: {
    color: "#CDAB34",
  },
  process: {
    color: "#747FFF",
  },
  complete: {
    color: "#5A9E4B",
  },
  cancle: {
    color: "#BD2C2C",
  },
});
