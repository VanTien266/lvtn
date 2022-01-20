import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Timeline from "react-native-timeline-flatlist";

const Status = () => {
  const data = [
    {
      time: "09:00",
      title: "Đã xuất",
      description: "Hóa đơn đã được tạo",
    },
    {
      time: "10:45",
      title: "Đang vận chuyển",
      description: "Hóa đơn đang vận chuyển đến khách hàng",
    },
    {
      time: "12:00",
      title: "Hoàn tất",
      description: "Hóa đơn đã được vận chuyển thành công",
    },
    {
      time: "14:00",
      title: "Thất bại",
      description: "Hóa đơn vận chuyển thất bại",
      timeStyle: styles.cancle,
      circleColor: "#BD2C2C",
      lineColor: "#BD2C2C",
      titleStyle: styles.cancle,
      descriptionStyle: styles.cancle,
    },
  ];
  return (
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
