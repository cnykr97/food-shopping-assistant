import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CircularButton, FocusedStatusBar, ProductCard } from '../components'
import { COLORS, SIZES, assets } from '../constants'
import { FlatList } from 'react-native-gesture-handler'
import { BASE_URL } from '@env'
import useToken from '../hooks/useToken';

const Favorites = ({route, navigation}) => {
    const { user } = route.params
    const {width, height} = Dimensions.get('window');

    const { fetchToken } = useToken()

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchToken().then((token) => {
            fetch(`${BASE_URL}/product/like`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            })
            .then(response => {
                if (!response.ok) {
                    console.log('Status Code: ', response.status);
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => setFavorites(data))
            .catch(error => console.log(error))
        }) 
    }, [favorites])

    return (
        <SafeAreaView style={styles.container} >
            <FocusedStatusBar 
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={{display: 'flex', flexdirection:'column', height:"100%"}} >
                <View style={styles.header} >
                    <CircularButton imgUrl={assets.left} handlePress={() => navigation.navigate('Profile')}  top={SIZES.extraLarge} left={SIZES.small} width={50} height={50} />
                    <Image source={assets.favoritesScreenHeaderImage} style={{width: width*0.4, height: height*0.2}} />
                    <Text style={styles.title} >Favorites</Text>
                </View>
                <ScrollView style={{height: "100%", width:"100%", padding: SIZES.base}} vertical={true} >
                    {favorites && favorites.map((product) => <ProductCard product={product} user={user} key={product.id}/>)}
                </ScrollView>

                {/* {favorites && <FlatList
                    data={favorites}
                    renderItem= { ({item}) => <ProductCard product={item} user={user} /> }
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    style={{padding: SIZES.extraLarge}}
                />} */}

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