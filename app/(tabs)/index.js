import { Image, StyleSheet, Platform, Text } from 'react-native';
import {LoginForm} from "@/components/loginForm"
import { SafeAreaView} from 'react-native-safe-area-context';


export default function HomeScreen() {


async function logInUser(userData){
  const resp = await fetch("http://localhost:8000/api/-token/",
  {
    'method': 'POST',
    body: JSON.stringify({
      "username" : userData.username,
      "password" : userData.password
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await resp.json();
  console.log('data', data)
}


  return(
    <SafeAreaView>
    <LoginForm logInUser={logInUser}/>
    </SafeAreaView>
  )}


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