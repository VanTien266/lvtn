import React,  {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  PieChart,
} from 'react-native-chart-kit';
import orderApi from '../../../api/orderApi';

const ChartOrderStatus = () => {
  const [orderstatus, setOrderStatus] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderStatus = async () => {
        try {
          const response = await orderApi.getOrderStatus();
          console.log(response);
          setOrderStatus(response);
        }catch (error) {
          console.log("Failed to order status", error);
        }
        finally{
          setLoading(false);
        }
    }
    fetchOrderStatus();
  }, []);
  const CountOrder = [];
    orderstatus.forEach(function (item){
        CountOrder.push(item.lastStatusOrder);
    });
    const cancelOrder = CountOrder[0];
    const completedOrder = CountOrder[1];
    const processingOrder = CountOrder[2];
    console.log('Result:', cancelOrder, completedOrder, processingOrder );

    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View>
            <Text style={styles.header}>Tình trạng xử lý đơn đặt hàng</Text>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
            <PieChart
                data={[
                {
                    name: 'Đang xử lý',
                    myCountOrder: processingOrder,
                    color: '#f8ca00',
                    legendFontColor: '#f8ca00',
                    legendFontSize: 13,
                },
                {
                    name: 'Hoàn tất',
                    myCountOrder: completedOrder,
                    color: '#4caf50',
                    legendFontColor: '#4caf50',
                    legendFontSize: 13,
                },
                
                {
                    name: 'Hủy',
                    myCountOrder: cancelOrder,
                    color: '#f44336',
                    legendFontColor: '#f44336',
                    legendFontSize: 13,
                },
                ]}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                }}
                style={{
                marginVertical: 8,
                borderRadius: 16,
                }}
                accessor="myCountOrder"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute //for the absolute number remove if you want percentage
            />
            )}
            </View>
          </View>
      </SafeAreaView>
    );
  };
  
  export default ChartOrderStatus;
  
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