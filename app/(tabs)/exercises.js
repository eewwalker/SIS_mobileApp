
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { formatDate } from "../helpers/utils";
import { useUser } from '@/components/UserContext';
import { DetailView } from '@/components/DetailView';

import * as SecureStore from 'expo-secure-store';

import {
  useFonts,
  SourceSerifPro_300Light,
  SourceSerifPro_600SemiBold,
} from '@expo-google-fonts/source-serif-pro';


export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [token, setToken] = useState('');
  const [exercise, setExercise] = useState(false);

  const {user} = useUser();

  async function getToken(key) {
    try {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        setToken(result);
        return result;
      } else {
        alert('No values stored under that key.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchExerciseData = async (exerciseData) => {
    console.log(exerciseData)
    try {
      const token = await getToken("token");
      const responses = await exerciseData.map(res => {
        return fetch(res.api_url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Token ${token}`
          }
        });
      });

      const jsonProms = await Promise.all(responses);
      const data = await Promise.all(jsonProms.map(r => r.json()));
      setExercises(data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchExercises = async () => {
    try {
      const token = await getToken("token");
      if (!token) {
        console.error("No token available");
        return;
      }
      const response = await fetch("http://localhost:8000/api/exercisesessions/", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }

      const data = await response.json();
      fetchExerciseData(data.results);

    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const goBack = () => {
    setExercise(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setExercise(item)}>
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{formatDate(item.exerciselabsession_set[0].start_at)}</Text>
    </View>
    </TouchableOpacity >
  );

  return (
    <SafeAreaView style={styles.container}>
      {user && !exercise &&
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      ></FlatList>}
      {exercise && <DetailView item= {exercise} goBack={goBack}/>}
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
