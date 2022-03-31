import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Card } from "react-native-elements";
import { HStack, Box, FlatList } from "native-base";
import productApi from "../../../api/productApi";
import Item from "./Item";

const BillProductDetail = ({route}) => {
  const { listFabric } = route.params;


  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
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

export default BillProductDetail;

const styles = StyleSheet.create({
  header: { paddingHorizontal: 5, backgroundColor: "#B4B4C1" },
});
