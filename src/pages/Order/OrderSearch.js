import React, { useState, useEffect, useRef } from "react";
import { Input, Icon } from "native-base";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import orderApi from "../../api/orderApi";
import transferOrderStatus from "../../utils/transferOrderStatus";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

export default function OrderSearch({ navigation }) {
  const [searchTxt, setSearchTxt] = useState("");
  const [result, setResult] = useState([]);
  const { role, user } = useSelector((state) => state.session);

  useEffect(() => {
    const fetchListOrder = async () => {
      try {
        let response ;
        if (role == "USER") response = await orderApi.searchByCustomer(user._id, searchTxt);
        else if (role == "SALESMAN" || role == "SHIPPER" || role == "ADMIN") response = await orderApi.searchByStaff(searchTxt);
        setResult(response);
      } catch (error) {
        console.log("Failed to fetch order list", error);
      }
    };
    fetchListOrder();
  }, [searchTxt]);

  const debounceSearch = useRef(debounce((e) => setSearchTxt(e), 1000)).current;
  
  function delaySaveSearchTxt(e) {
    debounceSearch(e);
  }

  // const searchOrder = (txtValue) => {
  //   setSearchTxt(txtValue);
  //   setResult([]);
  //   if (txtValue.length > 3) {
  //     let orderSearch = listOrder.filter((item) => {
  //       return item.orderId.toString().startsWith(txtValue.substring(3));
  //     });
  //     setResult(orderSearch);
  //   }
  // };

  // useEffect(() => {
  //   const fetchListOrder = async () => {
  //     try {
  //       const response = await orderApi.getAll();
  //       setListOrder(response);
  //     } catch (error) {
  //       console.log("Failed to fetch order list", error);
  //     }
  //   };
  //   fetchListOrder();
  // }, []);

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder="Search"
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
          InputLeftElement={
            <Icon
              ml="2"
              size="5"
              color="gray.100"
              as={<Ionicons name="ios-search" />}
            />
          }
          onChangeText={delaySaveSearchTxt}
        />
      </View>
      <View style={styles.resultBox}>
        {searchTxt.length === 0 ? (
          <Text></Text>
        ) : result.length === 0 ? (
          <Text>Không có kết quả phù hợp</Text>
        ) : (
          result.map(
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
});
