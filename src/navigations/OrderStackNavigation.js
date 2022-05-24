import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import React from "react";
import { Button } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import OrderList from "../pages/Order/OrderList";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import BillDetail from "../pages/BillDetail/BillDetail";
import { Ionicons } from "@expo/vector-icons";
import OrderSearch from "../pages/Order/OrderSearch";
import OrderFilter from "../pages/Order/OrderFilter";
import ExportBill from "../pages/ExportBill/ExportBill";
import ScanBarCode from "../pages/ExportBill/components/ScanBarCode";
import ReviewBill from "../pages/ReviewBill/ReviewBill";
import billApi from "../api/billApi";
import orderApi from "../api/orderApi";
import StatusDetail from "../pages/OrderDetail/components/StatusDetail";
import ItemListDetail from "../pages/OrderDetail/components/ItemListDetail";
import BillStatusDetail from "../pages/BillDetail/components/BillStatusDetail";
import BillProductDetail from "../pages/BillDetail/components/BillProductDetail";
import PaginatedItems from "../pages/BillDetail/components/PaginatedItems";
import OrderSearchForGuest from "../pages/Order/OrderSearchForGuest";
import { useSelector } from "react-redux";

const OrderStack = createStackNavigator();

const createBill = (orderId, clientID, salesmanID, ids) => {
  const response = billApi.createBill({
    orderId: orderId,
    clientID: clientID,
    salesmanID: salesmanID,
    ids: ids,
  });
  return response;
};

const OrderStackNavigation = () => {
  const { role, user } = useSelector((state) => state.session);
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="order-list"
        component={OrderList}
        options={({ navigation }) => ({
          title: "Danh sách đơn đặt hàng",
          headerLeft: null,
          headerRight: () => (
            <View style={styles.titleBar}>
              {role != "GUEST" && (
                <TouchableOpacity
                  style={styles.iconBtnBar}
                  onPress={() => navigation.push("order-filter")}
                >
                  <Ionicons name="filter" size={24} color="#000040" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="notifications" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtnBar}
                onPress={() =>
                  role == "GUEST"
                    ? navigation.push("order-search-for-guest")
                    : navigation.push("order-search")
                }
              >
                <Ionicons name="search-sharp" size={24} color="#000040" />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: { borderBottomWidth: 0 },
        })}
      />
      <OrderStack.Screen
        name="order-detail"
        component={OrderDetail}
        options={({ navigation, route }) => ({
          title: "Chi tiết đơn đặt hàng",
          headerRight: () => (
            <Button
              variant={"ghost"}
              colorScheme="light"
              onPress={() => {
                orderApi
                  .updateStatus(route.params.orderId, {
                    status: "processing",
                    reason: "",
                  })
                  .then((res) => res)
                  .catch((err) => err);
                navigation.navigate("export-bill", route.params);
              }}
              leftIcon={<Icon name="file-upload" size={20} color="#00004060" />}
            >
              Xuất HĐ
            </Button>
          ),
        })}
      />
      <OrderStack.Screen
        name="status-detail"
        component={StatusDetail}
        options={() => ({ title: "Chi tiết trạng thái" })}
      />
      <OrderStack.Screen
        name="product-detail"
        component={ItemListDetail}
        options={() => ({ title: "Chi tiết các sản phẩm" })}
      />
      <OrderStack.Screen
        name="bill-status-detail"
        component={BillStatusDetail}
        options={() => ({ title: "Chi tiết trạng thái" })}
      />
      <OrderStack.Screen
        name="bill-product-detail"
        component={BillProductDetail}
        options={() => ({ title: "Chi tiết các sản phẩm" })}
      />
      <OrderStack.Screen
        name="bill-product-pagination"
        component={PaginatedItems}
        options={() => ({ title: "Chi tiết các sản phẩm" })}
      />
      <OrderStack.Screen
        name="scan-barcode"
        component={ScanBarCode}
        options={({ navigation, route }) => ({
          title: "Quét mã",
        })}
      />
      <OrderStack.Screen
        name="bill-detail"
        component={BillDetail}
        options={{
          title: "Hóa đơn bán hàng",
          headerRight: () => (
            <Button
              variant={"ghost"}
              colorScheme="light"
              leftIcon={<Icon name="local-printshop" size={14} />}
            >
              In hóa đơn
            </Button>
          ),
        }}
      />
      <OrderStack.Screen
        name="export-bill"
        component={ExportBill}
        options={({ navigation, route }) => ({
          title: "Xuất hóa đơn",
          headerRight: () => (
            <Button
              variant={"ghost"}
              colorScheme="light"
              onPress={() => {
                if (route.params.listProductAdded.length === 0) {
                  Alert.alert("Chưa có sản phẩm nào được thêm vào!");
                } else navigation.navigate("review-bill", route.params);
              }}
              leftIcon={<Icon name="file-upload" size={20} color="#000040" />}
            >
              Tạo HĐ
            </Button>
          ),
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                Alert.alert("Hóa đơn chưa được xuất", " Bạn có muốn thoát?", [
                  {
                    text: "Ở lại",
                    onPress: () => null,
                    style: "cancel",
                  },
                  {
                    text: "Đồng ý",
                    onPress: async () => {
                      const res = await orderApi.cancelStatus(
                        route.params.orderId
                      );
                      navigation.navigate("order-detail", route.params);
                    },
                  },
                ]);
              }}
            />
          ),
        })}
      />
      <OrderStack.Screen
        name="review-bill"
        component={ReviewBill}
        options={({ navigation, route }) => ({
          title: "Xem lại hóa dơn",
          headerRight: () => (
            <Button
              variant={"ghost"}
              colorScheme="light"
              onPress={() => {
                createBill(
                  route.params.orderId,
                  route.params.clientID,
                  route.params.salesmanID,
                  route.params.listProductAdded.map((i) => i._id)
                );
                Alert.alert("Tạo hóa đơn bán hàng thành công!");
                navigation.navigate("order-detail", route.params);
              }}
              leftIcon={<Icon name="file-upload" size={20} color="#000040" />}
            >
              Xuất
            </Button>
          ),
        })}
      />
      <OrderStack.Screen
        name="order-search"
        component={OrderSearch}
        options={{
          title: "Tìm kiếm đơn đặt hàng",
        }}
      />
      <OrderStack.Screen
        name="order-filter"
        component={OrderFilter}
        options={{
          title: "Lọc đơn đặt hàng",
        }}
      />
      <OrderStack.Screen
        name="bill-search"
        component={BillDetail}
        options={{
          title: "Tìm kiếm hóa đơn",
        }}
      />
      <OrderStack.Screen
        name="order-search-for-guest"
        component={OrderSearchForGuest}
        options={({ navigation }) => ({
          title: "Tìm kiếm đơn đặt hàng",
          headerLeft: null,
          headerRight: () => (
            <View style={styles.titleBar}>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="notifications" size={24} color="#000040" />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: { borderBottomWidth: 0 },
        })}
      />
    </OrderStack.Navigator>
  );
};

export default OrderStackNavigation;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
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
    fontFamily: "'Roboto', sans-serif",
    color: "#000040",
    fontSize: 12,
  },

  titleBar: {
    flex: 1,
    flexDirection: "row",
  },
  iconBtnBar: {
    marginLeft: 5,
    marginRight: 5,
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
