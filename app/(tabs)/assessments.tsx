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

interface Item {
  name: string;
  // Add any other properties here
}

export default function TabTwoScreen() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const people = await response.json();
      setCharacters(people.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const renderItem = ({item}: {item: Item}) => (
    <View>
      <Text style={styles.character}>{item.name}</Text>
    </View>
  );

  console.log("characters: ", characters);
  return (
    <SafeAreaView style={styles.header}>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  title: {color: "blue"},
  character: {
    height: 70,
    backgroundColor: "yellow",
    margin: 5,
  },
});
