
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { formatDate } from "../helpers/utils";
import { DetailView } from '@/components/DetailView';
import { useUser } from '@/components/UserContext';

import * as SecureStore from 'expo-secure-store';


export default function Lectures() {
  const [lectures, setLectures] = useState([]);
  const [token, setToken] = useState('');
  const [lecture, setLecture] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

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


  const fetchLectureDetail = async (lectureData) => {
    try {
      const token = await getToken("token");
      const responses = lectureData.map(res => fetch(res.api_url, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${token}`
        }
      })
      );
      const jsonProms = await Promise.all(responses);
      const data = await Promise.all(jsonProms.map(r => r.json()));
      setLectures(data);
      setIsLoading(false);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchLectures = async () => {
    try {
      const token = await getToken("token");
      if (!token) {
        console.error("No token available");
        return;
      }
      const response = await fetch("http://localhost:8000/api/lecturesessions/", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch lectures');
      }

      const data = await response.json();
      fetchLectureDetail(data.results);

    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const goBack = () => {
    setLecture(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setLecture(item)}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>Start: {formatDate(item.start_at)}</Text>
      </View>
    </TouchableOpacity >
  );


  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <View style={[styles.loader, styles.horizontal]}>
        <ActivityIndicator size="large" color="#e46b65" />
      </View>}
      {user && !lecture && !isLoading &&
        <FlatList
          data={lectures}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        ></FlatList>}
      {lecture && <DetailView item={lecture} goBack={goBack} />}
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
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  }
});
