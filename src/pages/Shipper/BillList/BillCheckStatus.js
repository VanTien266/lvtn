import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckStatus, CustomerInfo } from "./components";
import { FlatList } from "native-base";

const BillCheckStatus = ({ route, navigation }) => {
  const { bill } = route.params;

  const data = [
    { id: 1, name: "check-status" },
    { id: 2, name: "customer-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "check-status":
        return <CheckStatus navigation={navigation} billId={bill._id} />;
      case "customer-info":
        return <CustomerInfo bill={bill} />;
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BillCheckStatus;

const styles = StyleSheet.create({});
