import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import {formattedValue} from "../../../utils/formatNumber";
import billApi from "../../../api/billApi";

const FabricRollCompleted = (props) => {
  const [fabricrollcompletedTotal, setFabricRollCompletedTotal] = useState();
  useEffect(() => {
    const fetchFabricRollCompletedTotal = async () => {
        try {
          const response = await billApi.getFabricRollBillCompleted(props.date.toISOString().slice(0, 10));
          console.log(response);
          setFabricRollCompletedTotal(response);
        }catch (error) {
          console.log("Failed to fetch fabric roll bill completed count", error);
        }
    }
    fetchFabricRollCompletedTotal();
  }, [props.date]);
  return (
    <View style={styles.container}>
      <View style={styles.cardbackground}>
        <Icon
          reverse
          name='truck-delivery'
          type='material-community'
          color='#EEB493'
        />
        <Text style={styles.textNumber}>
          {formattedValue(fabricrollcompletedTotal)}
        </Text>
        <Text style={styles.text}>
            Cây vải đã giao hoàn tất
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
        backgroundColor: "#FFE7D9",
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
  
export default FabricRollCompleted;