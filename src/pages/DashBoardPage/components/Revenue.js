import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-elements";
import { formattedValueCurrency } from "../../../utils/formatNumber";
import orderApi from "../../../api/orderApi";

const Revenue = (props) => {
  const [totalDeposit, setTotalDeposit] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetTotalDeposit = async () => {
      try {
        const response = await orderApi.totalDeposit(
          props.date.toISOString().slice(0, 10)
        );
        setTotalDeposit(response);
      } catch (error) {
        console.log("Failed to fetch deposit", error);
      } finally {
        setLoading(false);
      }
    };
    fetTotalDeposit();
  }, [props.date]);
  return (
    <View style={styles.container}>
      <View style={styles.cardbackground}>
        <Icon reverse name="money-bill" type="font-awesome-5" color="#EFE29D" />
        <Text style={styles.textNumber}>
          {formattedValueCurrency(totalDeposit)}
        </Text>
        <Text style={styles.text}>Doanh thu</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardbackground: {
    backgroundColor: "#FFF7CD",
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

export default React.memo(Revenue);
