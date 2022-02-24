import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomInput from "../../components/CustomInput";
import InputPassword from "../../components/InputPassword";

import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
	const navigation = useNavigation();
  	return (
    	<View style={styles.signInContainer}>
			<View style={styles.welcomeContainer}>
				<Text style={styles.text_header}>Welcome!</Text>
				<Text style={{fontSize: 16, color: 'white'}}>Đăng nhập để tiếp tục</Text>
			</View>
            
			<View style={styles.formContainer}>
				<Text style={styles.text_form}>Email</Text>
				<CustomInput name="user" placeholder="Địa chỉ email" />
				<Text style={styles.text_form}>Mật khẩu</Text>
				<InputPassword name="password" placeholder="Nhập mật khẩu" />
				<TouchableOpacity style={{marginVertical: 5}}>
					<Text style={styles.text_formForgotPass}>Quên mật khẩu?</Text>
				</TouchableOpacity>
				
				<TouchableOpacity style={styles.buttonPrimary}>
					<Text style={styles.textbuttonPrimary}>Đăng nhập</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('signupscreen')}>
					<Text style={styles.textbuttonSecondary}>Đăng ký</Text>
				</TouchableOpacity>
			</View>
    	</View>
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
        fontSize: 30
    },
	welcomeContainer: {
		height: "30%",
		padding: 30
	},
	formContainer: {
		height: "70%",
		backgroundColor: "white",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		padding: 30,
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
	},
	text_formForgotPass: {
		fontSize: 16,
		color: "#000040"
	}
})
export default SignInScreen;