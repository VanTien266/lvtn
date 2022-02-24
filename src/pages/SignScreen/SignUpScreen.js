import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import CustomInput from "../../components/CustomInput";
import InputPassword from "../../components/InputPassword";

import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
	const navigation = useNavigation();
  	return (
    	<SafeAreaView style={styles.signInContainer}>
			<View style={styles.welcomeContainer}>
				<Text style={styles.text_header}>Đăng ký tài khoản</Text>
			</View>
            
			<ScrollView style={styles.formContainer}>
				<Text style={styles.text_form}>Email</Text>
				<CustomInput name="user_email" placeholder="Địa chỉ email" />
				<Text style={styles.text_form}>Số điện thoại</Text>
				<CustomInput name="phone" placeholder="Nhập số điện thoại" />
				<Text style={styles.text_form}>Họ tên</Text>
				<CustomInput name="user_name" placeholder="Nhập họ tên" />
				<Text style={styles.text_form}>Địa chỉ</Text>
				<CustomInput name="user_address" placeholder="Nhập địa chỉ email" />
				<Text style={styles.text_form}>Mật khẩu</Text>
				<InputPassword name="password" placeholder="Nhập mật khẩu" />
				
        		<TouchableOpacity style={styles.buttonPrimary} >
					<Text style={styles.textbuttonPrimary}>Đăng ký</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('signinscreen')}>
					<Text style={styles.textbuttonSecondary}>Đăng nhập</Text>
				</TouchableOpacity>
				
			</ScrollView>
    	</SafeAreaView>
  	)
}
const styles = StyleSheet.create({
	signInContainer: {
		flex:1,
		backgroundColor: "#4470B0"
	},
	text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    },
	welcomeContainer: {
		height: "15%",
		padding: 10,
    	marginBottom: 10,
	},
	formContainer: {
		height: "85%",
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
	},
	buttonPrimary: {
		backgroundColor: '#000040',
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#000040',
        justifyContent: "center",
        marginVertical: 5,
		height: 40,
	},
	textbuttonPrimary: {
		color: "white",
		fontSize: 16, 
		fontWeight: "bold",
	},
	buttonSecondary: {
		backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000040',
        justifyContent: "center",
        marginVertical: 5,
		height: 40,
	},
	textbuttonSecondary: {
		color: "#000040",
		fontSize: 16, 
		fontWeight: "bold",
	},
	text_form: {
		fontSize: 16,
	}
})
export default SignUpScreen;