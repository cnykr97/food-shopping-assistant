import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { CircularButton, FocusedStatusBar } from '../components'
import { COLORS, SIZES, assets } from '../constants'

const BasketDetails = ({route, navigation}) => {

   const {width, height} = Dimensions.get('window');
   const { user, basket } = route.params

   const [items, setItems] = useState(basket.items)

   const DisplayItems = () => {
    const handleRemove = (product) => {
        setItems(items.filter(item => item.id!== product.id))
    }
    if (items.length) {
        return items.map((product, index) => {
            return (
                <TouchableOpacity style={styles.itemRow} key={index} onPress={() => {navigation.navigate("ProductDetails", {product, user, navigation})}} >
                    <Image source={product.image} style={{width: 75, height: 75}} />
                    <Text> {product.name} </Text>
                    <TouchableOpacity onPress={() => handleRemove(product)} >
                        <Image source={assets.removeIcon} />
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        })
    }
    return <Text style={{textAlign: 'center', margin: SIZES.base}} >Basket is empty</Text>
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
                <CircularButton imgUrl={assets.left} handlePress={() => navigation.navigate("Baskets", {user,basket,navigation})}  top={SIZES.extraLarge} left={SIZES.small} width={50} height={50} />
                <Image source={assets.basketScreenHeaderImage} style={{width: width*0.5, height: height*0.2, marginBottom: SIZES.extraLarge}} />
                <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', width: '100%'}} >
                    <Text style={styles.title} >{basket.basketName}</Text>
                    <TouchableOpacity style={styles.buttonContainer} >
                        <Image source={assets.plusWhite} style={styles.buttonImage} />
                        <Text style={styles.buttonText} >Add Item</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.basketInfo} >
                    <Text> Total Calories:  </Text>
                    <Text> {basket.totalCalories} </Text>
                </View>
            </View>
            <ScrollView style={styles.content } >
                <DisplayItems />
            </ScrollView>
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
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: SIZES.base,
        margin: SIZES.base
    }
})

export default BasketDetails