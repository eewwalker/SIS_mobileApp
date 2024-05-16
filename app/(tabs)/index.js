
import { Image, StyleSheet, Platform, Text } from 'react-native';
import { LoginForm } from "@/components/loginForm";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/components/UserContext';
import { Home } from "@/components/Home";

import * as SecureStore from 'expo-secure-store';


export default function HomeScreen() {
  const {user, setUser} = useUser();

  async function saveToken(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log('token saved')

    } catch (error) {
      console.log('Error saving token:', error);
    }
  }


  async function logInUser(userData) {
    try {
      const resp = await fetch("http://localhost:8000/api/-token/",
        {
          'method': 'POST',
          body: JSON.stringify({
            "username": userData.username,
            "password": userData.password
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }

      const data = await resp.json();

      if (data.token) {
        await saveToken("token", data.token);
        setUser(userData);

      } else {
        console.log('No token received');
      }

    } catch (error) {
      console.log('Error logging in user:', error);
    }
  }

  return (
    <SafeAreaView>
      {!user &&
        <LoginForm logInUser={logInUser} />}
        {user &&  <Home/>}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  }
});
