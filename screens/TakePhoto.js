import { StyleSheet, View, Image, Text, Button } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { CircularButton } from '../components';
import { assets, COLORS, FONTS, SIZES } from '../constants';
import axios from 'axios';
import { ProductData } from '../constants';
import { useNavigation } from '@react-navigation/native';
import ProductNotFound from './ProductNotFound';
import { BASE_URL} from '@env'
import  useToken  from '../hooks/useToken'

const LoadingScreen = () => {
  return (
    <View style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:COLORS.white, height:"100%", width:"100%"}} >
      <Image source={assets.logo} resizeMode="contain" style={{width:120, height:100}} />
      <Text style={{fontFamily: FONTS.semiBold, color:COLORS.secondary}} > Scanning the image... </Text>
    </View>
  )
}

const TakePhoto = () => {
  const navigation2 = useNavigation()
  const cameraRef = useRef()
  const [type, setType] = useState(CameraType.back)
  const [photo, setPhoto] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const { fetchToken } = useToken()

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto)
    setIsLoading(true)
  }

  const fetchProductData = async () => {
    let token = await fetchToken()
    let data = new FormData();
    data.append('file', { uri: photo.uri, name: 'photo.png', filename: 'imageName.jpg', type: 'image/jpeg' })

    let config = {
      headers: { 
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
      }
    }

    try {
      const response = await axios.post(`${BASE_URL}/product/photo`, data, config)
      setIsLoading(false)
      const product = response.data.product
      if (product) {
        navigation2.navigate("ProductDetails", {product, navigation2})
      }else {
        navigation2.navigate("ProductNotFound", {photo})
      }
      
    } catch (err) {
      setIsLoading(false)
      alert(err)
    }
  }

  useEffect(() => {
    if (photo) {
      fetchProductData()
    }
  }, [photo])

  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  if (isLoading){
    return <LoadingScreen/>
  } else {
    return (
      <Camera style={styles.container} ref={cameraRef} type={type} >
        <View style={styles.buttonContainer}>
          <CircularButton 
            imgUrl={assets.takePictureIcon} 
            handlePress={takePic} 
            width={100} 
            height={100} 
            backgroundColor={"transparent"} 
            borderWidth={3} 
            borderColor={COLORS.white} 
            borderRadius={"50%"} />
        </View>
      </Camera>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width:100,
    height:100,
    position:"absolute",
    bottom: SIZES.extraLarge*2
  },
})

export default TakePhoto;
