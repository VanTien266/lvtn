// import { registerRootComponent } from 'expo';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView  } from "react-native";
import DashBoard from "./src/pages/DashBoardPage/DashBoard";
import ChartFabricWarehouse from "./src/pages/DashBoardPage/components/ChartFabricWarehouse";

export default function App() {
  return (
    
    // <SafeAreaView style={styles.container}>
    //   <ScrollView>
    //     {/* <Text>I'm dev and I'm Tien</Text> */}
    //     <StatusBar style="auto" />
    //     <DashBoard />
    //   </ScrollView>
    // </SafeAreaView>
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <DashBoard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    // padding: 10,
  },
});

