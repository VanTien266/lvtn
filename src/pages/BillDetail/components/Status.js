import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Timeline from "react-native-timeline-flatlist";
import moment from "moment";

const Status = (props) => {
  const { billStatus } = props;

  let status = [];
  billStatus?.forEach((item, index, billStatus) => {
    let title;
    let description = "";
    let descStyle;
    let cỉcleDotStyle;
    switch (item.name) {
      case "exported":
        title = "Đã xuất";
        description = "Hóa đơn của bạn đã được xuất";
        descStyle = styles.exported;
        cỉcleDotStyle = "#CDAB34";
        break;
      case "shipping":
        title = "Đang vận chyển";
        description = "Hóa đơn bạn đang được vận chuyển";
        descStyle = styles.shipping;
        cỉcleDotStyle = "#747FFF";
        break;
      case "completed":
        title = "Hoàn tất";
        description = "Hóa đơn đã được vận chuyển thành công";
        descStyle = styles.completed;
        cỉcleDotStyle = "#5A9E4B";
        break;
      default:
        if (index === billStatus.length - 1) {
          title = "Thất bại";
          description = "Đơn hàng vận chuyển thất bại";
        } else {
          title = "Tái vận chuyển";
          description =
            "Đơn hàng vận chuyển thất bại, đang đợi vận chuyển lần tiếp theo";
        }
        descStyle = styles.failed;
        cỉcleDotStyle = "#BD2C2C";
        break;
    }
    if (index === billStatus.length - 1)
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
    else
      status.push({
        time: moment(item.date).format("DD/MM/YYYY"),
        title: title,
        description: description,
        timeStyle: styles.default,
        titleStyle: styles.default,
        descriptionStyle: styles.default,
      });
  });

  return (
    <Card style={styles.container} containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Trạng thái</Card.Title>
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
  exported: {
    color: "#CDAB34",
  },
  shipping: {
    color: "#747FFF",
  },
  completed: {
    color: "#5A9E4B",
  },
  failed: {
    color: "#BD2C2C",
  },
  default: { color: "#B4B4C1" },
});
