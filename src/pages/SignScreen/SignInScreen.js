import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import CustomInput from "../../components/CustomInput";
import InputPassword from "../../components/InputPassword";
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {AuthContext} from "../../components/Context";

const SignInScreen = () => {
	const Users = [
		{
			id: 1, 
			email: 'user1@gmail.com',
			username: 'user1', 
			password: 'password', 
			userToken: 'token123'
		},
		{
			id: 2, 
			email: 'user2@gmail.com',
			username: 'user2', 
			password: 'pass1234', 
			userToken: 'token12345'
		},
		{
			id: 3, 
			email: 'testuser@gmail.com',
			username: 'testuser', 
			password: 'testpass', 
			userToken: 'testtoken'
		},
	];

	const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
	const [isSecure, setIsSecure] = useState(true);
	const navigation = useNavigation();
	const { signIn } = React.useContext(AuthContext);

	const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

	const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

	const loginHandle = (userEmail, password) => {

        const foundUser = Users.filter( item => {
            return userEmail == item.email && password == item.password;
        } );

        // if ( data.username.length == 0 || data.password.length == 0 ) {
        //     Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        // if ( foundUser.length == 0 ) {
        //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }
        signIn(foundUser);
    }


  	return (
    	<View style={styles.signInContainer}>
			<View style={styles.welcomeContainer}>
				<Text style={styles.text_header}>Welcome!</Text>
				<Text style={{fontSize: 16, color: 'white'}}>Đăng nhập để tiếp tục</Text>
			</View>
            
			<View style={styles.formContainer}>
				<Text style={styles.text_form}>Email</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputField}
						name="useremail"
						placeholder="Địa chỉ email"
						autoCapitalize='none'
						autoCorrect={false}
						// value={text}
						enablesReturnKeyAutomatically
						onChangeText={(val) => textInputChange(val)}
					/>
				</View>
				<Text style={styles.text_form}>Mật khẩu</Text>
				{/* <InputPassword name="password" placeholder="Nhập mật khẩu" /> */}
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputField}
						name="password"
						placeholder="Nhập mật khẩu"
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={isSecure}
						// value={password}
						enablesReturnKeyAutomatically
						onChangeText={(val) => handlePasswordChange(val)}
						maxLength={30}
					/>
					<Ionicons style={{marginRight: 5}} name={isSecure?"ios-eye-off-outline":"ios-eye-outline"} size={24} color="grey" onPress={() =>{setIsSecure((prev)=>!prev)}}/>
				</View>
				<TouchableOpacity style={{marginVertical: 5}}>
					<Text style={styles.text_formForgotPass}>Quên mật khẩu?</Text>
				</TouchableOpacity>
				
				<TouchableOpacity style={styles.buttonPrimary} onPress={() => {loginHandle( data.email, data.password )}}>
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
	},
	inputContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
		justifyContent: "space-between",
        borderWidth: 2,
        borderColor: '#000040',
        marginVertical: 5,
    },
    inputField: {
        padding: 10,
        fontSize: 16,
    },
})
export default SignInScreen;