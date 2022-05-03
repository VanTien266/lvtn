import { StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements";
import {
  Select,
  FormControl,
  CheckIcon,
  HStack,
  VStack,
  Button,
  TextArea,
  useToast,
} from "native-base";
import { useSelector } from "react-redux";
import orderApi from "../../../api/orderApi";
import staffApi from "../../../api/staffApi";
import supportApi from "../../../api/supportApi";

const CreateRequest = ({ navigation, route }) => {
  const [listOrderId, setListOrderId] = useState([]);
  const [listStaff, setListStaff] = useState([]);
  const user = useSelector((state) => state.session).user;
  const [request, setRequest] = useState({
    content: "",
    orderId: "",
    salesmanId: "",
    customerId: user?._id,
  });

  const toast = useToast();

  useEffect(async () => {
    let mounted = true;
    if (mounted && user) {
      setListOrderId(await orderApi.getOrderIdByCustomer(user._id));
      setListStaff(await staffApi.getSalesman());
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleCreateSupport = (data) => {
    supportApi.create(data);
    toast.show({
      title: "Đã gửi",
      placement: "top",
    });
    navigation.navigate("support-list");
  };

  return (
    <ScrollView>
      <Card containerStyle={{ marginHorizontal: 0 }}>
        <VStack space={3}>
          <HStack direction="row" space={3}>
            <FormControl w="1/2" isRequired>
              <FormControl.Label>Mã đơn đặt hàng</FormControl.Label>
              <Select
                minWidth="100"
                accessibilityLabel="Chọn mã đơn hàng"
                placeholder="Mã đơn hàng"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
                selectedValue={request.orderId}
                onValueChange={(value) => {
                  setRequest({ ...request, orderId: value });
                }}
              >
                {listOrderId &&
                  listOrderId.map((item, index) => (
                    <Select.Item
                      key={item._id}
                      label={`MHĐ ${item.orderId}`}
                      value={item._id}
                    />
                  ))}
              </Select>
            </FormControl>
            <FormControl w="1/2" isRequired>
              <FormControl.Label>Nhân viên bán hàng"</FormControl.Label>
              <Select
                minWidth="100"
                accessibilityLabel="Chọn nhân viên"
                placeholder="Nhân viên"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
                selectedValue={request.salesmanId}
                onValueChange={(value) => {
                  setRequest({ ...request, salesmanId: value });
                }}
              >
                {listStaff &&
                  listStaff.map((item, index) => (
                    <Select.Item
                      key={item._id}
                      label={item.name}
                      value={item._id}
                    />
                  ))}
              </Select>
            </FormControl>
          </HStack>
          <FormControl.Label>Nội dung</FormControl.Label>
          <TextArea
            h={20}
            placeholder="Nội dung"
            onChangeText={(val) => {
              setRequest({ ...request, content: val });
            }}
          />
          <Button onPress={() => handleCreateSupport(request)}>
            Gửi yêu cầu
          </Button>
        </VStack>
      </Card>
    </ScrollView>
  );
};

export default CreateRequest;

const styles = StyleSheet.create({});
