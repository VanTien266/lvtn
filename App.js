import { StyleSheet, View } from "react-native";
import { NativeBaseProvider, StatusBar } from "native-base";
import { BottomNavigation } from "./src/navigations";
import { SafeAreaView } from "react-native-safe-area-context";

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
