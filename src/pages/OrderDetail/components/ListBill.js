import { StyleSheet } from "react-native";
import React from "react";
import { Box, Flex, FlatList, Button, Text } from "native-base";
import { Card } from "react-native-elements";
import moment from "moment";

const ListBill = () => {
  const data = [
    {
      billId: "MHD1234",
      dayadded: new Date(),
      salesman: "Luu Van Tien",
      item: [],
      status: "shipping",
    },
    {
      billId: "MHD2345",
      dayadded: new Date(),
      salesman: "Luu Van Nghia",
      item: [],
      status: "failed",
    },
    {
      billId: "MHD3456",
      dayadded: new Date(),
      salesman: "Luu Van Tinh",
      item: [],
      status: "success",
    },
    {
      billId: "MHD4567",
      dayadded: new Date(),
      salesman: "Luu Van Tien",
      item: [],
      status: "exported",
    },
  ];
  const BillItem = ({ item }) => (
    <Flex flexDirection={"row"} justifyContent={"space-between"}>
      <Text fontSize={"sm"}>{item.billId}</Text>
      <Text fontSize={"sm"}>{item.salesman}</Text>
      <Text fontSize={"sm"}>{moment(item.dayadded).format("DD/MM/YYY")}</Text>
      <Button size={"xs"} variant={"ghost"}>
        Chi tiết
      </Button>
      <Text fontSize={"sm"}>{item.status}</Text>
    </Flex>
  );
  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Danh sách hóa đơn</Card.Title>
      <Flex flexDirection={"row"} justifyContent={"space-between"}>
        <Text fontSize={"sm"}>Mã hóa đơn</Text>
        <Text fontSize={"sm"}>Người tạo</Text>
        <Text fontSize={"sm"}>Ngày xuát</Text>
        <Text fontSize={"sm"}>Sản phẩm</Text>
        <Text fontSize={"sm"}>Trạng thái</Text>
      </Flex>
      <Box>
        <FlatList
          data={data}
          renderItem={BillItem}
          keyExtractor={(item) => item.billId}
        />
      </Box>
    </Card>
  );
};

export default ListBill;

const styles = StyleSheet.create({});
