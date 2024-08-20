// MyCustomComponent.js
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import TimerElement from "./TimerElem";
import useTimerStore from "../Store/TimerStore";

const Timer = () => {
  const { data } = useTimerStore();
  //   const setValues = [setPreparation, setWork, setRest, setCycle, setInterval];
  const { preparation, work, rest, cycle, set, interval } = data;
  const [time, setTime] = useState(preparation);

const phases = [
  { title: "Preparation", duration: preparation },
  { title: "Work", duration: work },
  { title: "Rest", duration: rest },
];

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};


  return (
    <View style={styles.container}>
      <TimerElement />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  block: {
    marginTop: 20,
    alignItems: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default Timer;
