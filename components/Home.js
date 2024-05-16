import React, { useEffect, useState } from "react";
import { View, Text, SectionList, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { getData } from "@/app/helpers/api";
import { compareDates, sortByDate, formatDate } from "@/app/helpers/utils";
import { useUser } from '@/components/UserContext';


export function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  const getCohort = () => {
    let urlString = item.cohort;
    let parts = urlString.split('/');
    let cohort = parts[parts.length - 2];
    return cohort;
  };

  async function fetchData() {
    const assessments = await getData('assessmentsessions');
    const exercises = await getData('exercisesessions');
    const lectures = await getData('lecturesessions');
    const allData = [...assessments, ...exercises, ...lectures];

    const filteredDates = compareDates(allData);
    const sortedDates = sortByDate(filteredDates)

    setData(sortedDates);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log('data:', data);
  console.log('data[0]', data[0])

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
    <SafeAreaView>
      {isLoading && (
      <View style={[styles.loader, styles.horizontal]}>
        <ActivityIndicator size="large" color="#e46b65" />
      </View>
    )}
      {!isLoading && (
      <View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.title.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
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
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 10,
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
