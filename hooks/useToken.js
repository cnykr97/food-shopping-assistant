import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env' 

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

  const fetchUser = async () => {
    const user = await fetchToken().then((token) => {
      fetch(`${BASE_URL}/users/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
    })
    return user
  }

  return {storeToken, fetchToken, fetchUser}
}



