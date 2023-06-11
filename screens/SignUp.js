import { View, Text, SafeAreaView, KeyboardAvoidingView, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CircularButton, FocusedStatusBar } from '../components'
import { COLORS, SIZES, assets } from '../constants'

const SignUp = ({route, navigation}) => {
    const { width, height } = Dimensions.get("window")

    const {handleLogin} = route.params

    const [required, setRequired] = useState(false)
    const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false)

    const RequiredFieldsMessage = () => {
        return <Text style={{color: "red"}} > both e-mail and password are required! </Text>
    }

    const EmailAlreadyTakenMessage = () => {
        return <Text style={{color: "red"}} > this e-mail is already been using! </Text>
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isCeliacFree, setIsCeliacFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isOrganic, setIsOrganic] = useState(false);
    const [isPeanut, setIsPeanut] = useState(false);
    const [isSesame, setIsSesame] = useState(false);

    const handleSignUp = () => {
        if (!email || !password) {
            setEmailAlreadyTaken(false)
            setRequired(true)
            return;
        }

        const dietPreferences = [];

        if (isGlutenFree) {
            dietPreferences.push("gluten_intolerance");
        }

        if (isCeliacFree) {
            dietPreferences.push("celiac");
        }

        if (isLactoseFree) {
            dietPreferences.push("lactose");
        }

        if (isVegan) {
            dietPreferences.push("vegan");
        }

        if (isOrganic) {
            dietPreferences.push("organic");
        }

        if (isPeanut) {
            dietPreferences.push("peanut_allergy");
        }

        if (isSesame) {
            dietPreferences.push("sesame_allergy");
        }

        fetch('http://52.206.14.6:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                surname: "User's Surname",
                email: email,
                password: password,
                diet: dietPreferences,
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if (json["detail"] !== "Email already taken") {
                handleLogin(email, password)
            }
            setRequired(false)
            setEmailAlreadyTaken(true)
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
                <CircularButton imgUrl={assets.left} handlePress={navigation.goBack}  top={SIZES.extraLarge} left={SIZES.small} width={50} height={50} />
                <Image source={assets.logo} style={{width: width*0.4, height: height*0.15}} />
            </View>
            <KeyboardAvoidingView 
                style={styles.content}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <Text style={styles.title} >Sign Up</Text>
                { required && <RequiredFieldsMessage/> }
                { emailAlreadyTaken && <EmailAlreadyTakenMessage/> }
                <TextInput
                    style={styles.inputField}
                    onChangeText={setName}
                    value={name}
                    placeholder="Name"
                    placeholderTextColor={COLORS.primary}
                />
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
            </KeyboardAvoidingView>
                <Text style={{color:COLORS.secondary, fontSize: SIZES.large, fontWeight: 'bold', margin: SIZES.medium}} >Please set your preferences:</Text>
            <ScrollView style={styles.preferencesSection} >
                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I have gluten intolerance</Text>
                    <Switch 
                        value={isGlutenFree} 
                        onValueChange={() => setIsGlutenFree(prev => !prev)}
                        trackColor={{false: COLORS.primary, true: COLORS.secondary}}
                        />
                </View>

                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I am Celiac</Text>
                    <Switch 
                        value={isCeliacFree} 
                        onValueChange={() => setIsCeliacFree(prev => !prev)} 
                        trackColor={{false: COLORS.primary, true: COLORS.secondary}}
                        />
                </View>

                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I have lactose intolerance</Text>
                    <Switch 
                        value={isLactoseFree} 
                        onValueChange={() => setIsLactoseFree(prev => !prev)} 
                        trackColor={{false: COLORS.primary, true: COLORS.secondary}}
                        />
                </View>

                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I am vegan</Text>
                    <Switch 
                        value={isVegan} 
                        onValueChange={() => setIsVegan(prev => !prev)} 
                        trackColor={{false: COLORS.primary, true: COLORS.secondary}}
                        />
                </View>
                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I want organic foods</Text>
                    <Switch 
                        value={isOrganic} 
                        onValueChange={() => setIsOrganic(prev => !prev)} 
                        trackColor={{false: COLORS.primary, true: COLORS.secondary}}
                        />
                </View>
                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I have peanut allergy</Text>
                    <Switch 
                        value={isPeanut} 
                        onValueChange={() => setIsPeanut(prev => !prev)} 
                        trackColor={{false: COLORS.primary, true: COLORS.secondary}}
                        />
                </View>
                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I have sesame allergy</Text>
                    <Switch 
                        value={isSesame} 
                        onValueChange={() => setIsSesame(prev => !prev)} 
                        trackColor={{false: COLORS.primary, true: COLORS.secondary}}
                        />
                </View>
                
            </ScrollView>
            <View style={{alignItems: 'center', marginTop: -SIZES.extraLarge}} >
                <TouchableOpacity style={styles.button} onPress={handleSignUp} >
                    <Text style={styles.buttonText} > Sign Up </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
    },
    title: {
        color: COLORS.white,
        fontSize: SIZES.large,
        textAlign: 'center',
        margin: SIZES.base
    },
    preferencesSection: {
        display: 'flex',
        padding: SIZES.extraLarge,
        backgroundColor: COLORS.white,
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
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.base,
        padding: SIZES.medium,
        margin: SIZES.base,
        width: '50%'
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: SIZES.base*0.4,
        borderRadius: 10
    },
    preferenceTitle: {
        color: COLORS.secondary,
        fontSize: SIZES.medium
    }
})

export default SignUp