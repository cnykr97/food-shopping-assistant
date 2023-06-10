import { Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native'

const BasketItemRow = ({basket, user, navigation}) => {

  const [totalCalories, setTotalCalories] = useState(0)

  useEffect(() => {
    let total = 0
    basket.products.map(product => total += product.nutrition.calories)
    setTotalCalories(total)
  },[])

  return (
    <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate("BasketDetails",{basket, user})}} >
        <Text style={styles.basketName} > {basket.name} </Text>
        <Text> Total Calories: {totalCalories} </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: SIZES.extraLarge,
      paddingHorizontal: SIZES.base,
      marginVertical: SIZES.base
    },
    basketName: {
      color: COLORS.secondary,
      fontSize: SIZES.large,
      fontWeight: 'bold'
    }
})

export default BasketItemRow