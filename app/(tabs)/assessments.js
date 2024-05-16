
import {
  StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity,
  ActivityIndicator, Alert
} from "react-native";
import { useState, useEffect } from "react";
import { formatDate } from "../helpers/utils";
import { useUser } from '@/components/UserContext';
import { DetailView } from '@/components/DetailView';
import { getData } from '../helpers/api';

/** Assessments Tab
 * State: assessments, assessment, isLoading
 * Props: None
 */
export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [assessment, setAssessment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  /** Get all assessmentsession data */
  async function fetchData() {
    const data = await getData('assessmentsessions');
    setAssessments(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  /** Return to list view of assessments */
  const goBack = () => {
    setAssessment(false);
  };

  /** Render assessment data */
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setAssessment(item)}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>Start: {formatDate(item.start_at)}</Text>
        <Text>Due: {formatDate(item.end_at)}</Text>
      </View>
    </TouchableOpacity >
  );


  return (
    <SafeAreaView style={styles.container}>
      {!user && <View style={styles.loginContainer}>
        <Text style={styles.login}>Please Log in first!</Text>
      </View>}
      {isLoading && user && <View style={[styles.loader, styles.horizontal]}>
        <ActivityIndicator size="large" color="#e46b65" />
      </View>}
      {user && !assessment && !isLoading &&
        <FlatList
          data={assessments}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        ></FlatList>}
      {assessment && <DetailView item={assessment} goBack={goBack} />}
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
});
