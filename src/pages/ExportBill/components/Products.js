import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements";
import { Flex, Input, Button, useToast, Box } from "native-base";
import ProductItem from "./ProductItem";
import productApi from "../../../api/productApi";

const Products = (props) => {
  const { product, setParams, navigation, route } = props;
  const [fabricId, setFabricId] = useState("");
  const [listProductAdded, setListProductAdded] = useState([]);
  const [newProduct, setNewProduct] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setParams({ handleGetFabricInfo: handleGetFabricInfo });
  }, []);

  useEffect(() => {
    let mouted = true;
    const handleAddToBill = () => {
      if (mouted) {
        const listColorCode = product
          ? product.map((item) => item.colorCode.colorCode)
          : [];
        if (newProduct)
          if (listColorCode.includes(newProduct.colorCode)) {
            if (
              listProductAdded.filter((item) => item._id === newProduct._id)
                .length > 0
            ) {
              toast.show({
                render: () => {
                  return (
                    <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
                      Cây vải đã tồn tại!
                    </Box>
                  );
                },
                placement: "top",
              });
            } else setListProductAdded([...listProductAdded, newProduct]);
          } else {
            toast.show({
              render: () => {
                return (
                  <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
                    Cây vải không có trong danh sách đặt hàng!
                  </Box>
                );
              },
              placement: "top",
            });
          }
      }
    };

    handleAddToBill();
    return () => {
      mouted = false;
    };
  }, [newProduct]);
  useEffect(() => {
    setParams({ listProductAdded: listProductAdded });
  }, [listProductAdded]);

  const handleGetFabricInfo = async (id) => {
    const response = await productApi.getOne({ id: id });
    if (response.length > 0) setNewProduct(response);
    else
      toast.show({
        render: () => {
          return (
            <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
              Không tồn tại cây vải!
            </Box>
          );
        },
        placement: "top",
      });
  };

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Flex direction="row" mb={2}>
        <Input
          variant="outline"
          placeholder="Mã cây vải"
          flex={1}
          onChangeText={(value) => setFabricId(value)}
          value={fabricId}
        />
        <Button
          onPress={() => {
            navigation.navigate("scan-barcode", route.params);
          }}
        >
          Quét mã
        </Button>
      </Flex>
      <Button
        onPress={() => {
          if (fabricId.length === 24) handleGetFabricInfo(fabricId);
          else
            toast.show({
              render: () => {
                return (
                  <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
                    Mã cây vải không hợp lệ!
                  </Box>
                );
              },
              placement: "top",
            });
        }}
      >
        Thêm sản phẩm
      </Button>
      <Card.Title>Sản phẩm</Card.Title>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerCell}>STT</Text>
          <Text style={styles.headerCell}>Mã</Text>
          <Text style={{ flex: 2 }}>Tên sản phẩm</Text>
          <Text style={styles.headerCell}>Đã giao</Text>
          <Text style={styles.headerCell}>Còn lại</Text>
        </View>
        {product && (
          <FlatList
            data={product}
            renderItem={({ item, index }) => {
              const listAddedItem = listProductAdded?.filter(
                (ele) => ele.colorCode === item.colorCode.colorCode
              );
              return (
                <ProductItem
                  item={item}
                  index={index + 1}
                  listAddedItem={listAddedItem}
                />
              );
            }}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    </Card>
  );
};

export default Products;

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#B4B4C1",
    paddingHorizontal: 5,
  },
  headerCell: { flex: 1, color: "#000040" },
});
