// import React from 'react';
// import { VStack, Box, Divider, NativeBaseProvider } from 'native-base';

// export default function TotalSale() {
//   return (
//     <NativeBaseProvider>
//         <Box border="1" borderRadius="md">
//       <VStack space="4" divider={<Divider />}>
//         <Box px="4" pt="4">
//           NativeBase
//         </Box>
//         <Box px="4">
//           NativeBase is a free and open source framework that enable developers
//           to build high-quality mobile apps using React Native iOS and Android
//           apps with a fusion of ES6.
//         </Box>
//         <Box px="4" pb="4">
//           GeekyAnts
//         </Box>
//       </VStack>
//     </Box>
//     </NativeBaseProvider>
    
//   );
// }

// import React, { useState } from 'react';
// import { CheckBox, Icon } from 'react-native-elements';

// const CheckboxComponent = () => {
//   const [check1, setCheck1] = useState(false);
//   const [check2, setCheck2] = useState(false);
//   const [check3, setCheck3] = useState(false);
//   const [check4, setCheck4] = useState(false);

//   return (
//     <>
//       <CheckBox
//         center
//         title="Click Here"
//         checked={check1}
//         onPress={() => setCheck1(!check1)}
//       />

//       <CheckBox
//         center
//         title="Click Here"
//         checkedIcon="dot-circle-o"
//         uncheckedIcon="circle-o"
//         checked={check2}
//         onPress={() => setCheck2(!check2)}
//       />

//       <CheckBox
//         center
//         title={`Click Here to ${check3 ? 'Remove' : 'Add'} This Item`}
//         iconRight
//         iconType="material"
//         checkedIcon="clear"
//         uncheckedIcon="add"
//         checkedColor="red"
//         checked={check3}
//         onPress={() => setCheck3(!check3)}
//       />

//       <CheckBox
//         center
//         checkedIcon={
//           <Icon
//             name="radio-button-checked"
//             type="material"
//             color="green"
//             size={25}
//             iconStyle={{ marginRight: 10 }}
//           />
//         }
//         uncheckedIcon={
//           <Icon
//             name="radio-button-unchecked"
//             type="material"
//             color="grey"
//             size={25}
//             iconStyle={{ marginRight: 10 }}
//           />
//         }
//         checked={check4}
//         onPress={() => setCheck4(!check4)}
//       />
//     </>
//   );
// };

// export default CheckboxComponent;

import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import {fNumber} from "../../../utils/formatNumber";
import orderApi from "../../../api/orderApi";

const TotalSale = () => {
  const [orderTotal, setOrderTotal] = useState([]);

  useEffect(() => {
    const fetCountOrder = async () => {
        try {
          const response = await orderApi.countAllOrderMonthly();
          console.log(response);
          setOrderTotal(response);
        }catch (error) {
          console.log("Failed to fetch order count", error);
        }
    }
    fetCountOrder();
  }, []);
  return (
    <View style={styles.container}>      
      <View style={styles.cardbackground}>
        <Icon
          reverse
          name='sc-telegram'
          type='evilicon'
          color='#26C636'
        />
        <Text style={styles.textNumber}>
          {fNumber(orderTotal)}
        </Text>
        <Text style={styles.text}>
          Tổng đơn hàng
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
        backgroundColor: "#C8FACD",
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
  
  export default TotalSale;