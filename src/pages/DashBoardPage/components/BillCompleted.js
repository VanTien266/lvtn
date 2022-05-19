import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-elements";
import { formattedValue } from "../../../utils/formatNumber";
import billApi from "../../../api/billApi";

const BillCompleted = (props) => {
  const [billComplete, setBillComplete] = useState();
  useEffect(() => {
    const fetCountBillComplete = async () => {
      try {
        const response = await billApi.getBillCompleted(
          props.date.toISOString().slice(0, 10)
        );
        setBillComplete(response);
      } catch (error) {
        console.log("Failed to fetch bill complete count", error);
      }
    };
    fetCountBillComplete();
  }, [props.date]);
  return (
    <View style={styles.container}>
      <View style={styles.cardbackground}>
        <Icon
          reverse
          name="file-invoice-dollar"
          type="font-awesome-5"
          color="#9BE1FC"
        />
        <Text style={styles.textNumber}>{formattedValue(billComplete)}</Text>
        <Text style={styles.text}>Hóa đơn hoàn thành</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardbackground: {
    backgroundColor: "#D0F2FF",
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

export default React.memo(BillCompleted);
