import React, { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "react-native-elements";

const MonthYearPicker = (props) => {
  const { month, setMonth } = props;
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    setMonth(value.getUTCMonth() + 1);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>
          Tháng {month}, {date.getUTCFullYear()}{" "}
        </Text>
      </View>
      <View style={styles.iconDatePicker}>
        <Icon
          style={styles.iconDatePickerStyle}
          name="calendar-outline"
          type="ionicon"
          color="grey"
          solid="true"
          size={28}
          onPress={showPicker}
        />
      </View>

      {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          value={date}
          mode={"date"}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  pickedDateContainer: {
    flex: 2,
    paddingTop: 3,
    paddingLeft: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  iconDatePicker: {
    flex: 1,
  },
});

export default MonthYearPicker;
