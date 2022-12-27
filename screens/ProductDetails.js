import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CircularButton, FocusedStatusBar, ProductCard } from '../components'
import { assets, FONTS, SIZES } from '../constants'
import ContentRow from '../components/ContentRow'
import InfoDisplay from '../components/InfoDisplay'


const ContentDisplay = ({product}) => {
  const content = product.content
  const keys = Object.keys(content)

  return keys.map( (key) => {
    return <ContentRow imgUrl={assets[`${key}Icon`]} name={key} value={content[key]} />
  })
}

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params

  return (
    <SafeAreaView style={{ display:"flex", flexDirection:"column" }} >
      <ScrollView>
        <FocusedStatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <ProductCard product={product} />

        <CircularButton imgUrl={assets.left} handlePress={navigation.goBack}  top={SIZES.extraLarge} left={SIZES.small} width={50} height={50} />

        <InfoDisplay product={product} />

        <View style={{display:"flex", flexDirection:"column", marginTop: SIZES.small, marginLeft: SIZES.small}} >
          <View style={{marginBottom:SIZES.small, marginHorizontal:SIZES.small ,display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}} >
            <Text style={{fontFamily:FONTS.semiBold}} >
              Nutritive value 
            </Text>
            <Text style={{fontFamily:FONTS.semiBold}} >
              {"100g/ml"}
            </Text>
          </View>
          <ContentDisplay product={product} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductDetails