import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Animated, TextInput, Button } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CircularButton, FocusedStatusBar } from '../components'
import BasketItemRow from '../components/BasketItemRow'
import { COLORS, SIZES, assets } from '../constants'
import useToken from '../hooks/useToken';
import { BASE_URL } from '@env'
import FavoritesContext from '../context/FavoritesContext'

const Baskets = ({navigation}) => {

   const {width, height} = Dimensions.get('window');
   const slideAnimation = useRef(new Animated.Value(0)).current
   const { fetchToken } = useToken()

   const [isCreatingBasket, setIsCreatingBasket] = useState(false)

   //const [baskets, setBaskets] = useState([])
   const { baskets, setBaskets } = useContext(FavoritesContext);

   useEffect(() => {
    fetchToken().then((token) => {
        fetch(`${BASE_URL}/basket/user`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => setBaskets(data))
    })
   }, [])
   
   const DisplayBasketRows = () => {
        return baskets.map((basket) => {
            return (
                <BasketItemRow
                    key={basket.id}
                    basket={basket}
                    navigation={navigation}
                    setBaskets = {setBaskets}
                />
            )
        })
   }

   const CreateBasketField = () => {
        const [newBasketName, setNewBasketName] = useState('')

        const handleSubmit = () => {
            if (!newBasketName) {
                console.log('Please enter a name')
                return 
            }
            fetchToken().then(token => {
                const newBasket = {
                    "name" : newBasketName,
                    "products": []
                }
                fetch(`${BASE_URL}/basket/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(newBasket)
                })
                .then((response => response.json()))
                .then(json => setBaskets([...baskets, json]))
                .finally(() => setNewBasketName(''))
            })
            
        }
        return(
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.base, marginTop: SIZES.medium}} >
                <TextInput
                    value={newBasketName}
                    onChangeText={(value) => setNewBasketName(value)}
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
    setIsCreatingBasket(prev => !prev)
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
                {baskets && <DisplayBasketRows />}
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
        flex: 3,
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