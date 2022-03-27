import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Flex, FlatList, Button, Text } from "native-base";
import { Card } from "react-native-elements";
import moment from "moment";
import transferBillStatus from "../../../utils/transferBillStatus";

const ListBill = (props) => {
  const { navigation, detailBill } = props;

  const handleStatusStyle = (status) => {
    let style;
    switch (status) {
      case "exported":
        style = styles.exported;
        break;
      case "shipping":
        style = styles.shipping;
        break;
      case "completed":
        style = styles.completed;
        break;
      case "failed":
        style = styles.failed;
        break;
    }
    return style;
  };

  const BillItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push("bill-detail", { billId: item._id })}
      >
        <Flex style={styles.orderRow}>
          <Text fontSize={"sm"} flex={3}>
            MHĐ{item.billID}
          </Text>
          <Text fontSize={"sm"} flex={3.5}>
            {moment(item.exportBillTime).format("DD/MM/YYYY")}
          </Text>
          <Button
            size={"xs"}
            flex={2.5}
            variant="ghost"
            bg="transparent"
            color="gray.100"
          >
            Chi tiết
          </Button>
          <Text
            fontSize={"sm"}
            flex={3}
            style={handleStatusStyle(item.status[item.status.length - 1].name)}
          >
            {transferBillStatus(item.status[item.status.length - 1].name).name}
          </Text>
        </Flex>
      </TouchableOpacity>
    );
  };
  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Danh sách hóa đơn</Card.Title>
      <Flex flexDirection={"row"} style={styles.header}>
        <Text fontSize={"sm"} flex={3}>
          Mã hóa đơn
        </Text>
        <Text fontSize={"sm"} flex={3.5}>
          Ngày xuát
        </Text>
        <Text fontSize={"sm"} flex={2.5}>
          Sản phẩm
        </Text>
        <Text fontSize={"sm"} flex={3}>
          Trạng thái
        </Text>
      </Flex>
      <Box>
        <FlatList
          data={detailBill}
          renderItem={BillItem}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </Card>
  );
};

export default ListBill;

const styles = StyleSheet.create({
  header: { backgroundColor: "#B4B4C1", paddingHorizontal: 5 },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F6F6F8",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  exported: { fontWeight: "bold", color: "#ff9800" },
  shipping: { fontWeight: "bold", color: "#2196f3" },
  completed: { fontWeight: "bold", color: "#4caf50" },
  failed: { fontWeight: "bold", color: "#f44336" },
});
