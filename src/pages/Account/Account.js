// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// const Account = () => {
//   return (
//     <View>
//       <Text>This is account</Text>
//     </View>
//   );
// };

// export default Account;

// const styles = StyleSheet.create({});

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Account = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="large" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Account;
