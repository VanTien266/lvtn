import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';

const ChartOrderMonthly = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <View>
            <Text style={styles.header}>Biểu đồ đơn đặt hàng tháng 12</Text>
      <LineChart
        data={{
        //   labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          datasets: [
            {
              data: [10, 25, 28, 30, 35, 43, 30, 45, 28, 32, 35, 50, 20, 24, 27, 30, 35, 42, 35, 48, 34, 32, 35, 50, 38, 20, 45, 48, 55, 32, 56],
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
            </View>
          </View>
        </ScrollView>
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