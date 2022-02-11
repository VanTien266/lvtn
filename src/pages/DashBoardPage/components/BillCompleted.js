import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import {fNumber} from "../../../utils/formatNumber";
import billApi from "../../../api/billApi";

const BillCompleted = () => {
  const [billComplete, setBillComplete] = useState([]);
  useEffect(() => {
    const fetCountBillComplete = async () => {
        try {
          const response = await billApi.getBillCompleted();
          console.log(response);
          setBillComplete(response);
        }catch (error) {
          console.log("Failed to fetch bill complete count", error);
        }
    }
    fetCountBillComplete();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.cardbackground}>
        <Icon
          reverse
          name='sc-telegram'
          type='evilicon'
          color='#9BE1FC'
        />
        <Text style={styles.textNumber}>
          {fNumber(billComplete)}
        </Text>
        <Text style={styles.text}>
            Hóa đơn hoàn thành
        </Text>
      </View>
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardbackground:{
        backgroundColor: "#D0F2FF",
        borderRadius: 5,
        padding: 10,
        justifyContent:'center', 
        alignItems: 'center',
    },
    text: {
        marginBottom: 10, 
        textAlign:'center'
    },
    textNumber: {
      marginBottom:10,
      fontSize:18,
      fontWeight: 'bold',
    }
  });
  
  export default BillCompleted;