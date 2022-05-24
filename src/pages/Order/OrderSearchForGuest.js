import React, { useState, useEffect, useRef } from "react";
import { Input, Icon } from "native-base";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import orderApi from "../../api/orderApi";
import transferOrderStatus from "../../utils/transferOrderStatus";
import { debounce } from "lodash";

export default function OrderSearchForGuest({ navigation }) {
  const [searchTxt, setSearchTxt] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchListOrder = async () => {
      try {
        let response;
        if (searchTxt && phoneNum) response = await orderApi.searchByGuest(searchTxt, phoneNum);
        setResult(response);
      } catch (error) {
        console.log("Failed to fetch order", error);
      }
    };
    fetchListOrder();
  }, [searchTxt, phoneNum]);

  const debounceSearchTxt = useRef(debounce((e) => setSearchTxt(e), 1000)).current;
  
  function delaySaveSearchTxt(e) {
    debounceSearchTxt(e);
  }

  const debouncePhoneNum = useRef(debounce((e) => setPhoneNum(e), 1000)).current;
  
  function delaySavePhoneNum(e) {
    debouncePhoneNum(e);
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder="Mã đơn đặt hàng"
          variant="filled"
          width="100%"
          bg="gray.500"
          borderRadius="5"
          py="1"
          px="2"
          placeholderTextColor="gray.100"
          _hover={{ bg: "gray.100", borderWidth: 0 }}
          borderWidth="0"
          _web={{
            _focus: { style: { boxShadow: "none" } },
          }}
          color="gray.100"
          onChangeText={delaySaveSearchTxt}
        />
      </View>
      <View style={styles.phoneNumBox}>
        <Input
          placeholder="Số điện thoại nhận hàng"
          variant="filled"
          width="100%"
          bg="gray.500"
          borderRadius="5"
          py="1"
          px="2"
          placeholderTextColor="gray.100"
          _hover={{ bg: "gray.100", borderWidth: 0 }}
          borderWidth="0"
          _web={{
            _focus: { style: { boxShadow: "none" } },
          }}
          color="gray.100"
          onChangeText={delaySavePhoneNum}
        />
      </View>
      <View style={styles.resultBox}>
        { searchTxt?.length === 0 ? (
          <Text></Text>
        ) : result?.length === 0 ? (
          <Text>Không có kết quả phù hợp</Text>
        ) : (
          result?.map(
            (order, idx) =>
              order.orderStatus && (
                <TouchableOpacity
                  style={styles.orderItem}
                  key={idx}
                  onPress={() =>
                    navigation.push("order-detail", { orderId: order._id })
                  }
                >
                  <View
                    style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}
                  >
                    <Text style={styles.orderItemText}>MHĐ{order.orderId}</Text>
                  </View>
                  <View style={[styles.verticalCenter, { flex: 4 }]}>
                    <Text style={styles.orderItemText}>
                      {order.clientID.name}
                    </Text>
                  </View>
                  <View style={[styles.verticalCenter, { flex: 4 }]}>
                    <Text style={styles.orderItemText}>
                      {order.receiverPhone}
                    </Text>
                  </View>
                  <View style={[styles.verticalCenter, { flex: 4 }]}>
                    <Text
                      style={[
                        styles.orderItemText,
                        transferOrderStatus(
                          order.orderStatus[order.orderStatus.length - 1].name
                        ).style,
                      ]}
                    >
                      {
                        transferOrderStatus(
                          order.orderStatus[order.orderStatus.length - 1].name
                        ).name
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              )
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  result: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  verticalCenter: {
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  orderItem: {
    backgroundColor: "#F6F6F8",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    minHeight: 40,
  },
  orderItemText: {
    fontFamily: "Roboto",
    color: "#000040",
    fontSize: 12,
  },
  resultBox: {
    marginTop: 10,
  },
  noResultTxt: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  phoneNumBox: {
    marginTop: 10
  }
});
