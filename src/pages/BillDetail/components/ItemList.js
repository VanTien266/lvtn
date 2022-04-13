import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Card } from "react-native-elements";
import { HStack, Box, FlatList, Button } from "native-base";
import productApi from "../../../api/productApi";
import Item from "./Item";
import { useNavigation } from "@react-navigation/native";

const ItemList = (props) => {
  const { listFabricId } = props;
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
    </Card>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  titleHeader: { backgroundColor: "#B4B4C1" },
});
