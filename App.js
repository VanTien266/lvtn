import { StyleSheet, View } from "react-native";
import { StatusBar } from "native-base";
import { BottomNavigation } from "./src/navigations";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#00004080" />
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
