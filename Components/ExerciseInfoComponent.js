import React, { useEffect, useState } from "react";
import { View, Text, Button, Modal, TextInput, StyleSheet } from "react-native";
import useTimerStore from "../Store/TimerStore";

const ExerciseInfoComponent = ({ setModalVisible }) => {
  const {
    data,
    setPreparation,
    setWork,
    setRest,
    setSet,
    setCycle,
    setTotalTime,
  } = useTimerStore();

  const { preparation, work, rest, set, cycle, totalTime } = data;
  //   const [modalVisible, setModalVisible] = useState(false);

  const [inputValues, setInputValues] = useState(
    Array(set)
      .fill()
      .map((_, i) => `workout ${i + 1}`)
  );
  const [caloriesBurned, setCaloriesBurned] = useState(Array(set).fill(5));
  const [muscleGroup, setMuscleGroup] = useState(Array(set).fill("Legs"));
  console.log(caloriesBurned, muscleGroup);

  const zipArrays = (...arrays) => {
    if (arrays.length === 0) return [];
    const minLength = Math.min(...arrays.map((arr) => arr.length));
    return Array.from({ length: minLength }, (_, index) =>
      arrays.map((arr) => arr[index])
    );
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };
  const handleCaloriesChange = (index, text) => {
    const newCaloriesBurned = [...caloriesBurned];
    newCaloriesBurned[index] = text;
    setCaloriesBurned(newCaloriesBurned);
  };
  const handleMuscleGroupChange = (index, text) => {
    const newMuscleGroup = [...muscleGroup];
    newMuscleGroup[index] = text;
    setMuscleGroup(newMuscleGroup);
  };
  return (
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Enter Values</Text>
      {zipArrays(inputValues, caloriesBurned, muscleGroup).map(
        ([value, calories, muscleGroup], index) => (
          console.log(value, calories, muscleGroup),
          (
            <View
              key={`view-${index}`} // Add a unique key for the View
              flexDirection="row"
              justifyContent="space-between"
              style={{ paddingHorizontal: 10, margin: 5, width: "60%" }}
            >
              <TextInput
                key={`input-${index}`}
                style={styles.input}
                onChangeText={(text) => handleInputChange(index, text)}
                value={value}
                placeholder={`Input ${index + 1}`}
              />
              <TextInput
                key={`calories-${index}`}
                style={styles.input}
                onChangeText={(text) => handleCaloriesChange(index, text)}
                value={calories.toString()}
                placeholder={"calories"}
              />
              <TextInput
                key={`muscle-${index}`}
                style={styles.input}
                onChangeText={(text) => handleMuscleGroupChange(index, text)}
                value={muscleGroup}
                placeholder={"muscle"}
              />
            </View>
          )
        )
      )}
      <Button title="Close" onPress={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: "80%",
    paddingHorizontal: 10,
  },
});

export default ExerciseInfoComponent;
