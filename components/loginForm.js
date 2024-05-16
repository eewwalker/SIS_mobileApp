import React, {useState} from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View }
  from 'react-native';

  const initialData = {
    username: '',
    password: '',
    loading: true
  }

/** Form to render when user is not logged in
 * State: userData
 * Props: logInUser
 */
export function LoginForm({logInUser}) {
  const [userData,setUserData] = useState(initialData);

  /** update username in state */
  function updateUserName(evt) {
    setUserData(fData=> ({
      ...fData,
      username: evt,

    }))
  }

  /** update password in state */
  function updatePassword(evt){
    setUserData(fData=> ({
      ...fData,
      password: evt,

    }))
  }

  /** handle submit and send userData to parent function */
  function handleSubmit(evt) {
    logInUser(userData);
    setUserData(initialData);
  }

  return(
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/images/rithmLogo.png")} style={styles.image}/>
      <View style={styles.inputView}>
      <TextInput style={styles.input} placeholder='USERNAME' value={userData.username} onChangeText={updateUserName} autoCorrect={false}
        autoCapitalize='none' />
      <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={userData.password} onChangeText={updatePassword} autoCorrect={false}
        autoCapitalize='none'/>
      </View>
        <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 70,
  },
  image : {
    height : 180,
    width : 190,
    marginTop: 20
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "#e46b65",
    borderWidth : 1,
    borderRadius: 7,
    margin: 6
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  button : {
    backgroundColor : "#e46b65",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center"
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  },
  buttonView :{
    width :"100%",
    paddingHorizontal : 50
  },
})