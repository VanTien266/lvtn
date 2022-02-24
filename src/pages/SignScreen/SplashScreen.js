import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {images} from "../../constants";

const SplashScreen = ({navigation}) => {
  	return (
		<View style={styles.container}>
			<View style={styles.containerBackground}>
				<Image 
					source={images.logo}
					resizeMode="contain"
					style={{
						width: 280,
						height: 280
					}}
				/>
				<Text style={{color: "white", fontSize: 28, fontWeight: "bold"}}>BK Fabric</Text>
			</View>
			<View style={styles.containerForm}>
				<Text style={{color:"#000040", fontSize: 20, fontWeight: "bold" }}>Quản lý hiệu quả</Text>
				<TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.push("signinscreen")}>
					<Text style={styles.textbuttonPrimary}>Bắt đầu</Text>
				</TouchableOpacity>
			</View>
		</View>
  	)
}

const styles = StyleSheet.create({
  	container: {
    	flex:1,
		backgroundColor: "#4470B0"
  	},
	containerBackground: {
		height: "60%",
		alignItems: "center",
		justifyContent: "center"
	},
	containerForm: {
		height: "40%",
		backgroundColor: "white",
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		padding: 20,
	},
	buttonPrimary: {
		backgroundColor: '#000040',
        width: '50%',
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
})
export default SplashScreen;    