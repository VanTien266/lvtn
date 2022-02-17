import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon } from "native-base";

export default function WareHouseList() {
    return (
        <ScrollView>
            <View style={[styles.wareHouseEle, {backgroundColor: "green", borderColor: "green"}]}>
                <Text>Kho 1</Text>
            </View>
            <View style={[styles.wareHouseEle, {backgroundColor: "green", borderColor: "green"}]}>
                <Text>Kho 2</Text>
            </View>
            <View style={[styles.wareHouseEle, {backgroundColor: "green", borderColor: "green"}]}>
                <Text>Kho 3</Text>
            </View>
            <View style={[styles.wareHouseEle, {backgroundColor: "green", borderColor: "green"}]}>
                <Text>Kho 4</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wareHouseEle: {
        borderRadius: 10,
        borderWidth: 1,
        height: 30
    }
});