import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-elements";
import { formattedValue } from "../../../utils/formatNumber";
import orderApi from "../../../api/orderApi";

const TotalSale = (props) => {
  const [orderTotal, setOrderTotal] = useState();
  useEffect(() => {
    const fetCountOrder = async () => {
      try {
        const response = await orderApi.countAllOrderMonthly(
          props.date.toISOString().slice(0, 10)
        );
        setOrderTotal(response);
      } catch (error) {
        console.log("Failed to fetch order count", error);
      }
    };
    fetCountOrder();
  }, [props.date]);
  return (
    <View style={styles.container}>
      <View style={styles.cardbackground}>
        <Icon reverse name="local-mall" type="material" color="#26C636" />
        <Text style={styles.textNumber}>{formattedValue(orderTotal)}</Text>
        <Text style={styles.text}>Tổng đơn hàng</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardbackground: {
    backgroundColor: "#C8FACD",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 10,
    textAlign: "center",
  },
  textNumber: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TotalSale;
