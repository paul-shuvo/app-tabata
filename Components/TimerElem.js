import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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

  const values = Object.values(data);
  const setValues = [setPreparation, setWork, setRest, setSet, setCycle];
  console.log(values);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    marginBottom: 10, // Add margin between elements
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  counterText: {
    fontSize: 18,
    color: "#333",
    marginHorizontal: 10,
  },
});

export default TimerElement;
