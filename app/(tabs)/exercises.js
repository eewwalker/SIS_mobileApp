import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { formatDate } from "../helpers/utils";

import * as SecureStore from 'expo-secure-store';

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native-gesture-handler";

import {
  useFonts,
  SourceSerifPro_300Light,
  SourceSerifPro_600SemiBold,
} from '@expo-google-fonts/source-serif-pro';

async function getToken(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log("Token: ", result);
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert('No values stored under that key.');
    }
  } catch (error) {
    console.log(error);
  }
}


export default function Exercises() {
  const [exercises, setExercises] = useState([]);


  const fetchExerciseData = async (exerciseData) => {
    console.log(exerciseData)
    try {
      const token = await getToken("token");
      const responses = await exerciseData.map(res => {
        return fetch(res.api_url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Token ${token}`
            // 'Authorization': 'Token 067a9010faf05335990c711dc405083da4366e89'
            // 'Authorization': 'Token 1d9f37cf23238e688ec018a8ec57a9ee19969332'
          }
        });
      });

      const jsonProms = await Promise.all(responses);
      const promises = jsonProms.map(r => r.json());
      const data = await Promise.all(promises);
      setExercises(data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchExercises = async () => {
    try {
      const token = await getToken("token");
      const response = await fetch("http://localhost:8000/api/exercisesessions/", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${token}`
          // 'Authorization': 'Token 1d9f37cf23238e688ec018a8ec57a9ee19969332'
        }
      });

      const data = await response.json();

      fetchExerciseData(data.results);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  console.log("exercises: ", exercises);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    fontFamily: 'SourceSerifPro_300Light'
  },
  title: {
    color: "#00367d",
    fontSize: 16,
    fontFamily: "SourceSerifPro_300Light"
  },
  card: {
    height: 70,
    backgroundColor: "#ffffff",
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignContent: 'center',
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius: 10
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    fontSize: 20,
    paddingTop: 10,
    height: 50,
    paddingBottom: 10
  },
  headerTitle: {
    fontSize: 25,
    color: "black",
  }
});
