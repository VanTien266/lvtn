import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import Timeline from "react-native-timeline-flatlist";
import { Button } from "native-base";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Status = (props) => {
  const { billStatus } = props;
  const navigation = useNavigation();

  let status = [];
  let counter = 0;

  billStatus?.forEach((item, index, billStatus) => {
    let title;
    let description = "";
    let descStyle;
    let cỉcleDotStyle;
    let icon;
    switch (item.name) {
      case "exported":
        title = "Đã xuất";
        description = "Hóa đơn của bạn đã được xuất";
        descStyle = styles.exported;
        cỉcleDotStyle = "#CDAB34";
        icon = <Icon name="file-upload" size={12} color="#fff" />;
        break;
      case "shipping":
        if (counter < 1) {
          title = "Đang vận chyển";
          description = "Hóa đơn bạn đang được vận chuyển";
        } else {
          title = `Đang vận chyển lần ${counter + 1}`;
          description = ` Hóa đơn bạn đang được vận chuyển lần ${counter + 1}`;
        }
        descStyle = styles.shipping;
        cỉcleDotStyle = "#747FFF";
        icon = <Icon name="local-shipping" size={12} color="#fff" />;
        break;
      case "completed":
        title = "Hoàn tất";
        description = "Hóa đơn đã được vận chuyển thành công";
        descStyle = styles.completed;
        cỉcleDotStyle = "#5A9E4B";
        icon = <Icon name="done" size={12} color="#fff" />;
        break;
      default:
        if (counter >= 2) {
          title = "Thất bại";
          description = `Đơn hàng vận chuyển thất bại\nTiến hành hoàn kho`;
        } else {
          counter += 1;
          title = `Tái vận chuyển lần ${counter + 1}`;
          description = `Đơn hàng vận chuyển thất bại, đang đợi vận chuyển lần ${
            counter + 1
          }\n Lý do: ${item.reason}`;
        }
        descStyle = styles.failed;
        cỉcleDotStyle = "#BD2C2C";
        icon = <Icon name="close" size={12} color="#fff" />;
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
    <Card style={styles.container} containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Trạng thái</Card.Title>
      {billStatus?.length > 3 && (
        <Button
          variant="link"
          onPress={() =>
            navigation.navigate("bill-status-detail", {
              billStatus: billStatus,
            })
          }
        >
          Chi tiết
        </Button>
      )}
      <Timeline
        data={status.slice(status.length - 3, status.length)}
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
