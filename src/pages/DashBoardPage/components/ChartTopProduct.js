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
import billApi from "../../../api/billApi";

const ChartTopProduct = () => {
  const [fabrictypesell, setFabricTypeSell] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFabricTypeSell = async () => {
        try {
          const response = await billApi.getBillFabricTypeSell();
          console.log(response);
          setFabricTypeSell(response);
        }catch (error) {
          console.log("Failed to fetch fabric type sell", error);
        }
        finally{
          setLoading(false);
        }
    }
    fetchFabricTypeSell();
  }, []);

  const TypeSellLabel = [];
  const TypeSellData = [];
    fabrictypesell.forEach(function (item){
    TypeSellLabel.push(item._id)
    TypeSellData.push(item.countFabrictype)
    }); 
    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View>
            <Text style={styles.header}>Top sản phẩm bán chạy</Text>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
            <BarChart
                data={{
                labels: TypeSellLabel,
                datasets: [
                    {
                    data: TypeSellData,
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