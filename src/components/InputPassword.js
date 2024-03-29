import { View, StyleSheet, TextInput } from 'react-native'
import React, {useState} from 'react';
import {Ionicons} from '@expo/vector-icons';

const InputPassword = (props) => {
    const {name, placeholder} = props;
    const [password, setPassword] = useState('');
    const [isSecure, setIsSecure] = useState(true);
    const onChangeText = (text) => {
        setPassword(text);
    }
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.inputField}
                name={name}
                placeholder={placeholder}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={isSecure}
                value={password}
                enablesReturnKeyAutomatically
                onChangeText={onChangeText}
                maxLength={30}
            />
            <Ionicons style={{marginRight: 5}} name={isSecure?"ios-eye-off-outline":"ios-eye-outline"} size={24} color="grey" onPress={() =>{setIsSecure((prev)=>!prev)}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000040',
        justifyContent: "space-between",
        marginVertical: 5,
    },
    inputField: {
        padding: 10,
        fontSize: 16,
    },
})
export default InputPassword;