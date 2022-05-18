import { StyleSheet, ScrollView, FlatList } from "react-native";
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
  TextArea,
  useToast,
} from "native-base";
import productApi from "../../../api/productApi";
import { useSelector } from "react-redux";
import orderApi from "../../../api/orderApi";
import _ from "lodash";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { Ionicons } from "@expo/vector-icons";

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
  const [order, setOrder] = useState({
    products: [],
    note: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    deposit: "",
    clientID: "",
  });
  const user = useSelector((state) => state.session).user;
  const isRequired = user === null;
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setOrder({
        ...order,
        receiverName: user?.name,
        receiverPhone: user?.phone,
        receiverAddress: user?.address,
        clientID: user?._id,
      });
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  useEffect(async () => {
    let mounted = true;
    if (mounted) {
      setListType(await productApi.getFullListType());
      setListColorcode(await productApi.getListColorcode());
    }
    return () => {
      mounted = false;
    };
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

  const handleAddproduct = (newProduct) => {
    if (!newProduct.type || !newProduct.color || !newProduct.length) {
      alert("Vui lòng chọn thông số sản phẩm");
    } else if (isNaN(newProduct.length)) {
      alert("Chiều dài không được có chữ cái");
    } else if (parseInt(newProduct.length) <= 100)
      alert("Chiều dài phải lớn hơn 100m");
    else {
      toast.show({
        title: "Thêm thành công!",
        placement: "top",
      });
      setOrder({
        ...order,
        products: [
          ...order.products,
          { ...newProduct, colorCode: newProduct.type + newProduct.color },
        ],
      });
      setProduct({
        type: null,
        color: null,
        length: null,
        colorCode: null,
      });
    }
  };
  const handleCreateOrder = async (newOrder) => {
    const res = orderApi.create(newOrder);
    if (res) {
      toast.show({
        title: "Đặt hàng thành công!",
        placement: "top",
      });
    } else {
      alert("Đặt hàng không thành công!");
    }
  };
  const HeaderComponent = () => (
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
                dropdownIcon={
                  <Ionicons size={20} color="grey" name="chevron-down" />
                }
                selectedValue={product.type || ""}
                onValueChange={(value) => {
                  setProduct({ ...product, type: value });
                }}
              >
                {listType &&
                  listType.map((item, index) => {
                    return (
                      <Select.Item
                        key={item.id + index}
                        label={_.capitalize(item.name)}
                        value={item.id}
                      />
                    );
                  })}
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
                dropdownIcon={
                  <Ionicons size={20} color="grey" name="chevron-down" />
                }
                selectedValue={product.color || ""}
                onValueChange={(value) => {
                  setProduct({ ...product, color: value });
                }}
              >
                {listColorcode &&
                  listColorcode.map((item, index) => {
                    return (
                      <Select.Item
                        key={item.code + index}
                        label={_.capitalize(item.name)}
                        value={item.code}
                      />
                    );
                  })}
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
              h="2/4"
              mt="auto"
              onPress={() => handleAddproduct(product)}
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
                data={order.products}
                renderItem={({ item, index }) => (
                  <HStack justifyContent="space-between" pl={2} key={index}>
                    <Box flex={1}>{index + 1}</Box>
                    <Box flex={2}>{item.type + item.color}</Box>
                    <Box flex={3}>
                      {_.capitalize(
                        listProductCode.get(item.type + item.color)
                      )}
                    </Box>
                    <Box flex={2}>{parseInt(item.length)}</Box>
                  </HStack>
                )}
                keyExtractor={(item, index) => index + item.type + item.color}
              />
            </Modal.Content>
          </Modal>
          <FormControl isRequired={isRequired}>
            <FormControl.Label>Người nhận</FormControl.Label>
            <Input
              placeholder={user?.name || "Vd: Nguyễn Văn A"}
              id="user-name"
              onChangeText={(val) => {
                setOrder({ ...order, receiverName: val });
              }}
            />
            <FormControl.Label>SĐT người nhận</FormControl.Label>
            <Input
              placeholder={user?.phone || "VD: 0123456789"}
              id="user-phone"
              onChangeText={(val) => {
                setOrder({ ...order, receiverPhone: val });
              }}
            />
            <FormControl.Label>Địa chỉ người nhận</FormControl.Label>
            <Input
              placeholder={user?.address || "Vd: 123 đường A, quận B"}
              id="user-address"
              onChangeText={(val) => {
                setOrder({ ...order, receiverAddress: val });
              }}
            />
          </FormControl>
          {user === null && (
            <FormControl isRequired={isRequired}>
              <FormControl.Label>Người đặt hàng</FormControl.Label>
              <Input
                placeholder="Vd: Nguyễn Văn A"
                id="customer-name"
                onChangeText={(val) => {
                  setOrder({ ...order, customerName: val });
                }}
              />
              <FormControl.Label>SĐT người đặt hàng</FormControl.Label>
              <Input
                placeholder="Vd: 0123456789"
                id="customer-phone"
                onChangeText={(val) => {
                  setOrder({ ...order, customerPhone: val });
                }}
              />
              <FormControl.Label>Địa chỉ người đặt hàng</FormControl.Label>
              <Input
                placeholder="Vd: 123 đường A, quận B"
                id="customer-address"
                onChangeText={(val) => {
                  setOrder({ ...order, customerAddress: val });
                }}
              />
              {/* <GooglePlacesAutocomplete
              placeholder="Search"
              styles={{
                container: {
                  flex: 0,
                  borderColor: 'grey',
                  borderWidth: 1,
                  marginHorizontal: 3,
                },
                textInput: {fontSize: 14},
              }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                // setOrder({ ...order, customerAddress: data });
                // dispatch(
                  // setOrigin({
                  //   location: details.geometry.location,
                  //   description: data.description,
                  // }),
                // );
                // dispatch(setDestination(null));
              }}
              fetchDetails={true}
              returnKeyType={'search'}
              minLength={2}
              query={{
                key: 'AIzaSyBL-Nce7y-Dt7ceZweXzGJ8Wjt4pNDpZeo',
                language: 'en',
              }}
              enablePowerByContainer={false}
              debounce={400}
              /> */}
            </FormControl>
          )}
          <FormControl>
            <FormControl.Label>Đặt cọc</FormControl.Label>
            <Input
              placeholder="Đặt cọc"
              id="user-deposit"
              onChangeText={(val) => {
                setOrder({ ...order, deposit: val });
              }}
            />
            <FormControl.Label>Ghi chú</FormControl.Label>
            <TextArea
              h={20}
              placeholder="Ghi chú"
              onChangeText={(val) => {
                setOrder({ ...order, note: val });
              }}
            />
          </FormControl>
          <Button onPress={() => handleCreateOrder(order)}>Đặt hàng</Button>
        </VStack>
      </Card>
  )
  return (
    <FlatList
      ListHeaderComponent={HeaderComponent}
    />
  );
};

export default CreateOrder;

const styles = StyleSheet.create({});
