import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Animated, TextInput, Button } from 'react-native'
import React, { useRef, useState } from 'react'
import { CircularButton, FocusedStatusBar } from '../components'
import BasketItemRow from '../components/BasketItemRow'
import { COLORS, SIZES, assets } from '../constants'

const Baskets = ({route, navigation}) => {

   const {width, height} = Dimensions.get('window');
   const { user } = route.params

   const [isCreatingBasket, setIsCreatingBasket] = useState(false)
   const slideAnimation = useRef(new Animated.Value(0)).current

   let items = user.baskets

   const DisplayBasketRows = ({items}) => {
    return items.map((basket, index) => {
        return (
            <BasketItemRow
                key={index}
                basket={basket}
                user={user}
                navigation={navigation}
            />
        )
    })
   }

   const [newBasketName, setNewBasketName] = useState('')

   const CreateBasketField = () => {

    const handleSubmit = () => {
        console.log("new basket created")
        setNewBasketName('')
        setIsCreatingBasket(false)
    }
    return(
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.base, marginTop: SIZES.medium}} >
            <TextInput
                value={newBasketName}
                onChangeText={setNewBasketName}
                placeholder='new basket name'
                style={styles.inputFiled}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.buttonCreate} >
                <Text style={{color: COLORS.secondary, fontWeight: 'bold'}} >Create</Text>
            </TouchableOpacity>
        </View>
    )
   }

   const toggleCreateBasket = () => {
    setIsCreatingBasket(!isCreatingBasket)
    Animated.timing(slideAnimation, {
        toValue: isCreatingBasket? -300 : 0,
        duration: 500,
        useNativeDriver: true
    }).start()
   }

   return (
    <SafeAreaView style={styles.container} >
        <FocusedStatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
        />

        <View style={{flex: 1, flexDirection: 'column'}} >
            <View style={styles.header} >
                <CircularButton imgUrl={assets.left} handlePress={() => navigation.navigate('Profile')}  top={SIZES.extraLarge} left={SIZES.small} width={50} height={50} />
                <Image source={assets.basketScreenHeaderImage} style={{width: width*0.5, height: height*0.2, marginBottom: SIZES.extraLarge}} />
                <Text style={styles.title} >Baskets</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={toggleCreateBasket} >
                    <Image source={assets.plusWhite} style={styles.buttonImage} />
                    <Text style={styles.buttonText} >Create New Basket</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={{ transform: [{translateX: slideAnimation}] }} >
                {isCreatingBasket && <CreateBasketField/> }
            </Animated.View>
            <Animated.ScrollView style={styles.content } >
                <DisplayBasketRows items={items} />
            </Animated.ScrollView>
        </View>
        
    </SafeAreaView>
   )

   
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.75,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary
    },
    content: {
        flex: 2,
        flexDirection: 'column',
        paddingVertical: SIZES.base,
    },
    title: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        fontSize: SIZES.extraLarge*1.4,
        fontWeight: "bold",
        margin: 10,
        color: COLORS.white
    },
    buttonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: '2px solid',
        borderColor: COLORS.white,
        borderRadius: 10,
        padding: SIZES.base,
        margin: SIZES.base
    },
    buttonImage: {
        marginRight: SIZES.base
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: "bold"
    },
    inputFiled: {
        flex: 1,
        marginRight: SIZES.base,
        borderWidth: '1.5px solid',
        borderColor: COLORS.secondary,
        borderRadius: 10,
        padding: SIZES.base
    },
    buttonCreate: {
        borderWidth: '1.5px solid',
        borderColor: COLORS.secondary,
        borderRadius: 10,
        padding: SIZES.base,
    }
})

export default Baskets