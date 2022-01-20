import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  BarChart,
} from 'react-native-chart-kit';
import productApi from "../../../api/productApi";

const ChartTopProduct = () => {
  const [chartWarehouse, setChartWarehouse] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetChartWarehouse = async () => {
      try {
        const response = await productApi.getChartWarehouseTrue();
        console.log(response);
        setChartWarehouse(response);
      }catch (error) {
        console.log("Failed to fetch warehouse", error);
      }
      finally {
        setLoading(false);
      }
    }
  fetChartWarehouse();
  },[]);
  const WarehouseLabel = [];
  const WarehouseData = [];
    chartWarehouse.forEach(function (item){
    WarehouseLabel.push(item._id)
    WarehouseData.push(item.countFabric)
    }); 
    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View>
            <Text style={styles.header}>Số cây vải trong từng kho</Text>
            {isLoading ? <ActivityIndicator/> : (
            <BarChart
              data={{
                labels: WarehouseLabel,
                datasets: [
                  {
                    data: WarehouseData,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16}
              height={220}
              // yAxisLabel={'Rs'}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
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
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    //   padding: 10,
    },
    header: {
      textAlign: 'center',
      fontSize: 16,
      padding: 10,
      marginTop: 10,
    },
  });

