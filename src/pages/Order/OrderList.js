import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList
} from "react-native";
import orderApi from "../../api/orderApi";
import transferOrderStatus from "../../utils/transferOrderStatus";

const SIZE = 14; //size list order per page
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const OrderList = ({ navigation }) => {
  const [listOrder, setListOrder] = useState([
    { orderId: "", clientID: { name: "" }, receiverPhone: "" },
  ]);
  const [page, setPage] = useState(1);
  // console.log('listOrder', listOrder);
  //Get order list
  const fetchListOrder = async () => {
    try {
      // page = 1
      // const response = await orderApi.getAll();
      const response = await orderApi.getAll(page, SIZE);
      // setListOrder(response);
      setRefreshing(false);
      if (page <= 1 )
        setListOrder(response);
      else {
        console.log('đã load more....');
        setListOrder([...listOrder,...response]);
        console.log('response loadmore', response);
      }
    } catch (error) {
      console.log("Failed to fetch order list", error);
    }
  };

  //refresh page
  const [refreshing, setRefreshing] = useState(false);

  function loadMore() {
    console.log('loadmore');
    console.log(Math.ceil(listOrder.length / SIZE) + 1);
    setPage(Math.round(listOrder.length / SIZE) + 1);
    // fetchListOrder(Math.round(listOrder.length / SIZE) + 1);
    fetchListOrder();
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchListOrder();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchListOrder();
    });
    return unsubscribe;
  }, [navigation]);

  const [displaySearch, setDisplaySearch] = useState(false);
  let handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };

  useEffect(() => {
    fetchListOrder();
  }, [fetchListOrder]);

  const headerComponent = () => (
      <View style={styles.headerList}>
        <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}>
          <Text style={styles.headerText}>Mã hóa đơn</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Người nhận</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Số điện thoại</Text>
        </View>
        <View style={[styles.verticalCenter, { flex: 4 }]}>
          <Text style={styles.headerText}>Trạng thái</Text>
        </View>
      </View>
  );

  const renderItem = ({item}) => {
    const {_id, orderStatus, orderId, clientID, receiverPhone} = item;
    return (
        orderStatus && (
          <TouchableOpacity
            style={styles.orderItem}
            key={_id}
            onPress={() =>
              navigation.push("order-detail", { orderId: _id })
            }
          >
            <View
              style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}
            >
              <Text style={styles.orderItemText}>MHĐ{orderId}</Text>
            </View>
            <View style={[styles.verticalCenter, { flex: 4 }]}>
              <Text style={styles.orderItemText}>{clientID.name}</Text>
            </View>
            <View style={[styles.verticalCenter, { flex: 4 }]}>
              <Text style={styles.orderItemText}>{receiverPhone}</Text>
            </View>
            {/* <View style={[styles.verticalCenter, { flex: 4 }]}>
              <Text
                style={[
                  styles.orderItemText,
                  transferOrderStatus(
                    orderStatus[orderStatus.length - 1].name
                  ).style,
                ]}
              >
                {
                  transferOrderStatus(
                    orderStatus[orderStatus.length - 1].name
                  )
                }
              </Text>
            </View> */}
          </TouchableOpacity>
        )
        )};

  return (
    // <ScrollView
    //   style={styles.container}
    //   contentContainerStyle={styles.scrollView}
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        
    //   }
    //   showsVerticalScrollIndicator={false}
    //   onEndReached={loadMore}
    //   onEndReachedThreshold={0.5}
    // >
    //   <View style={styles.headerList}>
    //     <View style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}>
    //       <Text style={styles.headerText}>Mã hóa đơn</Text>
    //     </View>
    //     <View style={[styles.verticalCenter, { flex: 4 }]}>
    //       <Text style={styles.headerText}>Người nhận</Text>
    //     </View>
    //     <View style={[styles.verticalCenter, { flex: 4 }]}>
    //       <Text style={styles.headerText}>Số điện thoại</Text>
    //     </View>
    //     <View style={[styles.verticalCenter, { flex: 4 }]}>
    //       <Text style={styles.headerText}>Trạng thái</Text>
    //     </View>
    //   </View>
    //   {listOrder.map(
    //     (order, idx) =>
    //       order.orderStatus && (
    //         <TouchableOpacity
    //           style={styles.orderItem}
    //           key={idx}
    //           onPress={() =>
    //             navigation.push("order-detail", { orderId: order._id })
    //           }
    //         >
    //           <View
    //             style={[styles.verticalCenter, { paddingLeft: 5, flex: 4 }]}
    //           >
    //             <Text style={styles.orderItemText}>MHĐ{order.orderId}</Text>
    //           </View>
    //           <View style={[styles.verticalCenter, { flex: 4 }]}>
    //             <Text style={styles.orderItemText}>{order.clientID.name}</Text>
    //           </View>
    //           <View style={[styles.verticalCenter, { flex: 4 }]}>
    //             <Text style={styles.orderItemText}>{order.receiverPhone}</Text>
    //           </View>
    //           <View style={[styles.verticalCenter, { flex: 4 }]}>
    //             <Text
    //               style={[
    //                 styles.orderItemText,
    //                 transferOrderStatus(
    //                   order.orderStatus[order.orderStatus.length - 1].name
    //                 ).style,
    //               ]}
    //             >
    //               {
    //                 transferOrderStatus(
    //                   order.orderStatus[order.orderStatus.length - 1].name
    //                 ).name
    //               }
    //             </Text>
    //           </View>
    //         </TouchableOpacity>
    //       )
    //   )}
    // </ScrollView>
    <FlatList 
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        
      }
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      // onEndReachedThreshold={0.5}
      renderItem={renderItem}
      data={listOrder}
      ListHeaderComponent={headerComponent}
    />
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFF",
  },
  headerList: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#B4B4C1",
    borderRadius: 5,
    minHeight: 30,
    marginTop: 10,
    marginBottom: 5,
  },
  headerText: {
    fontFamily: "Roboto",
    color: "#000040",
    fontWeight: "600",
    fontSize: 12,
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
  pageTitle: {
    fontFamily: "Roboto",
    color: "#000040",
    fontSize: 14,
    fontWeight: "600",
  },
  titleBar: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    marginEnd: "auto",
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconBtnBar: {
    marginLeft: 5,
    marginRight: 5,
  },
});
