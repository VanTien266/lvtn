// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Text, Icon } from 'react-native-elements';
// import {fNumberCurrency} from "../../../utils/formatNumber";

// const Revenue = () => {
//     return (
//       <>
//         <View style={styles.container}>
//             <View style={styles.cardbackground}>
//               <Icon
//                 reverse
//                 name='sc-telegram'
//                 type='evilicon'
//                 color='#EFE29D'
//               />
//                 <Text style={styles.text} h4>
//                   {fNumberCurrency(500000000)}
//                 </Text>
//                 <Text style={styles.text}>
//                     Doanh thu
//                 </Text>
//             </View>
//         </View>
//       </>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     fonts: {
//       marginBottom: 8,
//     },
//     cardbackground:{
//         backgroundColor: "#FFF7CD",
//         borderRadius: 5,
//         padding: 10,
//         justifyContent:'center', 
//         alignItems: 'center',
//     },
//     text: {
//         marginBottom: 10, 
//         textAlign:'center'
//     },
//     image: {
//       width: 30,
//       height: 30,
//       marginRight: 10,
//     },
//     name: {
//       fontSize: 16,
//       marginTop: 5,
//     },
//   });
  
//   export default Revenue;

import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import {fNumberCurrency} from "../../../utils/formatNumber";
import orderApi from '../../../api/orderApi';

const Revenue = () => {
  const [totalDeposit, setTotalDeposit] = useState([]);
  useEffect(() => {
    const fetTotalDeposit = async () => {
      try {
        const response = await orderApi.totalDeposit();
        console.log(response);
        setTotalDeposit(response);
      }catch (error) {
        console.log("Failed to fetch deposit", error);
      }
  }
    fetTotalDeposit();
  },[]);
  return (
    <View style={styles.container}>
      <View style={styles.cardbackground}>
        <Icon
          reverse
          name='sc-telegram'
          type='evilicon'
          color='#EFE29D'
        />
        <Text style={styles.textNumber}>
          {fNumberCurrency(totalDeposit)}
        </Text>
        <Text style={styles.text}>
            Doanh thu
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
        backgroundColor: "#FFF7CD",
        borderRadius: 5,
        padding: 10,
        justifyContent:'center', 
        alignItems: 'center',
    },
    text: {
        marginBottom: 10, 
        textAlign:'center',
    },
    textNumber: {
      marginBottom:10,
      fontSize:18,
      fontWeight: 'bold',
    }
  });
  
export default Revenue;