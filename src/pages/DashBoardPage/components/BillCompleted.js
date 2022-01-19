// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Text, Icon } from 'react-native-elements';
// import {fNumber} from "../../../utils/formatNumber";

// const BillCompleted = () => {
//     return (
//       <>
//         <View style={styles.container}>
//             <View style={styles.cardbackground}>
//               <Icon
//                 reverse
//                 name='sc-telegram'
//                 type='evilicon'
//                 color='#9BE1FC'
//                 // backgroundColor='#92F09B'
//                 // fontSize='40'
//               />
//                 <Text style={styles.text} h4>
//                   {fNumber(100)}
//                 </Text>
//                 <Text style={styles.text}>
//                     Hóa đơn hoàn thành
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
//         backgroundColor: "#D0F2FF",
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
  
//   export default BillCompleted;
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