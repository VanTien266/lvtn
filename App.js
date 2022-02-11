import { StyleSheet, View } from "react-native";
import { NativeBaseProvider, StatusBar } from "native-base";
import { BottomNavigation } from "./src/navigations";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

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
