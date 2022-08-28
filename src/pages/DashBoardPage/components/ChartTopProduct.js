import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import billApi from "../../../api/billApi";

// export const EmptyContent = () => {
//   return (
//     <View style={styles.noDataContainer}>
//       <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//         Không có dữ liệu để hiển thị
//       </Text>
//     </View>
//   );
// };

const ChartTopProduct = (props) => {
  const [fabrictypesell, setFabricTypeSell] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFabricTypeSell = async () => {
      try {
        const response = await billApi.getBillFabricTypeSell(
          props.date.toISOString().slice(0, 10)
        );
        setFabricTypeSell(response);
      } catch (error) {
        console.log("Failed to fetch fabric type sell", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFabricTypeSell();
  }, [props.date]);

  const TypeSellLabel = [];
  const TypeSellData = [];
  const length = fabrictypesell.length;
  fabrictypesell.forEach(function (item) {
    TypeSellLabel.push(item._id);
    TypeSellData.push(item.countFabrictype);
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Top sản phẩm bán chạy</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : length > 0 ? (
            <BarChart
              data={{
                labels: TypeSellLabel,
                datasets: [
                  {
                    data: TypeSellData,
                  },
                ],
              }}
              width={Dimensions.get("window").width - 16}
              height={220}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Không có dữ liệu để hiển thị
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChartTopProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 16,
    padding: 10,
    marginTop: 10,
  },
  noDataContainer: {
    borderWidth: 1,
    borderColor: "#000",
    width: 300,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#efefef",
  },
});
