import React, { useEffect, useState } from "react";
import { View, Text, SectionList, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { getData } from "@/app/helpers/api";
import { compareDates, sortByDate, formatDate } from "@/app/helpers/utils";
import { useUser } from '@/components/UserContext';


export function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  async function fetchData() {
    const assessments = await getData('assessmentsessions');
    const exercises = await getData('exercisesessions');
    const lectures = await getData('lecturesessions');
    const allData = [...assessments, ...exercises, ...lectures];

    const filteredDates = compareDates(allData);
    const sortedDates = sortByDate(filteredDates);

    setData(sortedDates);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);


  const groupedData = data.reduce((acc, item) => {
    const date = formatDate(item.start_at);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const sections = Object.keys(groupedData).map((date) => ({
    title: date,
    data: groupedData[date],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome {user.username}!</Text>
        <Text style={styles.upcoming}>Upcoming:</Text>
      </View>

      {isLoading && (
        <View style={[styles.loader, styles.horizontal]}>
          <ActivityIndicator size="large" color="#e46b65" />
        </View>
      )}

      {!isLoading && (
        <View style={styles.listContainer}>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.title.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 35,
    color: '#e46b65',
  },
  upcoming: {
    paddingTop: 10,
    margin: 10,
    fontSize: 18,
    fontStyle: 'italic'
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
  listContainer: {
    padding: 8
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
