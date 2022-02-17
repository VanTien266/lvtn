import React from "react";
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  Image,
  Icon,
  Button, 
  Alert, 
  TouchableOpacity,

  } from "react-native";

import { AntDesign } from '@expo/vector-icons'; 

const Account = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.avatarSetting}>
        <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' }}
          style={styles.imageAccount} resizeMode={'cover'} />
        <Text style={styles.nameText}>Nguyễn Văn Tĩnh</Text>
        <TouchableOpacity style={styles.iconSetting} onPress={()=>{Alert.alert("Click Setting")}}>
          <AntDesign name="setting" size={24} color="#000040" />
        </TouchableOpacity>
    </View>
    <View style={styles.nameAccount}>
      <Text style={styles.contentText}>Tên tài khoản</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>Nguyễn Văn Tĩnh</Text>
      </View>
    </View>
    <View style={styles.phoneAccount}>
      <Text style={styles.contentText}>Số điện thoại</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>0387949125</Text>
      </View>
    </View>
    <View style={styles.emailAccount}>
      <Text style={styles.contentText}>Email</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>nguyenvantinh06@gmail.com</Text>
      </View>
    </View>
    <View style={styles.genderDateAccount}>
      <View style={styles.genderAccount}>
        <Text style={styles.contentText}>Giới tính</Text>
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>Nam</Text>
        </View>
      </View>
      <View style={styles.dateAccount}>
        <Text style={styles.contentText}>Ngày sinh</Text>
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>23/03/2000</Text>
        </View>
      </View>
    </View>
    <View style={styles.addressAccount}>
      <Text style={styles.contentText}>Địa chỉ</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>Ký túc xá Khu A, ĐHQG Thành phố Hồ Chí Minh</Text>
      </View>
    </View>
    <View style={styles.roleAccount}>
      <Text style={styles.contentText}>Role</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>Quản lý</Text>
      </View>
    </View>
  </SafeAreaView>
);

const TEXT = {
  fontSize: 14,
  color: '#000040',
  fontFamily: 'Roboto',
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  avatarSetting: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameAccount: {
    flex:1,
    paddingHorizontal:10,
    marginTop:10,
  },
  phoneAccount: {
    flex:1,
    paddingHorizontal:10,
  },
  emailAccount: {
    flex:1,
    paddingHorizontal:10,
  },
  genderDateAccount: {
    flex:1,
    flexDirection: "row",
    paddingHorizontal:10,
  },
  addressAccount: {
    flex:1,
    paddingHorizontal:10,
  },
  roleAccount: {
    flex:1,
    paddingHorizontal:10,
  },
  genderAccount: {
    flex:1,
    marginRight: 10,
  },
  dateAccount: {
    flex:1,
  },
  imageAccount: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#000040",
    marginLeft: 30,
  },
  nameText:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#000040"
  },
  iconSetting: {
    marginRight: 30,
  },
  contentBox: {
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: '#000040',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 5,
    paddingLeft:5
  },
  contentText: {
    ...TEXT
  }
});

export default Account;
