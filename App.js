import { StyleSheet, View } from "react-native";
import { StatusBar } from "native-base";
import { BottomNavigation } from "./src/navigations";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#00004080" />
      <BottomNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
