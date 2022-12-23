import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FocusedStatusBar } from '../components'

const TakePhoto = () => {
  return (
    <SafeAreaView>
      <FocusedStatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Text>TakePhoto</Text>
    </SafeAreaView>
  )
}

export default TakePhoto