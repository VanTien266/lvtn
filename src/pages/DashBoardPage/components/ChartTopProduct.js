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
  BarChart,
} from 'react-native-chart-kit';

const ChartTopProduct = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <View>
            <Text style={styles.header}>Top sản phẩm bán chạy</Text>
            <BarChart
                data={{
                labels: ['kt1', 'jean2', 'tuyet3', 'sp4', 'sp5', 'sp6', 'sp7'],
                datasets: [
                    {
                    data: [20, 45, 28, 80, 99, 43, 40],
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
            </View>
          </View>
        </ScrollView>
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