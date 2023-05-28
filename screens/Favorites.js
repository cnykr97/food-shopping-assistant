import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import { CircularButton, FocusedStatusBar, ProductCard } from '../components'
import { COLORS, SIZES, assets } from '../constants'
import { FlatList } from 'react-native-gesture-handler'

const Favorites = ({route, navigation}) => {
    const { user } = route.params

    const {width, height} = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container} >
        <FocusedStatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
        />
        <View style={{flex:1, flexdirection:'column'}} >
            <View style={styles.header} >
                <CircularButton imgUrl={assets.left} handlePress={() => navigation.navigate('Profile')}  top={SIZES.extraLarge} left={SIZES.small} width={50} height={50} />
                <Image source={assets.favoritesScreenHeaderImage} style={{width: width*0.4, height: height*0.2}} />
                <Text style={styles.title} >Favorites</Text>
            </View>
            <FlatList
                data={user.favorites}
                renderItem= { ({item}) => <ProductCard product={item} user={user} /> }
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                style={{padding: SIZES.extraLarge}}
            />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexdirection: 'column',
    },
    header: {
        backgroundColor: COLORS.secondary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.extraLarge*2.2,
        paddingVertical: SIZES.extraLarge*6
    },
    content: {
        flex: 1.5
    },
    title: {
        color: COLORS.white,
        fontSize: SIZES.extraLarge*1.4,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: SIZES.base
    }
})

export default Favorites