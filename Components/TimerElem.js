import React, { useEffect, useState } from "react";
import { View, Text, Button, Modal, TextInput, StyleSheet } from "react-native";
import useTimerStore from "../Store/TimerStore";

const TimerElement = () => {
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
  const values = [preparation, work, rest, set, cycle];
  // const values = Object.values(data);
  const setValues = [setPreparation, setWork, setRest, setSet, setCycle];
  console.log(values);

  const [modalVisible, setModalVisible] = useState(false);

  const [inputValues, setInputValues] = useState(
    Array(set)
      .fill()
      .map((_, i) => `workout ${i + 1}`)
  );
  const [caloriesBurned, setCaloriesBurned] = useState(Array(set).fill(5));
  console.log(caloriesBurned);

  const zipArrays = (arr1, arr2) => {
    return arr1.map((value, index) => [value, arr2[index]]);
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
  const timerElementTitles = ["Preparation", "Work", "Rest", "Set", "Cycle"];

  useEffect(() => {
    setTotalTime(
      data.preparation + (data.work + data.rest) * data.set * data.cycle
    );
  }, [data.preparation, data.work, data.rest, data.set, data.cycle]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderColor: "#000",
        borderRadius: 10,
        borderWidth: 1,
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={styles.text}>
          Total Time : {formatTime(data.totalTime)}
        </Text>
        {timerElementTitles.map((title, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Button
              title="-"
              onPress={() => setValues[index](values[index] - 1)}
            />
            <Text style={styles.text}>
              {title +
                " : " +
                (index < 3 ? formatTime(values[index]) : values[index])}
            </Text>
            {index == 3 && (
              <Button
                style={styles.text}
                title="names"
                onPress={() => setModalVisible(true)}
              />
            )}
            <Button
              title="+"
              onPress={() => setValues[index](values[index] + 1)}
            />
          </View>
        ))}
        {/* <Button title="-" onPress={() => setValue(value - 1)} />
        <Text style={styles.counterText}>{value}</Text>
        <Button title="+" onPress={() => setValue(value + 1)} /> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Values</Text>
          {zipArrays(inputValues, caloriesBurned).map(
            ([value, calories], index) => (
              console.log(value, calories),
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
                </View>
              )
            )
          )}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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

export default TimerElement;
