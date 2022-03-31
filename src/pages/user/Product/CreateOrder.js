import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements";
import {
  Select,
  FormControl,
  Box,
  CheckIcon,
  HStack,
  Input,
  VStack,
  Button,
  Modal,
  FlatList,
  Flex,
} from "native-base";
import productApi from "../../../api/productApi";
import { useSelector } from "react-redux";

const CreateOrder = () => {
  const [listType, setListType] = useState([]);
  const [listColorcode, setListColorcode] = useState([]);
  const [product, setProduct] = useState({
    type: null,
    color: null,
    length: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const user = useSelector((state) => state.session).user;

  useEffect(async () => {
    setListType(await productApi.getFullListType());
    setListColorcode(await productApi.getListColorcode());
  }, []);
  const listProductCode = new Map();
  if (listType.length > 0) {
    for (let i = 0; i < listType.length; i++)
      for (let j = 0; j < listColorcode.length; j++)
        listProductCode.set(
          listType[i].id + listColorcode[j].code,
          listType[i].name + " " + listColorcode[j].name
        );
  }

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title> Tạo đơn đặt hàng</Card.Title>
      <VStack space={3}>
        <HStack direction="row" space={3}>
          <FormControl w="1/2" isRequired>
            <FormControl.Label>Loại vải</FormControl.Label>
            <Select
              minWidth="100"
              accessibilityLabel="Chọn loại vải"
              placeholder="Loại vải"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              value={product.type}
              onValueChange={(value) => {
                setProduct({ ...product, type: value });
              }}
            >
              {listType &&
                listType.map((item) => (
                  <Select.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                ))}
            </Select>
          </FormControl>
          <FormControl w="1/2" isRequired>
            <FormControl.Label>Màu vải</FormControl.Label>
            <Select
              minWidth="100"
              accessibilityLabel="Chọn màu vải"
              placeholder="Màu vải"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              value={product.color}
              onValueChange={(value) => {
                setProduct({ ...product, color: value });
              }}
            >
              {listColorcode &&
                listColorcode.map((item) => (
                  <Select.Item
                    key={item.code}
                    label={item.name}
                    value={item.code}
                  />
                ))}
            </Select>
          </FormControl>
        </HStack>
        <HStack space={2}>
          <FormControl w="3/4" isRequired>
            <FormControl.Label>Chiều dài</FormControl.Label>
            <Input
              placeholder="Chiều dài"
              value={product.length}
              onChangeText={(val) => {
                setProduct({ ...product, length: val });
              }}
            />
          </FormControl>
          <Button
            w="1/4"
            onPress={() => {
              setListProduct([...listProduct, product]);
              console.log(product);
            }}
          >
            Thêm SP
          </Button>
        </HStack>
        <Button onPress={() => setShowModal(true)}>Danh sách sản phẩm</Button>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          _backdrop={{
            _dark: {
              bg: "coolGray.800",
            },
            bg: "warmGray.50",
          }}
        >
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Danh sách sản phẩm</Modal.Header>
            <HStack justifyContent="space-between" pl={2}>
              <Box flex={1}>STT</Box>
              <Box flex={2}>Mã</Box>
              <Box flex={3}>Tên</Box>
              <Box flex={2}>Chiều dài</Box>
            </HStack>
            <FlatList
              data={listProduct}
              renderItem={({ item, index }) => (
                <HStack justifyContent="space-between" pl={2}>
                  <Box flex={1}>{index + 1}</Box>
                  <Box flex={2}>{item.type + item.color}</Box>
                  <Box flex={3}>
                    {listProductCode.get(item.type + item.color)}
                  </Box>
                  <Box flex={2}>{item.length}</Box>
                </HStack>
              )}
              keyExtractor={(item, index) => index + item.type + item.color}
            />
          </Modal.Content>
        </Modal>
        <FormControl>
          <FormControl.Label>Người nhận</FormControl.Label>
          <Input placeholder={user?.name} />
          <FormControl.Label>SĐT người nhận</FormControl.Label>
          <Input placeholder={user?.phone} />
          <FormControl.Label>Địa chỉ người nhận</FormControl.Label>
          <Input placeholder={user?.address} />
          <FormControl.Label>Đặt cọc</FormControl.Label>
          <Input placeholder="Đặt cọc" />
        </FormControl>
        <Button onPress={() => console.log("hello world")}>Đặt hàng</Button>
      </VStack>
    </Card>
  );
};

export default CreateOrder;

const styles = StyleSheet.create({});
