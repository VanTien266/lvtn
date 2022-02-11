import moment from "moment";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Timeline from "react-native-timeline-flatlist";

const Status = (props) => {
  const { orderStatus } = props;
  let status = [];
  orderStatus?.forEach((item) => {
    let title;
    let description = "";
    let descStyle;
    let cỉcleDotStyle;
    switch (item.name) {
      case "pending":
        title = "Đang đợi";
        description = "Đơn hàng đang đợi xử lý";
        descStyle = styles.wait;
        cỉcleDotStyle = "#CDAB34";
        break;
      case "processing":
        title = "Đang xử lý";
        description = "Đang xử lý đơn hàng";
        descStyle = styles.process;
        cỉcleDotStyle = "#747FFF";
        break;
      case "success":
        title = "Hoàn tất";
        description = "Đơn hàng xử lý hoàn tất";
        descStyle = styles.complete;
        cỉcleDotStyle = "#5A9E4B";
        break;
      default:
        title = "Thất bại";
        description = "Đơn hàng bị hủy";
        descStyle = styles.cancle;
        cỉcleDotStyle = "#BD2C2C";
        break;
    }
    status.push({
      time: moment(item.date).format("DD/MM/YYYY"),
      title: title,
      description: description,
      timeStyle: descStyle,
      titleStyle: descStyle,
      descriptionStyle: descStyle,
      circleColor: cỉcleDotStyle,
      lineColor: cỉcleDotStyle,
    });
  });
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
    // {
    //   time: "12:00",
    //   title: "Hoàn tất",
    //   description: "Đơn đặt hàng đã được xử lý hoàn tất",
    // },
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
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Trạng thái</Card.Title>
      <ScrollView style={styles.container}>
        <Timeline
          data={status}
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
      </ScrollView>
    </Card>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: { display: "flex", width: "100%" },
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
