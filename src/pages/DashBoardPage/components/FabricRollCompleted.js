// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Text, Icon } from 'react-native-elements';
// import {fNumber} from "../../../utils/formatNumber";

// const FabricRollCompleted = () => {
//     return (
//       <>
//         <View style={styles.container}>
//             <View style={styles.cardbackground}>
//               <Icon
//                 reverse
//                 name='sc-telegram'
//                 type='evilicon'
//                 color='#EEB493'
//               />
//                 <Text style={styles.text} h4>
//                   {fNumber(100)}
//                 </Text>
//                 <Text style={styles.text}>
//                     Cây vải đã giao hoàn tất
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
//         backgroundColor: "#FFE7D9",
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
  
//   export default FabricRollCompleted;

import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import {fNumber} from "../../../utils/formatNumber";
import billApi from "../../../api/billApi";

const FabricRollCompleted = () => {
  const [fabricrollcompletedTotal, setFabricRollCompletedTotal] = useState([]);
  useEffect(() => {
    const fetchFabricRollCompletedTotal = async () => {
        try {
          const response = await billApi.getFabricRollBillCompleted();
          console.log(response);
          setFabricRollCompletedTotal(response);
        }catch (error) {
          console.log("Failed to fetch fabric roll bill completed count", error);
        }
    }
    fetchFabricRollCompletedTotal();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.cardbackground}>
        <Icon
          reverse
          name='sc-telegram'
          type='evilicon'
          color='#EEB493'
        />
        <Text style={styles.textNumber}>
          {fNumber(fabricrollcompletedTotal)}
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