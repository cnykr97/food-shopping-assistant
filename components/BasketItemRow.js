import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native'

const BasketItemRow = ({basket, user, navigation}) => {

  return (
    <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate("BasketDetails",{basket, user})}} >
        <Text style={styles.basketName} > {basket.basketName} </Text>
        <Text> Total Calories: {basket.totalCalories} </Text>
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