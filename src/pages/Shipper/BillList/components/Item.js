import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { HStack, Box, FlatList, Text } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { formattedValue } from "../../../../utils/formatNumber";
import getPriceOfFabricRoll from "../../../../utils/getPriceOfFabricRoll";

const ROW_HEIGHT = 40;
const Item = (props) => {
  const { item, exportBillTime, index, style } = props;
  const [expand, setExpand] = useState(false);

  const FabricRoll = ({ item, index }) => {
    return (
      <>
        <HStack space={1} style={styles.childHeader}>
          <Box flex={2}> </Box>
          <Box flex={2}>{item.item.colorCode}</Box>
          <Box flex={3}>{item.lot}</Box>
          <Box flex={4}>{formattedValue(item.length)}</Box>
          <Box flex={5}>
            {formattedValue(
              getPriceOfFabricRoll(item.item.marketPrice, exportBillTime)
            )}
          </Box>
          <Box flex={1}></Box>
        </HStack>
      </>
    );
  };

  return (
    <>
      <HStack style={style} px={1}>
        <Box flex={1} _text={{ fontWeight: "bold" }}>
          {index}
        </Box>
        <Box flex={3} _text={{ fontWeight: "bold" }}>
          {item[0].item.name}
        </Box>
        <Box flex={3} _text={{ fontWeight: "bold" }}>
          {`${item.length} cây vải`}
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
        <>
          <HStack space={1} justifyContent="center" style={styles.childHeader}>
            <Box flex={2} _text={{ fontSize: "md" }}></Box>
            <Box flex={2} _text={{ fontSize: "md" }}>
              Mã
            </Box>
            <Box flex={3} _text={{ fontSize: "md" }}>
              Lô
            </Box>
            <Box flex={4} _text={{ fontSize: "md" }}>
              Chiều dài
            </Box>
            <Box flex={5} _text={{ fontSize: "md" }}>
              Đơn giá
            </Box>
            <Box flex={1}></Box>
          </HStack>
          <FlatList
            data={item}
            renderItem={({ item, index }) => (
              <FabricRoll item={item} index={index + 1} />
            )}
            keyExtractor={(item) => item._id}
          />
        </>
      )}
    </>
  );
};

export default Item;

const styles = StyleSheet.create({
  childHeader: { backgroundColor: "#ffffff" },
});
