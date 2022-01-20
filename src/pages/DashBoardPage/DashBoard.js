// import { StatusBar } from "expo-status-bar";
// import React,  {useState} from 'react';
// import { StyleSheet, View, SafeAreaView } from "react-native";
// import {Text, Icon} from "react-native-elements";
// import { StyleSheet, Text, View } from "react-native";

// export default function Dashboard() {
//   return (
//     <View style={styles.container}>
//       <Text>Dashboard</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
// //@ts-nocheck

// import React from "react"
// import {
//   Stack,
//   Center,
//   Heading,
//   ScrollView,
//   VStack,
//   Divider,
//   NativeBaseProvider,
// } from "native-base";

// export function Dashboard() {
//   return (
//     <ScrollView>
//       <VStack space="2.5" mt="4">
//         <Heading size="md">row</Heading>
//         <Stack direction="row" mb="2.5" mt="1.5" space={3}>
//           <Center
//             size="16"
//             bg="primary.500"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 1
//           </Center>
//           <Center
//             bg="secondary.500"
//             size="16"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 2
//           </Center>
//           <Center
//             size="16"
//             bg="emerald.500"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 3
//           </Center>
//         </Stack>
//         <Divider />
//         <Heading size="md">column</Heading>
//         <Stack mb="2.5" mt="1.5" direction="column" space={3}>
//           <Center
//             size="16"
//             bg="primary.500"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 1
//           </Center>
//           <Center
//             bg="secondary.500"
//             size="16"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 2
//           </Center>
//           <Center
//             size="16"
//             bg="emerald.500"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 3
//           </Center>
//         </Stack>
//         <Divider />
//         <Heading size="md">row-reverse</Heading>
//         <Stack mb="2.5" mt="1.5" direction="row" reversed space={3}>
//           <Center
//             size="16"
//             bg="primary.500"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 1
//           </Center>
//           <Center
//             bg="secondary.500"
//             size="16"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 2
//           </Center>
//           <Center
//             size="16"
//             bg="emerald.500"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 3
//           </Center>
//         </Stack>
//         <Divider />
//         <Heading size="md">column-reverse</Heading>
//         <Stack mb="2.5" mt="1.5" direction="column-reverse" space={3}>
//           <Center
//             size="16"
//             bg="primary.500"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 1
//           </Center>
//           <Center
//             bg="secondary.500"
//             size="16"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 2
//           </Center>
//           <Center
//             size="16"
//             bg="emerald.500"
//             rounded="sm"
//             _text={{
//               color: "warmGray.50",
//               fontWeight: "medium",
//             }}
//             shadow={"3"}
//           >
//             Box 3
//           </Center>
//         </Stack>
//         <Divider />
//       </VStack>
//     </ScrollView>
//   )
// }
// export default () => {
//   return (
//     <NativeBaseProvider>
//         <Dashboard />
//     </NativeBaseProvider>
//   )
// }

import { StyleSheet, View, StatusBar, SafeAreaView, ScrollView } from "react-native";
import { Text, Icon } from "react-native-elements";

import TotalSale from "./components/TotalSale";
import BillCompleted from "./components/BillCompleted";
import Revenue from "./components/Revenue";
import FabricRollCompleted from "./components/FabricRollCompleted";
import ChartFabricWarehouse from "./components/ChartFabricWarehouse";
import ChartOrderMonthly from "./components/ChartOrderMonthly";
import ChartBillStatus from "./components/ChartBillStatus";
import ChartOrderStatus from "./components/ChartOrderStatus";
import ChartTopProduct from "./components/ChartTopProduct";
import MonthYearPicker from "../../components/MonthYearPicker";

// export default function DashBoard() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>

//         <View style={styles.overview}>
//           <Text>Tổng quan</Text>
//         </View>

//         <View style={styles.statistics}>
//           <View style={styles.orderbillStatistics}>
//             <View style={styles.orderStatistics}>
//               <TotalSale />
//             </View>
//             <View style={styles.billStatistics}>
//               <BillCompleted />
//             </View>
//           </View>

//           <View style={styles.revenuefabricStatistics}>
//             <Text>Doanh thu, Cây vải</Text>
//             {/* <View style={styles.revenueStatistics}>
//               <Revenue />
//             </View> */}
//             {/* <View style={styles.fabricStatistics}>
//               <FabricRollCompleted />
//             </View> */}
//           </View>
//         </View>

//         <View style={styles.chartordermonthly}>

//         </View>

//         <View style={styles.chartfabricwarehouse}>

//         </View>

//         <View style={styles.chartfabrictypesell}>

//         </View>

//         <View style={styles.chartbillstatus}>

//         </View>

//         <View style={styles.chartorderstatus}>

//         </View>

//       </View>

//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   content:{
//     flex:1,
//   },
//   overview: {
//     flex:1,
//     // flexDirection:"row",
//   },
//   statistics: {
//     flex:1,
//     flexDirection:"row",
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   chartordermonthly: {
//     flex:1,
//   },
//   chartfabricwarehouse: {
//     flex:1,
//   },
//   chartbillstatus: {
//     flex:1,
//   },
//   chartbillstatus: {
//     flex:1,

//   },
//   chartorderstatus: {
//     flex:1,
//   },
//   orderbillStatistics: {
//     flex:1,
//   },
//   orderStatistics: {
//     flex:1,
//   },
//   billStatistics:{
//     flex:1,
//   },
//   revenuefabricStatistics: {
//     flex:1,
//     // flexDirection:"row",
//   }
// });

export default function DashBoard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.overview}>
        <Text style={styles.textTitle}>Tổng quan</Text>
        <View style={styles.containerDate}>
          <MonthYearPicker />
        </View>
        <View style={styles.iconSearch}>
          <Icon
            style={styles.iconSearchStyle}
            name="search"
            type="evillcons"
            color="grey"
            solid="true"
            size={28}
            onPress={() => console.log("search")}
          />
        </View>
        
        <View style={styles.iconNotification}>
          <Icon
            style={styles.iconNotificationStyle}
            name="notifications-outline"
            type="ionicon"
            color="grey"
            solid="true"
            size={28}
            onPress={() => console.log("notification")}
          />
        </View>
      </View>

      <View style={styles.statistics}>
        <View style={styles.orderbillStatistics}>
          <View style={styles.orderStatistics}>
            <TotalSale />
          </View>
          <View style={styles.billStatistics}>
            <BillCompleted />
          </View>
        </View>

        <View style={styles.revenuefabricStatistics}>
          <View style={styles.revenueStatistics}>
            <Revenue />
          </View>
          <View style={styles.fabricStatistics}>
            <FabricRollCompleted />
          </View>
        </View>
      </View>

      <View style={styles.chartordermonthly}>
        <ChartOrderMonthly />
      </View>

      <View style={styles.chartfabricwarehouse}>
        <ChartFabricWarehouse />
      </View>

      <View style={styles.charttopproduct}>
        <ChartTopProduct />
      </View>

      <View style={styles.chartorderstatus}>
        <ChartOrderStatus />
      </View>

      <View style={styles.chartbillstatus}>
        <ChartBillStatus />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overview: {
    flex: 1,
    flexDirection: "row",
    // position:'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
    // backgroundColor:"blue",
    padding: 5,
  },
  statistics: {
    flex: 1,
  },
  chartordermonthly: {
    flex: 1,
    // backgroundColor: "red",
  },
  chartfabricwarehouse: {
    flex: 1,
    backgroundColor: "blue",
  },
  chartfabrictypesell: {
    flex: 1,
    backgroundColor: "purple",
  },
  chartbillstatus: {
    flex: 1,
    backgroundColor: "orange",
  },
  chartorderstatus: {
    flex: 1,
    backgroundColor: "brown",
  },
  orderbillStatistics: {
    flex: 1,
    flexDirection: "row",
  },
  revenuefabricStatistics: {
    flex: 1,
    flexDirection: "row",
  },
  orderStatistics: {
    flex: 1,
    margin: 5,
  },
  billStatistics: {
    flex: 1,
    margin: 5,
  },
  revenueStatistics: {
    flex: 1,
    margin: 5,
  },
  fabricStatistics: {
    flex: 1,
    margin: 5,
  },
  textTitle: {
    fontSize:20,
    fontWeight:'bold',
    // margin: 5,
  },
  title: {
    flex:1,
  },
  containerDate: {
    flex:7,
    // backgroundColor:"blue",
  },
  iconSearch: {
    flex:1,
  },
  iconNotification:{
    flex:1,
    
  }

});
