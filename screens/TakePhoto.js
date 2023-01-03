// reference: https://www.youtube.com/watch?v=4WPjWK0MYMI
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { CircularButton} from '../components'
import { assets, COLORS, FONTS, SIZES } from '../constants';
import axios from 'axios';
import { ProductData } from '../constants';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  return <SafeAreaView style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:COLORS.white, height:"100%", width:"100%"}} >
    <Image source={assets.logo} resizeMode="contain" style={{width:120, height:100}} />
    <Text style={{fontFamily: FONTS.semiBold, color:COLORS.secondary}} > Scanning the image... </Text>
  </SafeAreaView>
}

const TakePhoto = () => {
  let navigation2 = useNavigation();

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto)

  };

  if (photo) {

    let data = new FormData();
    data.append('file', { uri: photo.uri, name: 'photo.png', filename: 'imageName.jpg', type: 'image/jpg' });

    let config = {
      headers: { 
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'responseType': 'json'
      }
    };

    axios.post('http://34.240.229.186/photo', data, config)
    .then( (response) => {
      for (const product of ProductData) {
        if (product.name === Object.values(response.data)[1]) {}
        navigation2.navigate("ProductDetails", {product, navigation2})
      }
    })
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <CircularButton imgUrl={assets.takePictureIcon} handlePress={takePic} width={100} height={100} backgroundColor={"transparent"} borderWidth={3} borderColor={COLORS.white} borderRadius={"50%"} />
      </View>
    </Camera>
  );
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
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});

export default TakePhoto