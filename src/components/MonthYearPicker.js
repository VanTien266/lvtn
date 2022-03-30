// // import React, { useState, useCallback } from 'react';
// // import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
// // import MonthPicker from 'react-native-month-year-picker';
// // import moment from 'moment';

// // const MonthYearPicker = () => {
// //   const [date, setDate] = useState(new Date());
// //   const [show, setShow] = useState(false);

// //   const showPicker = useCallback((value) => setShow(value), []);

// //   const onValueChange = useCallback(
// //     (event, newDate) => {
// //       const selectedDate = newDate || date;

// //       showPicker(false);
// //       setDate(selectedDate);
// //     },
// //     [date, showPicker],
// //   );

// //   return (
// //     <SafeAreaView>
// //       {/* <Text>Month Year Picker Example</Text> */}
// //       <Text>{moment(date, "MM-YYYY")}</Text>
// //       <TouchableOpacity onPress={() => showPicker(true)}>
// //         <Text>OPEN</Text>
// //       </TouchableOpacity>
// //       {show && (
// //         <MonthPicker
// //           onChange={onValueChange}
// //           value={date}
// //           minimumDate={new Date()}
// //           maximumDate={new Date(2025, 5)}
// //           locale="vn"
// //         />
// //       )}
// //     </SafeAreaView>
// //   );
// // };

// // export default MonthYearPicker;

// // App.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  SafeAreaView,
} from "react-native";
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
    // console.log(value.getUTCMonth() + 1);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>
          {" "}
          Tháng {month}, {date.getUTCFullYear()}{" "}
        </Text>
      </View>
      {/* <Text style={styles.pickedDate}> Tháng {date.getUTCMonth()+1}, {date.getUTCFullYear()} </Text> */}

      {/* The button that used to trigger the date picker */}
      {/* {!isPickerShow && (
        <View style={styles.iconDatePicker}>
          <Icon style={styles.iconDatePickerStyle}
            name='calendar-outline'
            type='ionicon'
            color='grey'
            solid='true'
            size={28}
            onPress={showPicker} />
        </View>
      )} */}
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
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 3,
  },
  pickedDateContainer: {
    flex: 2,
    // padding: 10,
    // backgroundColor: '#eee',
    // borderRadius: 5,
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

// import React, {useState} from 'react';
// import {View, Button, Platform, SafeAreaView , StyleSheet} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// export default function MonthYearPicker() {
//    const [mydate, setDate] = useState(new Date());
//    const [displaymode, setMode] = useState('date');
//    const [isDisplayDate, setShow] = useState(false);
//    const changeSelectedDate = (event, selectedDate) => {
//    const currentDate = selectedDate || mydate;
//    setDate(currentDate);
//    console.log(date)
// };
// const showMode = (currentMode) => {
//    setShow(true);
//    setMode(currentMode);
// };
// const displayDatepicker = () => {
//    showMode('date');
// };
// return (
//    <SafeAreaView style={styles.container}>
//       <View>
//          <Button onPress={displayDatepicker} title="Show date picker!" />
//             </View>
//                {isDisplayDate && (
//                   <DateTimePicker
//                      testID="dateTimePicker"
//                      value={mydate}
//                      mode={displaymode}
//                      is24Hour={true}
//                      display="default"
//                      onChange={changeSelectedDate}
//             />
//          )}
//       </SafeAreaView>
//    );
// };
// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center"
//    },
// });
