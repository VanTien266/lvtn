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
  PieChart,
} from 'react-native-chart-kit';

const ChartBillStatus = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <View>
            <Text style={styles.header}>Tình trạng xử lý hóa đơn bán hàng</Text>
            <PieChart
                data={[
                {
                    name: 'Hoàn tất',
                    population: 50,
                    color: '#4caf50',
                    legendFontColor: '#4caf50',
                    legendFontSize: 13,
                },
                {
                    name: 'Đã xuất',
                    population: 30,
                    color: '#f8ca00',
                    legendFontColor: '#f8ca00',
                    legendFontSize: 13,
                },
                {
                    name: 'Đang vận chuyển',
                    population: 10,
                    color: '#2196f3',
                    legendFontColor: '#2196f3',
                    legendFontSize: 13,
                },
                {
                    name: 'Thất bại',
                    population: 10,
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
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute //for the absolute number remove if you want percentage
            />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ChartBillStatus;
  
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