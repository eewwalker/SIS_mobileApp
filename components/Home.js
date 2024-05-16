import React, { useEffect, useState } from "react";
import { View, Text, SectionList, StyleSheet, SafeAreaView } from "react-native";
import { getData } from "@/app/helpers/api";
import { compareDates, groupObjectsByStartDate } from "@/app/helpers/utils";
import { useUser } from '@/components/UserContext';


export function Home() {
  const [data, setData] = useState([]);

  const { user } = useUser();

  async function fetchData() {
    const assessments = await getData('assessmentsessions');
    const exercises = await getData('exercisesessions');
    const lectures = await getData('lecturesessions');
    const allData = [...assessments, ...exercises, ...lectures];

    const filteredDates = compareDates(allData);
    const sortedDates = groupObjectsByStartDate(filteredDates);

    // console.log('data-1:', data);

    const formattedData = sortedDates.map(section => ({
      title: new Date(section.date).toDateString(), // Convert date to a readable format
      data: section.elements
    }));

    setData(formattedData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const data2 = [
  //   { date: "2024-05-18T18:00:23.218370-07:00", elements: [{ title: "Event 1" }] },
  //   { date: "2024-06-10T18:00:18.337307-07:00", elements: [{ title: "Event 2" }] },
  //   { date: "2024-06-10T18:00:33.780518-07:00", elements: [{ title: "Event 3" }] },
  // ];



  console.log('data:', data);
  return (
    <SafeAreaView>
      <Text>Home</Text>
      {data.length > 0 &&
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item }) => (
            // <View>
            //   <Text>{item.title}</Text>
            // </View>
            <View>
              {item.data.map((element, index) => (
                <Text key={index}>{element.title}</Text>
              ))}
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        // renderSectionHeader={({ section: { date } }) => (
        //   <Text style={styles.header}>{date}</Text>
        // )}
        />}

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
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
