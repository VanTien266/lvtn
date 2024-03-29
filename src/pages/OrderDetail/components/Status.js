import moment from "moment";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, ScrollView } from "native-base";
import { Card } from "react-native-elements";
import Timeline from "react-native-timeline-flatlist";
import Icon from "react-native-vector-icons/MaterialIcons";
import orderApi from "../../../api/orderApi";

const Status = (props) => {
  const { navigation, orderId } = props;
  const [order, setOrder] = useState({});

  //get order data
  const fetchOrderDetail = async () => {
    const response = await orderApi.getOne(orderId);
    setOrder(response);
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const { detailBill, orderStatus } = order;

  let status = [];
  orderStatus?.forEach((item, index) => {
    let title;
    let description = "";
    let descStyle;
    let cỉcleDotStyle;
    let icon;
    switch (item.name) {
      case "pending":
        title = "Đang đợi";
        if (index !== 0) {
          description = `Hoàn tất đơn MHD ${
            detailBill[Math.floor((index - 1) / 2)]?.billID
          }\nĐợi xử lý các đơn còn lại`;
        } else {
          description = "Đơn hàng đang đợi xử lý";
        }
        icon = <Icon name="hourglass-bottom" size={12} color="#fff" />;
        descStyle = styles.wait;
        cỉcleDotStyle = "#CDAB34";
        break;
      case "processing":
        title = "Đang xử lý";
        if (index === orderStatus.length - 1) {
          description = "Nhân viên đang xử lý đơn đặt hàng";
        } else {
          description = `Đang xử lý đơn hàng MHD${
            detailBill[Math.floor(index / 2)]?.billID
          }`;
        }
        icon = <Icon name="done" size={12} color="#fff" />;
        descStyle = styles.process;
        cỉcleDotStyle = "#747FFF";
        break;
      case "completed":
        title = "Hoàn tất";
        description = "Đơn hàng xử lý hoàn tất";
        descStyle = styles.complete;
        cỉcleDotStyle = "#5A9E4B";
        break;
      default:
        title = "Thất bại";
        icon = <Icon name="close" size={12} color="#fff" />;
        description = "Đơn hàng bị hủy";
        descStyle = styles.cancle;
        cỉcleDotStyle = "#BD2C2C";
        break;
    }
    if (index > orderStatus.length - 4)
      if (index === orderStatus.length - 1)
        status.push({
          time: moment(item.date).format("DD/MM/YYYY"),
          title: title,
          description: description,
          timeStyle: descStyle,
          titleStyle: descStyle,
          descriptionStyle: descStyle,
          circleColor: cỉcleDotStyle,
          lineColor: cỉcleDotStyle,
          icon: icon,
        });
      else
        status.push({
          time: moment(item.date).format("DD/MM/YYYY"),
          title: title,
          description: description,
          timeStyle: styles.default,
          titleStyle: styles.default,
          descriptionStyle: styles.default,
          icon: icon,
        });
  });

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Trạng thái</Card.Title>
      {orderStatus?.length > 3 && (
        <Button
          variant="link"
          onPress={() =>
            navigation.navigate("status-detail", {
              orderStatus: orderStatus,
              detailBill: detailBill,
            })
          }
        >
          Chi tiết
        </Button>
      )}
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
          innerCircle="icon"
        />
      </ScrollView>
    </Card>
  );
};

export default Status;

const styles = StyleSheet.create({
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
  default: { color: "#B4B4C1" },
});
