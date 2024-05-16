import { SafeAreaView, StyleSheet, Image, View, Pressable, Text } from "react-native";
import { useUser } from '@/components/UserContext';
import { useEffect } from "react";


/** Logout component
 * State: None
 * Props: None
 */
function Profile() {
  const { setUser, user } = useUser();
  // console.log('beforeuser', user)

  /** Remove user from context when logging out */
  function onLogout() {
    setUser(null);

  }

  return (
    <SafeAreaView style={styles.container}>
    <Image source={require("../../assets/images/rithmLogo.png")} style={styles.image}/>
    {user &&
      <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={onLogout}>
              <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
      </View>}
      {!user && <View style={styles.loginContainer}>
        <Text style={styles.login}>Please Log in first!</Text>
      </View>
      }
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 70,
  },
  image : {
    height : 180,
    width : 190,
    marginTop: 20,
    marginBottom: 20
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
    justifyContent : "center",
    border: 'none'
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
  login: {
    fontSize: 25,
    color: '#e46b65',
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: 100
  }
})

export default Profile;