import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { CircularButton, FocusedStatusBar } from '../components'
import { COLORS, SIZES, assets } from '../constants'
import { BASE_URL } from '@env'
import useToken from '../hooks/useToken';

const BasketDetails = ({route, navigation}) => {

   const {width, height} = Dimensions.get('window');
   const { basket, totalCalories, setTotalCalories, setBaskets } = route.params
   const { fetchToken } = useToken()

   const [items, setItems] = useState(basket.products)

   const DisplayItems = () => {
    if (items.length>0) {
        return items.map((product) => {
            return (
                <TouchableOpacity style={styles.itemRow} key={product.id} onPress={() => {navigation.navigate("ProductDetails", {product, navigation})}} >
                    <Image source={{ uri: product["photo_url"] }} style={{width: 75, height: 75, borderRadius:SIZES.base}} />
                    <Text> {product.name} </Text>
                    <TouchableOpacity onPress={() => handleRemoveItem(product)} >
                        <Image source={assets.removeIcon} />
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        })
    }
    return <Text style={{textAlign: 'center', margin: SIZES.base}} >Basket is empty</Text>
   }

   const handleRemoveItem = (product) => {
        fetchToken().then((token) => {
            fetch(`${BASE_URL}/basket/${basket.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }, 
                body: JSON.stringify({
                    "name": basket.name,
                    "products": basket.products.filter(itemId => itemId !== product.id)
                })
            })
        })
        .then((response) =>{
            if (response.ok) {
                setItems((items) => items.filter(item => item.id !== product.id))
            }
        })
        .then(() => setTotalCalories((prev) => prev - product.nutrition.calories ))
        .catch(err => console.log(err))
        
    }

   const handleDeleteBasket = () => {
    fetchToken().then(token => {
        fetch(`${BASE_URL}/basket/${basket.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(() => setBaskets((baskets) => baskets.filter(item => item.id!== basket.id)))
        .then(() => navigation.navigate("Baskets", {navigation}))
    })
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
                <CircularButton imgUrl={assets.left} handlePress={() => navigation.navigate("Baskets", {navigation})}  top={SIZES.extraLarge} left={SIZES.small} width={50} height={50} />
                <Image source={assets.basketScreenHeaderImage} style={{width: width*0.5, height: height*0.2, marginBottom: SIZES.extraLarge}} />
                <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', width: '100%'}} >
                    <Text style={styles.title} >{basket.name}</Text>
                    <TouchableOpacity style={styles.buttonContainer} >
                        <Image source={assets.plusWhite} style={styles.buttonImage} />
                        <Text style={styles.buttonText} >Add Item</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.basketInfo} >
                    <Text> Total Calories:  </Text>
                    <Text> {totalCalories} </Text>
                </View>
            </View>
            <ScrollView style={styles.content } >
                <DisplayItems />
            </ScrollView>
            <View style={{display: "flex", justifyContent: 'center', alignItems: 'center'}} >
                <TouchableOpacity style={styles.deleteBasketButton} onPress={handleDeleteBasket} >
                    <Text style={styles.deleteBasketButtonText} > Delete Basket </Text>
                </TouchableOpacity>
            </View>
            
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
        fontSize: SIZES.extraLarge*1.4,
        fontWeight: "bold",
        margin: 10,
        color: COLORS.white
    },
    basketInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: SIZES.base,
        margin: SIZES.base
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
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
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: SIZES.base,
        margin: SIZES.base
    },
    deleteBasketButton: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.attention,
        padding: SIZES.base,
        margin: SIZES.large,
        borderRadius: SIZES.base
    },
    deleteBasketButtonText: {
        color: COLORS.white,
        fontWeight: "bold"
    }
})

export default BasketDetails