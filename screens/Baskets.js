import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { FocusedStatusBar } from '../components'
import BasketItemRow from '../components/BasketItemRow'
import { COLORS, SIZES, assets } from '../constants'
import { Button } from 'react-native'

const Baskets = ({route, navigation}) => {

   const {width, height} = Dimensions.get('window');
   const { user } = route.params

   let items = user.baskets

   const DisplayBasketRows = ({items}) => {
    return items.map((basket, index) => {
        return (
            <BasketItemRow
                key={index}
                item={basket}
                navigation={navigation}
            />
        )
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
                <Image source={assets.basketScreenHeaderImage} style={{width: width*0.5, height: height*0.2, marginBottom: SIZES.extraLarge}} />
                <Text style={styles.title} >Baskets</Text>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Image source={assets.plusWhite} style={styles.buttonImage} />
                    <Text style={styles.buttonText} >Create New Basket</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content} >
                <DisplayBasketRows items={items} />
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
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary
    },
    content: {
        flex: 1.5,
        flexDirection: 'column',
        paddingVertical: SIZES.base

    },
    title: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        fontSize: 28,
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
    }
})

export default Baskets