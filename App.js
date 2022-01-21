import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import DashBoard from "./src/pages/DashBoardPage/DashBoard";
import { NativeBaseProvider, StatusBar } from "native-base";
import { BottomNavigation } from "./src/navigations";

// export default function App() {
//   return (
    // <SafeAreaView style={{flex: 1}}>
    //   <ScrollView>
    //     <View style={styles.container}>
    //       <StatusBar style="light" />
    //       <View>
    //         <DashBoard />
    //       </View>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    // <SafeAreaView>
    //   <StatusBar backgroundColor="#00004080" />
    //   <BottomNavigation />
    // </SafeAreaView>

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar backgroundColor="#00004080" />
        <BottomNavigation />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
