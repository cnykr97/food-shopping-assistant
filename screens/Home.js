import { View, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { COLORS, ProductData } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import {ProductCard, HomeHeader, FocusedStatusBar} from '../components'
import useToken from '../hooks/useToken'
import { BASE_URL } from '@env'

const Home = ({ route }) => {

  const {storeToken, fetchToken} = useToken()

  const { user } = route.params

  const [productData, setProductData] = useState(ProductData)

  const [recommendeds, setRecommendeds] = useState([])

  const handleSearch = (textValue) => {
    if(!textValue) {
      setProductData(ProductData)
    }

    const filteredData = ProductData.filter( (product) => product.category.toLowerCase().includes(textValue.toLowerCase()) || product.name.toLowerCase().includes(textValue.toLowerCase()))

    if(filteredData.length) {
      setProductData(filteredData)
    }else {
      setProductData(ProductData)
    }
  }

  useEffect(() => {
    fetchToken().then((token) => {
      fetch(`${BASE_URL}/product/recommended`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
      .then(response => response.json())
      .then(data => setRecommendeds(data))
    });
  }, []);

  return (
    <SafeAreaView>
      <FocusedStatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View>
        <View>
          <HomeHeader onSearch={handleSearch} user={user} />
          <ScrollView showsVerticalScrollIndicator={false} >
            {!!recommendeds.length && recommendeds.map((item) => <ProductCard product={item} user={user} key={item.id} />) }
          </ScrollView>
          
          {/* { recommendeds.length && <FlatList 
            data={recommendeds}
            renderItem= { ({item}) => <ProductCard product={item} user={user} /> }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            //ListHeaderComponent={<HomeHeader onSearch={handleSearch} user={user} />}
          />} */}
        </View>

        <View style={{
          position: "absolute",
          top:0,
          bottom:0,
          right:0,
          left:0,
          zIndex:-1
          }}>
            <View style={{height: "100%", backgroundColor: COLORS.secondary}} ></View>
            <View style={{flex:1, backgroundColor: COLORS.white}} ></View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home