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
      <Text fontSize={"sm"} flex={1}>
        {item.billId}
      </Text>
      <Text fontSize={"sm"} flex={2}>
        {moment(item.dayadded).format("DD/MM/YYY")}
      </Text>
      <Button size={"xs"} flex={1} variant={"ghost"}>
        Chi tiết
      </Button>
      <Text fontSize={"sm"} flex={1}>
        {item.status}
      </Text>
    </Flex>
  );
  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Danh sách hóa đơn</Card.Title>
      <Flex flexDirection={"row"}>
        <Text fontSize={"sm"} flex={1}>
          Mã hóa đơn
        </Text>
        <Text fontSize={"sm"} flex={2}>
          Ngày xuát
        </Text>
        <Text fontSize={"sm"} flex={1}>
          Sản phẩm
        </Text>
        <Text fontSize={"sm"} flex={1}>
          Trạng thái
        </Text>
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
