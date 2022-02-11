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
  LineChart,
} from 'react-native-chart-kit';
import orderApi from "../../../api/orderApi";

const ChartOrderMonthly = () => {
  const [orderstatus, setOrderStatus] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderStatus = async () => {
        try {
          const response = await orderApi.countOrderDailyMonthly();
          console.log(response);
          setOrderStatus(response);
        }catch (error) {
          console.log("Failed to order daily monthly", error);
        }
        finally{
          setLoading(false);
        }
    }
    fetchOrderStatus();
  }, []);
  const OrderDailyLabel = [];
  const OrderDailyData = [];
    orderstatus.forEach(function (item){
    OrderDailyLabel.push(item._id.date)
    OrderDailyData.push(item.Total)
    }); 
    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View>
            <Text style={styles.header}>Biểu đồ đơn đặt hàng</Text>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
      <LineChart
        data={{
          labels: OrderDailyLabel,
          datasets: [
            {
              data: OrderDailyData,
              strokeWidth: 3,
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
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
  
  export default ChartOrderMonthly;
  
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