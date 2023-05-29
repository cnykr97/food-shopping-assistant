import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { assets, COLORS, FONTS, SIZES } from '../constants'
import { FocusedStatusBar } from '../components'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ProductNotFound = ({route, navigation}) => {
    const {user, photo} = route.params

    const [isSelected, setisSelected] = useState(false)

  return (
    <SafeAreaView style={styles.container} >
        <FocusedStatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
        />
        <View style={styles.header} >
            <Image source={assets.logo} resizeMode="contain" style={{width:240, height:200}} />
        </View>
        <View style={styles.content} >
            <View style={styles.title} >  
                <Text style={styles.titleHeader} >Sorry, </Text>
                <Text style={styles.titleText} >We couldn't recognize the product in your photo {":("} </Text>
            </View>
            <KeyboardAvoidingView 
                style={styles.sendFeedback}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
             >
                <Text style={styles.feedbackText} >If you want to help us to improve our system, send the name of the product you want to scan, so we can add in our system!</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                    <TextInput 
                    style={styles.inputText} 
                    />
                    <TouchableOpacity style={styles.sendButton} >
                        <Text style={{color: COLORS.secondary, fontSize: SIZES.medium}} >Send</Text>
                    </TouchableOpacity>
                </View>
                <BouncyCheckbox
                    size={30}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    style={{marginTop: SIZES.base}}
                    text="Share Photo"
                    textStyle={{ color: COLORS.white, textDecorationLine: "none", }}
                    onPress={() => setisSelected(!isSelected)}
                />
                <Text style={{color: COLORS.white}} > {"(By giving permission to share photo, you are sharing the photo you just scanned with us. We are not responsible for privacy problems.) "} </Text>
                
            </KeyboardAvoidingView>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.navigate("TakePhoto")}    
            >
                <Text style={styles.backButtonText} > ← Back To TakePhoto Screen </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexdirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    content: {
        flex: 2,
        flexdirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        padding: SIZES.extraLarge,
        backgroundColor: COLORS.secondary
    },
    titleHeader: {
        color: COLORS.white,
        fontSize: SIZES.extraLarge*1.5,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    titleText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
    },
    sendFeedback: {
        display: 'flex',
        flexDirection: 'column'
    },
    feedbackText: {
        color: COLORS.white,
        marginBottom: SIZES.base,
    },
    inputText: {
        width: '80%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base
    },
    sendButton: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.base*1.2
    },
    backButton: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.medium,
        width: '70%'
    },
    backButtonText: {
        color: COLORS.secondary,
        fontWeight: 'bold'
    }
})

export default ProductNotFound