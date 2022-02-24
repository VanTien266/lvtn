import React, {useState, useEffect} from "react";
import { Button, Input, Icon } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OrderSearch() {
  const [searchTxt, setSearchTxt] = useState("");
  const searchOrder = (txtValue) => {
    setSearchTxt(txtValue);
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          bg="gray.100"
          borderRadius="5"
          py="1"
          px="2"
          placeholderTextColor="gray.500"
          _hover={{ bg: "gray.200", borderWidth: 0 }}
          borderWidth="0"
          _web={{
            _focus: { style: { boxShadow: "none" } },
          }}
          InputLeftElement={
            <Icon
              ml="2"
              size="5"
              color="gray.500"
              as={<Ionicons name="ios-search" />}
            />
          }
          onChangeText={searchOrder}
        />
      </View>
      <View style={styles.result}>
          <Text>Không có kết quả phù hợp</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        flex: 1
    },
    result: {
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})