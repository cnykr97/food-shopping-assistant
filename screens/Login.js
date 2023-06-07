import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FocusedStatusBar } from '../components'
import { COLORS, SIZES, assets } from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({setLogged, navigation}) => {
    const { width, height } = Dimensions.get("window")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [required, setrequired] = useState(false)
    const [wrongInput, setWrongInput] = useState(false)


    const RequiredFieldsMessage = () => {
        setWrongInput(false)
        return <Text style={{color: "red"}} > both e-mail and password are required! </Text>
    }

    const WrongInputMessage = () => {
        setrequired(false)
        return <Text style={{color: "red"}} > e-mail or password is wrong! </Text>
    }
    
    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('@token', token.toString());
        } catch (e) {
            // Saving error
            console.error(e);
        }
    }

    // // Fetch the token
    // const getToken = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('@token')
    //         if(value !== null) {
    //         return value;
    //         }
    //     } catch(e) {
    //         // Read error
    //         console.error(e);
    //     }
    // }

    const handleSignIn = () => {
        if (!email || !password) {
            setrequired(true)
            return;
        }
        handleLogin(email, password)
    }

    const handleLogin = (email, password) => {
        
        const details = {
        'username': email,
        'password': password,
        };
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('http://52.206.14.6:8000/login/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        })
        .then((response) => response.json())
        .then((json) => {
            if (json && json.access_token) {
                storeToken(json.access_token)
                setLogged()
            } else {
            setWrongInput(true)
            //validation error
            console.log('Login error!', json);
            }
        })
        .catch((error) => {
            console.error('Network error!', error);
        });
    };


    return (
    <SafeAreaView style={styles.container} >
        <FocusedStatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
        />
        <View style={styles.header} >
            <Image source={assets.logo} style={{width: width*0.4, height: height*0.15}} />
        </View>
        <KeyboardAvoidingView 
            style={styles.content}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <Image source={assets.welcome} style={{width: width*0.6, height: height*0.15, marginBottom: SIZES.extraLarge*2}} />
            { required && <RequiredFieldsMessage/> }
            { wrongInput && <WrongInputMessage/> }
            <TextInput
                style={styles.inputField}
                onChangeText={setEmail}
                value={email}
                keyboardType='email-address'
                placeholder="Email"
                placeholderTextColor={COLORS.primary}
            />
            <TextInput
                style={styles.inputField}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={COLORS.primary}
            />
            <View style={{flexDirection:'row', justifyContent: 'flex-end', width:'70%'}} >
                <TouchableOpacity >
                    <Text style={{color: COLORS.white}} > Forgot Your Password? </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignIn} >
                <Text style={styles.buttonText} > Sign In </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp', {handleLogin})} >
                <Text style={styles.link} > Don't you have an account? Sign Up → </Text>
            </TouchableOpacity>
            <Text style={styles.copyright} >© by Wdaw, 2023, All Rights Reserved</Text>
        </KeyboardAvoidingView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexdirection: 'column'
    },
    header: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.extraLarge*2
    },
    content: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary
    },
    inputField: {
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.medium,
        margin: SIZES.base,
        width: '70%'
    },
    button: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.medium,
        marginTop: SIZES.extraLarge*1.5,
        width: '50%'
    },
    buttonText: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    link: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginTop: SIZES.large,
    },
    copyright: {
        color: COLORS.white,
        position: 'absolute',
        bottom: SIZES.base,
    }
})

export default Login