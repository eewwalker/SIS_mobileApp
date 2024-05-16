import React, { useEffect, useState } from "react";
import { View, Text, SectionList, StyleSheet, SafeAreaView } from "react-native";
import { getData } from "@/app/helpers/api";
import { compareDates, groupObjectsByStartDate } from "@/app/helpers/utils";
import { useUser } from '@/components/UserContext';


export function Home() {
  const [data, setData] = useState({});

const { user } = useUser();

  async function fetchData() {
    const assessments = await getData('assessmentsessions');
    const exercises = await getData('exercisesessions');
    const lectures = await getData('lecturesessions');
    const allData = [...assessments, ...exercises, ...lectures];

    const filteredDates = compareDates(allData);
    const sortedDates = groupObjectsByStartDate(filteredDates);

    setData(sortedDates);
    console.log('data', data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <SectionList
      sections={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
  )
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
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
