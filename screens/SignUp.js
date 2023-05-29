import { View, Text, SafeAreaView, KeyboardAvoidingView, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import { CircularButton, FocusedStatusBar } from '../components'
import { COLORS, SIZES, assets } from '../constants'

const SignUp = ({setLogged, navigation}) => {
    const { width, height } = Dimensions.get("window")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isCeliacFree, setIsCeliacFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    const handleSubmit = () => {
        setLogged()
    }

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
            <View style={styles.preferencesSection}>
                <Text style={{color:COLORS.secondary, fontSize: SIZES.large, fontWeight: 'bold', marginBottom: SIZES.extraLarge*1.5}} >Please set your preferences:</Text>
                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I have gluten intolerance</Text>
                    <Switch 
                        value={isGlutenFree} 
                        onValueChange={() => setIsGlutenFree(!isGlutenFree)}
                        trackColor={{false: '#767577', true: COLORS.secondary}}
                        />
                </View>

                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I am Celiac</Text>
                    <Switch 
                        value={isCeliacFree} 
                        onValueChange={() => setIsCeliacFree(!isCeliacFree)} 
                        trackColor={{false: '#767577', true: COLORS.secondary}}
                        />
                </View>

                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I have lactose intolerance</Text>
                    <Switch 
                        value={isLactoseFree} 
                        onValueChange={() => setIsLactoseFree(!isLactoseFree)} 
                        trackColor={{false: '#767577', true: COLORS.secondary}}
                        />
                </View>

                <View style={styles.preference}>
                    <Text style={styles.preferenceTitle}>I am vegan</Text>
                    <Switch 
                        value={isVegan} 
                        onValueChange={() => setIsVegan(!isVegan)} 
                        trackColor={{false: '#767577', true: COLORS.secondary}}
                        />
                </View>
                <View style={{alignItems: 'center'}} >
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                        <Text style={styles.buttonText} > Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
                
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
    },
    preferencesSection: {
        flex: 2,
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