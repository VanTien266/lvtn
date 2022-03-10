import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { HStack, Box, FlatList } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { formattedValue } from "../../../utils/formatNumber";

const Item = (props) => {
  const { item, index } = props;
  const [expand, setExpand] = useState(false);

  const FabricRoll = ({ item, index }) => {
    return (
      <HStack space={1}>
        <Box flex={2}>{index}</Box>
        <Box flex={2}>{item.item.colorCode}</Box>
        <Box flex={3}>{item.lot}</Box>
        <Box flex={4}>{formattedValue(item.length)}</Box>
        <Box flex={5}>
          {formattedValue(
            item.item.marketPrice[item.item.marketPrice.length - 1].price
          )}
        </Box>
        <Box flex={1}></Box>
      </HStack>
    );
  };

  return (
    <>
      <HStack style={styles.titleRow}>
        <Box flex={2} _text={{ fontWeight: "bold" }}>
          {item[0].item.name}
        </Box>
        <Box flex={3} _text={{ fontWeight: "bold" }}>
          {item.length}
        </Box>
        <TouchableOpacity flex={1} onPress={() => setExpand(!expand)}>
          <Icon
            name={expand ? "expand-less" : "expand-more"}
            size={24}
            color="#00004060"
          />
        </TouchableOpacity>
      </HStack>
      {expand && (
        <FlatList
          data={item}
          renderItem={({ item, index }) => (
            <FabricRoll item={item} index={index + 1} />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </>
  );
};

export default Item;

const styles = StyleSheet.create({ titleRow: { backgroundColor: "#F6F6F8" } });
