// MyCustomComponent.js
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import TimerElement from "./TimerElem";
import useTimerStore from "../Store/TimerStore";

const Timer = () => {
  const { data } = useTimerStore();
  //   const setValues = [setPreparation, setWork, setRest, setCycle, setInterval];
  const { preparation, work, rest, cycle, set, totalTime } = data;

  // States for timer control
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // States for displaying timer
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [intervalId, setIntervalId] = useState(null);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    // Start timer logic here
  };

  const handlePause = () => {
    setIsPaused(true);
    // Pause timer logic here
  };

  const handleResume = () => {
    setIsPaused(false);
    // Resume timer logic here
  };

  const handleStop = () => {
    handlePause();
    Alert.alert(
      "Stop Timer",
      "Are you sure you want to stop the timer?",
      [
        {
          text: "No",
          onPress: () => handleResume(),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setIsRunning(false);
            setIsPaused(false);
            setTimeLeft(totalTime);
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime]);

  // useEffect(() => {
  //   if (isRunning && isPaused) {
  //     setIsRunning(false);
  //     }
  // }, [isPaused]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            setIsRunning(false);
            return totalTime;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      setIntervalId(id);
    } else if (isRunning && isPaused) {
      console.log("Paused");
      return clearInterval(intervalId);
    } else {
      return clearInterval(intervalId);
    }

    // return () => clearInterval(intervalId);
  }, [isRunning, isPaused]);

  const phases = [
    { title: "Preparation", duration: preparation },
    { title: "Work", duration: work },
    { title: "Rest", duration: rest },
  ];

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <TimerElement />
      {!isRunning && <Button title="Start" onPress={handleStart} />}
      {isRunning && !isPaused && (
        <>
          <Text style={styles.text}>{formatTime(timeLeft)}</Text>
          <Button title="Pause" onPress={handlePause} />
          <Button title="Stop" onPress={handleStop} />
        </>
      )}
      {isRunning && isPaused && (
        <>
          <Text style={styles.text}>{formatTime(timeLeft)}</Text>
          <Button title="Resume" onPress={handleResume} />
          <Button title="Stop" onPress={handleStop} />
        </>
      )}
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
