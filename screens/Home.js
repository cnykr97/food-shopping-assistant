import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { COLORS, ProductData } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import {ProductCard, HomeHeader, FocusedStatusBar} from '../components'


const Home = ({ route }) => {

  const { user } = route.params

  const [productData, setProductData] = useState(ProductData)

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

  return (
    <SafeAreaView>
      <FocusedStatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View>
        <View>
          <FlatList 
            data={productData}
            renderItem= { ({item}) => <ProductCard product={item} /> }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} user={user} />}
          />
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