
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { formatDate } from "../helpers/utils";
import { useUser } from '@/components/UserContext';
import { DetailView } from '@/components/DetailView';
import { getData } from '../helpers/api';


export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();


  async function fetchData() {
    const data = await getData('exercisesessions');
    setExercises(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
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
      {isLoading && <View style={[styles.loader, styles.horizontal]}>
        <ActivityIndicator size="large" color="#e46b65" />
      </View>}
      {user && !exercise && !isLoading &&
        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        ></FlatList>}
      {exercise && <DetailView item={exercise} goBack={goBack} />}
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
