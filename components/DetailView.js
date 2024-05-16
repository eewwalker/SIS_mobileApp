import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { formatDate } from "../app/helpers/utils";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState} from "react";
import { useUser } from '@/components/UserContext';

export function DetailView({ item, goBack }) {
  const [itemType, setItemType] = useState(typeOfItem(item));

  function typeOfItem(item) {
    let type;
    if('assessment' in item) {
      type = 'assessment';
    } else if ('exercise' in item) {
      type = 'exercise';
    } else if ('lecture' in item) {
      type = 'lecture';
    }
    return type;
  }


  const getCohort = () => {
    let urlString = item.cohort;
    let parts = urlString.split('/');
    let cohort = parts[parts.length - 2];
    return cohort;
  };

  const handleBackClick = () => {
    goBack();
  };

  function isLectureOrExercise() {
    const startDate = itemType === 'exercise' ?
    item.exerciselabsession_set[0].start_at : item.start_at;

   return (
    <View>
    <TouchableOpacity onPress={handleBackClick}>
      <Icon name="chevron-left" size={25} style={[styles.backArrow]} />
    </TouchableOpacity>
    <Text style={[styles.mainTitle]}>{item.title}</Text>
    <Text style={[styles.description, styles.p]}>{item.description}</Text>
    <Text marginBottom={10} marginTop={10}>{formatDate(startDate)}</Text>
    <View style={styles.icons}>
    <Icon name="file-pdf-o" size={25} style={[styles.backArrow]} />
    <Text>Handout</Text>
    </View>
    </View>
   )
  }

  return (
    <View style={[styles.container, styles.p]}>
       {itemType === 'assessment' ?
       <View>
      <TouchableOpacity onPress={handleBackClick}>
        <Icon name="chevron-left" size={25} style={[styles.backArrow]} />
      </TouchableOpacity>
      <Text style={[styles.mainTitle]}>{item.title}</Text>
      <Text style={[styles.description, styles.p]}>{item.description}</Text>
      <Text style={[styles.secTitle]}>General dates for this assessment for Rithm {getCohort()}</Text>
      <Text>{formatDate(item.start_at)} - {formatDate(item.end_at)}</Text>
      <Text style={[styles.secTitle, styles.p]}>Your specific dates for this assessment:</Text>
      <Text>You can begin at: {formatDate(item.start_at)}</Text>
      <Text>You must submit before:  {formatDate(item.end_at)}</Text>
      <Text style={[styles.thirdTitle]}>To discuss the possibility of an extension, please contact your
        adviser before {formatDate(item.end_at)}.</Text>
      <View style={styles.icons}>
        <Icon name="file-pdf-o" size={25} style={[styles.backArrow]} />
          <Text>Handout</Text>
      </View>
      </View> : isLectureOrExercise()}
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    marginTop: 5,
    marginBottom: 10,
    marginRight: 5,
    color: "#e46b65",
  },
  p: {
    marginTop: 8,
    marginBottom: 10,
    lineHeight: 22,
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eeeeee",
    fontFamily: 'SourceSerifPro_300Light'
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 10,
  },
  description: {
    fontSize: 15
  },
  secTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  thirdTitle: {
    fontStyle: 'italic',
    marginTop: 10
  },
  button: {
    backgroundColor: "#e46b65",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderWidth: 0,
    padding: 8
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10

  }

});