import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Card } from "react-native-elements";
import { HStack, Box, FlatList, Button } from "native-base";
import productApi from "../../../api/productApi";
import Item from "./Item";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { formattedValue } from "../../../utils/formatNumber";

const ItemList = (props) => {
  const { bill } = props;
  const listFabricId = bill?.fabricRoll;
  const [listFabric, setListfabric] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;
    const fetchFabricRollOfBill = async (listId) => {
      const response = await productApi.getListOfBill({ ids: listId });
      setListfabric(response);
    };
    if (mounted) {
      fetchFabricRollOfBill(listFabricId);
    }

    return () => (mounted = false);
  }, [listFabricId]);

  const getTotalLength = (listFabric) => {
    return listFabric?.reduce((acc, item) => {
      const sum = item.reduce((itemAcc, fabricRoll) => {
        return itemAcc + fabricRoll.length;
      }, 0);
      return acc + sum;
    }, 0);
  };

  const getTotalPrice = (listFabric) => {
    return listFabric?.reduce((acc, item) => {
      const sum = item.reduce((itemAcc, fabricRoll) => {
        let price;
        const newArr = fabricRoll.item.marketPrice.reverse();
        for (const i of newArr) {
          if (moment(bill.exportBillTime).isAfter(i.dayApplied)) {
            price = i.price;
            break;
          }
        }
        return itemAcc + fabricRoll.length * price;
      }, 0);
      return acc + sum;
    }, 0);
  };

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Sản phẩm</Card.Title>
      {listFabric?.length > 10 && (
        <Button
          variant="link"
          onPress={() =>
            navigation.navigate("bill-product-pagination", {
              listFabric: listFabric,
            })
          }
        >
          Chi tiết
        </Button>
      )}
      <HStack style={styles.titleHeader} px={1}>
        <Box flex={1} _text={{ fontWeight: "bold", fontSize: "md" }}>
          STT
        </Box>
        <Box flex={3} _text={{ fontWeight: "bold", fontSize: "md" }}>
          Sản phẩm
        </Box>
        <Box flex={3} _text={{ fontWeight: "bold", fontSize: "md" }}>
          Số cây vải
        </Box>
        <Box flex={1} _text={{ fontWeight: "bold", fontSize: "md" }}></Box>
      </HStack>
      {listFabric && (
        <FlatList
          data={listFabric.slice(0, 10)}
          renderItem={({ item, index }) => (
            <Item item={item} index={index + 1} />
          )}
          keyExtractor={(item, index) => index}
        />
      )}
      <HStack px={1} justifyContent="space-between">
        <Box _text={{ fontWeight: "bold", fontSize: "md" }}>
          Tổng số cây vải
        </Box>
        <Box _text={{ fontSize: "md" }}>{`${formattedValue(
          listFabricId?.length
        )} cây`}</Box>
      </HStack>
      <HStack px={1} justifyContent="space-between">
        <Box _text={{ fontWeight: "bold", fontSize: "md" }}>Tổng chiều dài</Box>
        <Box _text={{ fontSize: "md" }}>{`${formattedValue(
          getTotalLength(listFabric)
        )} m`}</Box>
      </HStack>
      <HStack px={1} justifyContent="space-between">
        <Box _text={{ fontWeight: "bold", fontSize: "md" }}>Tổng giá</Box>
        <Box _text={{ fontSize: "md" }}>{`${formattedValue(
          getTotalPrice(listFabric)
        )} vnđ`}</Box>
      </HStack>
      {/* <HStack px={1} justifyContent="space-between">
        <Box _text={{ fontWeight: "bold", fontSize: "md" }}>Đã đặt cọc</Box>
        <Box _text={{ fontSize: "md" }}>{`${getTotalLength(
          listFabric
        )} m`}</Box>
      </HStack> */}
    </Card>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  titleHeader: { backgroundColor: "#B4B4C1" },
});
