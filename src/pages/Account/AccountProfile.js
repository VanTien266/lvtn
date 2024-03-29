import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { Center, Button } from "native-base";

const AccountProfile = ({ navigation }) => {
  const user = useSelector((state) => state.session).user;
  if (user)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.avatarSetting}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
            }}
            style={styles.imageAccount}
            resizeMode={"cover"}
          />
          {/* Check Role */}
          {user?.role === "ADMIN" || user?.role === "SALESMAN" || user?.role === "SHIPPER" ?
            <Text style={styles.nameText}>{user?.name}</Text>
          : 
          <TouchableOpacity onPress={() => navigation.navigate("membercard")}>
            <View style={{borderWidth: 1, borderColor:"#000040", padding: 5, width: 200, borderRadius: 5, alignItems: 'center' }}>
              <Text style={[styles.nameMember, {fontWeight: '600'}]}>Thẻ thành viên</Text>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.nameMember}>Hạng tiêu chuẩn</Text>
                <Text style={styles.nameMember}>Số điểm tích lũy: {user?.point}</Text>
              </View>
            </View>
          </TouchableOpacity>
        }
          
          <TouchableOpacity
            style={styles.iconSetting}
            onPress={() => navigation.navigate("setting")}
          >
            <AntDesign name="setting" size={24} color="#000040" />
          </TouchableOpacity>
        </View>
        <View style={styles.nameAccount}>
          <Text style={styles.contentText}>Tên tài khoản</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>{user?.name}</Text>
          </View>
        </View>
        <View style={styles.phoneAccount}>
          <Text style={styles.contentText}>Số điện thoại</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>{user?.phone}</Text>
          </View>
        </View>
        <View style={styles.emailAccount}>
          <Text style={styles.contentText}>Email</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.genderDateAccount}>
          <View style={styles.genderAccount}>
            <Text style={styles.contentText}>Giới tính</Text>
            <View style={styles.contentBox}>
              <Text style={styles.contentText}>{user?.gender}</Text>
            </View>
          </View>
          <View style={styles.dateAccount}>
            <Text style={styles.contentText}>Ngày sinh</Text>
            <View style={styles.contentBox}>
              <Text style={styles.contentText}>
                {moment(user?.birthday).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.addressAccount}>
          <Text style={styles.contentText}>Địa chỉ</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>{user?.address}</Text>
          </View>
        </View>
        <View style={styles.roleAccount}>
          <Text style={styles.contentText}>Role</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>
              {user?.role === "SALESMAN"
                ? "Nhân viên bán hàng"
                : user?.role === "ADMIN"
                ? "Quản lý"
                : user?.role === "SHIPPER"
                ? "Nhân viên giao hàng"
                : "Khách hàng"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  else
    return (
      <Center height="100%">
        <Button size="lg" onPress={() => navigation.navigate("signinscreen")}>
          Đăng nhập
        </Button>
      </Center>
    );
};

const TEXT = {
  fontSize: 14,
  color: "#000040",
  fontFamily: "Roboto",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  avatarSetting: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  nameAccount: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  phoneAccount: {
    flex: 1,
    paddingHorizontal: 10,
  },
  emailAccount: {
    flex: 1,
    paddingHorizontal: 10,
  },
  genderDateAccount: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  addressAccount: {
    flex: 1,
    paddingHorizontal: 10,
  },
  roleAccount: {
    flex: 1,
    paddingHorizontal: 10,
  },
  genderAccount: {
    flex: 1,
    marginRight: 10,
  },
  dateAccount: {
    flex: 1,
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
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000040",
  },
  iconSetting: {
    marginRight: 30,
  },
  contentBox: {
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#fff",
    borderColor: "#000040",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 5,
    paddingLeft: 5,
  },
  contentText: {
    ...TEXT,
  },
  nameMember:{
    fontSize: 16,
    fontWeight: "700",
    color: "#000040",
  }
});

export default AccountProfile;
