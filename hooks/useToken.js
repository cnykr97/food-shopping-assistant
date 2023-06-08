import AsyncStorage from '@react-native-async-storage/async-storage';


export default function useToken() {
  const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('@token', token.toString());
        } catch (e) {
            // Saving error
            console.error(e);
        }
    }

  const fetchToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      return value;
    } catch(err) {
      console.error(err);
    }
  }

  return {storeToken, fetchToken}
}



