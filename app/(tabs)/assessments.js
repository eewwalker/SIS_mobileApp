import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet, View, Text, SafeAreaView, FlatList} from "react-native";
import {useState, useEffect} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import {Collapsible} from "@/components/Collapsible";
import {ExternalLink} from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {ScrollView} from "react-native-gesture-handler";

// import {API_TOKEN} from '@env'

// interface Item {
//   title: string;
//   // Add any other properties here
// }

export default function TabTwoScreen() {
  const initialData = {
    assessments : [],
    assessmentsDetail: []
  }
  const [assessments, setAssessments] = useState([]);


  const fetchAssessmentDetail = async (assessmentData) => {
    try {
      const responses = await assessmentData.map(res => {
        return fetch(res.api_url, {
          headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': 'Token 1d9f37cf23238e688ec018a8ec57a9ee19969332'
          }
        } )
      })
      console.log('resp', responses)
      const jsonProms = await Promise.all(responses);
      const promises = jsonProms.map(r => r.json());
      const data = await Promise.all(promises)
      console.log('data',data)
    } catch(error) {
      console.error(error)
    }
  }

  const fetchAssessments = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/assessmentsessions/", {
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization': 'Token 1d9f37cf23238e688ec018a8ec57a9ee19969332'
        }
      });

      const data = await response.json();
      setAssessments(data.results);
      fetchAssessmentDetail(data.results);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);


  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  console.log("characters: ", assessments);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text >Assessments</Text>
        </View>

      <FlatList
        data={assessments}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "blue",
    fontFamily: "serif-pro"
  },
  card: {
    height: 70,
    backgroundColor: "#e46b65",
    margin: 5,
    justifyContent: "center",
    alignContent: 'center'
  },
  header : {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
});
