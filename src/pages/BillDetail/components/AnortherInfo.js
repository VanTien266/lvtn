import { StyleSheet, View,  } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "react-native-elements";
import { Box, Text, Flex, TextArea, Select, CheckIcon, Button, useToast } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import staffApi from "../../../api/staffApi";
import billApi from "../../../api/billApi";
import _ from "lodash";

const AnortherInfo = (props) => {
  const { bill } = props;
  const { role } = useSelector((state) => state.session);
  const [shipper, setShipper] = useState({
    name: null,
    id: null
  })
  const [lstShipper, setLstShipper] = useState([]);
  const toast = useToast();

  const updateShipperForBill = async () => {
    try {
      const result = await billApi.updateShipper(bill._id, shipper.id);
      if (result) {
        toast.show({
          title: "Cập nhật thành công",
          placement: "bottom",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchLstShipper = async() => {
      let getLstShipper;
      try {
        getLstShipper = await staffApi.getShipper();
      } catch (error) {
        console.log(error);
        getLstShipper = [];
      }
      setLstShipper(getLstShipper);
    };
    if (!bill?.shipperID) fetchLstShipper();
  }, []);

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Thông tin khác</Card.Title>
      <Flex direction="row" justify="space-between">
        <Flex direction="row">
          <Icon
            name="account-circle"
            color="#00004080"
            size={24}
            style={styles.icon}
          ></Icon>
          <Box>
            <Text fontSize="md" bold>
              Nhân viên phụ trách
            </Text>
            <Text>{bill.salesmanID?.name}</Text>
            <Text>{bill.salesmanID?.phone}</Text>
          </Box>
        </Flex>
        <Flex direction="row">
          <Icon
            name="calendar-today"
            color="#00004080"
            size={24}
            style={styles.icon}
          ></Icon>
          <Box>
            <Text fontSize="md" bold>
              Ngày xuất
            </Text>
            <Text>{moment(bill.exportBillTime).format("DD/MM/YYYY")}</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex direction="row">
        <Icon
          name="account-circle"
          color="#00004080"
          size={24}
          style={styles.icon}
        ></Icon>
        <Box>
          <Text fontSize="md" bold>
            Nhân viên giao hàng
          </Text>
          {
            !bill?.shipperID && role == "SALESMAN" ? (
              <Flex direction="row">
                <View style={{marginEnd: 10, height: 50}}>
                  <Select
                    minWidth="100"
                    maxHeight="100"
                    accessibilityLabel="Chọn loại vải"
                    placeholder="Nhân viên giao hàng"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1"
                    selectedValue={shipper.id || ""}
                    onValueChange={(value) => {
                      setShipper({ id: value });
                    }}
                  >
                    {lstShipper &&
                      lstShipper.map((item, index) => {
                        return (
                          <Select.Item
                            key={item._id}
                            label={item.name}
                            value={item._id}
                          />
                        );
                      })}
                  </Select>
                </View>      
                <View style={{height: 50, paddingTop: 7}}>          
                  <Button onPress={() => updateShipperForBill()} style={{height: "100%"}}>Cập nhật</Button>
                </View>
              </Flex>  
              ) : (
              <View> 
                <Text>{bill?.shipperID?.name}</Text>
                <Text>{bill?.shipperID?.phone}</Text>
              </View>
            )
          }         
        </Box>
      </Flex>
      <Flex flexDirection="row" alignItems="center">
        <Icon
          name="border-color"
          color="#00004080"
          size={24}
          style={styles.icon}
        />
        <Text fontSize="md" bold>
          Ghi chú
        </Text>
      </Flex>
      <Box alignItems="center" mt={3}>
        <TextArea
          h={20}
          placeholder="Không có ghi chú nào"
          value={bill.note}
          w="90%"
          isDisabled
        />
      </Box>
    </Card>
  );
};

export default AnortherInfo;

const styles = StyleSheet.create({ icon: { marginRight: 5 } });
