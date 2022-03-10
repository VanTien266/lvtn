import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Card } from "react-native-elements";
import { HStack, Box, FlatList } from "native-base";
import productApi from "../../../api/productApi";
import Item from "./Item";

const ItemList = (props) => {
  const { listFabricId } = props;
  const [listFabric, setListfabric] = useState([]);

  useEffect(() => {
    const fetchFabricRollOfBill = async (listId) => {
      const response = await productApi.getListOfBill({ ids: listId });
      setListfabric(response);
    };

    fetchFabricRollOfBill(listFabricId);
  }, [listFabricId]);

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Sản phẩm</Card.Title>
      <HStack space={1} justifyContent="center" style={styles.header}>
        <Box flex={2} _text={{ fontWeight: "bold", fontSize: "md" }}>
          STT
        </Box>
        <Box flex={2} _text={{ fontWeight: "bold", fontSize: "md" }}>
          Mã
        </Box>
        <Box flex={3} _text={{ fontWeight: "bold", fontSize: "md" }}>
          Lô
        </Box>
        <Box flex={4} _text={{ fontWeight: "bold", fontSize: "md" }}>
          Chiều dài
        </Box>
        <Box flex={5} _text={{ fontWeight: "bold", fontSize: "md" }}>
          Đơn giá
        </Box>
        <Box flex={1}></Box>
      </HStack>
      {listFabric && (
        <FlatList
          data={listFabric}
          renderItem={({ item, index }) => (
            <Item item={item} index={index + 1} />
          )}
          keyExtractor={(item, index) => index}
        />
      )}
    </Card>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  header: { paddingHorizontal: 5, backgroundColor: "#B4B4C1" },
});
