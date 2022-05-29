import { StyleSheet, ScrollView, FlatList, View } from "react-native";
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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { formattedValueCurrency } from "../../../utils/formatNumber";

const listTypePrice = [
  { id: 'co', price: 40000 },
  { id: 'ka', price: 50000 },
  { id: 'je', price: 60000 },
  { id: 'kt', price: 65000 },
  { id: 'ni', price: 45000 },
  { id: 'le', price: 70000 },
  { id: 'th', price: 35000 },
  { id: 'vo', price: 55000 },
  { id: 'la', price: 40000 },
  { id: 'du', price: 63000 },
  { id: 'lu', price: 80000 },
  { id: 're', price: 75000 },
  { id: 'nl', price: 67000 },
  { id: 'tm', price: 46000 },
  { id: 'ch', price: 53000 },
];
const listColorPrice = [
  { code: "01", price: 10000 },
  { code: "02", price: 11000 },
  { code: "03", price: 12000 },
  { code: "04", price: 13000 },
  { code: "05", price: 14000 },
  { code: "06", price: 15000 },
  { code: "07", price: 16000 },
  { code: "08", price: 17000 },
  { code: "09", price: 18000 },
  { code: "10", price: 19000 },
  { code: "11", price: 20000 },
  { code: "12", price: 21000 },
  { code: "13", price: 22000 },
  { code: "14", price: 23000 },
  { code: "15", price: 24000 },
  { code: "16", price: 25000 },
  { code: "17", price: 26000 },
  { code: "18", price: 27000 },
  { code: "19", price: 28000 },
  { code: "20", price: 29000 },
  { code: "21", price: 30000 },
  { code: "22", price: 31000 },
  { code: "23", price: 32000 },
  { code: "24", price: 33000 },
];

const CreateOrder = () => {
  const [listType, setListType] = useState([]);
  const [listColorcode, setListColorcode] = useState([]);
  const [product, setProduct] = useState({
    type: null,
    color: null,
    length: null,
  });
  const [totalOrder, setTotalOrder] = useState(0);
  const [errors, setErrors] = React.useState({});
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
      let typePrice = listTypePrice.find(function(post, index) {
        if(post.id == product.type)
          return post.price;
      });
      let colorPrice = listColorPrice.find(function(post, index) {
        if(post.code == product.color)
          return post.price;
      });
      setTotalOrder(prev => prev + product.length * (typePrice.price + colorPrice.price));
    }
  };
  const handleCreateOrder = async (newOrder) => {
    const res = await orderApi.create(newOrder);
    if (res) {
      toast.show({
        title: "Đặt hàng thành công!",
        placement: "top",
      });
      setOrder({products: [],
        note: "",
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        deposit: "",
        customerName: "",
        customerPhone: "", 
        customerAddress: "",
        clientID: ""})
    } else {
      alert("Đặt hàng không thành công!");
    }
  };

  const validateDeposit = () => {
    if (order.deposit === '') {
    setErrors({
      ...errors,
      name: 'Vui lòng đặt cọc để hoàn tất đơn hàng',
    
    });
    return false;
    } else if (parseInt(order.deposit) < 0.15 * totalOrder) {
      setErrors({
        ...errors,
        name: 'Vui lòng đặt cọc ít nhất 15% giá trị hóa đơn',
      });
      return false;
    }
    return true;
  };

  const onSubmit = (order) => {
    if (validateDeposit()) {
      setErrors({}); 
      handleCreateOrder(order)
    }
    else console.log(errors.name);
  };
  return (
    <ScrollView>
      <Card containerStyle={{ marginHorizontal: 0, marginVertical: 0 }}>
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
              <View style={{ height: 45 }}>
                <Input
                  placeholder="Chiều dài"
                  value={product.length}
                  onChangeText={(val) => {
                    setProduct({ ...product, length: val });
                  }}
                  style={{ minHeight: "100%" }}
                />
              </View>
            </FormControl>
            <Button
              w="1/4"
              mt="auto"
              onPress={() => handleAddproduct(product)}
              style={{ height: 45 }}
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
              <Modal.Footer>Tổng tạm tính: {formattedValueCurrency(totalOrder)}</Modal.Footer>
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
              value={order.receiverName}
            />
            <FormControl.Label>SĐT người nhận</FormControl.Label>
            <Input
              placeholder={user?.phone || "VD: 0123456789"}
              id="user-phone"
              onChangeText={(val) => {
                setOrder({ ...order, receiverPhone: val });
              }}
              value={order.receiverPhone}
            />
            <FormControl.Label>Địa chỉ người nhận</FormControl.Label>
            <Input
              placeholder={user?.address || "Vd: 123 đường A, quận B"}
              id="user-address"
              onChangeText={(val) => {
                setOrder({ ...order, receiverAddress: val });
              }}
              value={order.receiverAddress}
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
                value={order.customerName}
              />
              <FormControl.Label>SĐT người đặt hàng</FormControl.Label>
              <Input
                placeholder="Vd: 0123456789"
                id="customer-phone"
                onChangeText={(val) => {
                  setOrder({ ...order, customerPhone: val });
                }}
                value={order.customerPhone}
              />
              <FormControl.Label>Địa chỉ người đặt hàng</FormControl.Label>
              <Input
                placeholder="Vd: 123 đường A, quận B"
                id="customer-address"
                onChangeText={(val) => {
                  setOrder({ ...order, customerAddress: val });
                }}
                value={order.customerAddress}
              />
            </FormControl>
          )}
          {user === null ?
          <FormControl isRequired isInvalid={'name' in errors}>
            <FormControl.Label>Đặt cọc</FormControl.Label>
            <Input
              placeholder="Đặt cọc"
              id="user-deposit"
              onChangeText={(val) => {
                setOrder({ ...order, deposit: val });
              }}
              value={order.deposit}
            />
            {'name' in errors ?
            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage> : null}
          </FormControl>
          : <FormControl>
              <FormControl.Label>Đặt cọc</FormControl.Label>
              <Input
                placeholder="Đặt cọc"
                id="user-deposit"
                onChangeText={(val) => {
                  setOrder({ ...order, deposit: val });
                }}
                value={order.deposit}
              />
          </FormControl>
          }
          <FormControl>
            <FormControl.Label>Ghi chú</FormControl.Label>
            <TextArea
              h={20}
              placeholder="Ghi chú"
              onChangeText={(val) => {
                setOrder({ ...order, note: val });
              }}
              value={order.note}
            />
          </FormControl>
          <Button onPress={() => onSubmit(order)}>Đặt hàng</Button>
        </VStack>
      </Card>
    </ScrollView>
  );
};

export default CreateOrder;

const styles = StyleSheet.create({});
