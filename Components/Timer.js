// MyCustomComponent.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import TimerElement from "./TimerElem";
import useTimerStore from "../Store/TimerStore";

const Timer = () => {
  const { data } = useTimerStore();
  //   const setValues = [setPreparation, setWork, setRest, setCycle, setInterval];
  const { preparation, work, rest, cycle, interval } = data;

  const [showText, setShowText] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Start Timer");

  const [currentPhase, setCurrentPhase] = useState("Preparation");
  const [timeLeft, setTimeLeft] = useState(preparation);
  const [currentCycle, setCurrentCycle] = useState(cycle);
  const [isCompleted, setIsCompleted] = useState(true);

  // Config
  // Set showZero to 0 to show 0:00 seconds when the timer reaches 0
  // Set showZero to 1 to directly switch to the next phase when the timer reaches 0
  const showZero = 0;

  const phases = [
    { name: "Work", duration: work },
    { name: "Rest", duration: rest },
    { name: "Interval", duration: interval },
  ];

  const handleStart = () => {
    setShowText(true);
    setIsPaused(false);
    setButtonTitle("Pause Timer");
    setCurrentPhase("Preparation");
    setTimeLeft(preparation);
    setCurrentCycle(cycle);
    setIsCompleted(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    setButtonTitle(isPaused ? "Pause Timer" : "Resume Timer");
  };

  const handleStop = () => {
    setShowText(false);
    setIsPaused(false);
    setButtonTitle("Start Timer");
    setCurrentPhase("Preparation");
    setTimeLeft(preparation);
    setCurrentCycle(cycle);
  };

  //   const handleClick = () => {
  //     setShowText(!showText);
  //     setButtonTitle(showText ? "Start Timer" : "Stop Timer");
  //     if (showText) {
  //       setCurrentPhase("Preparation");
  //       setTimeLeft(preparation);
  //     }
  //   };

  useEffect(() => {
    if (currentCycle === 0) {
      setIsCompleted(true);
      handleStop();
      alert("Session Completed");
    }
  }, [currentCycle]);

  useEffect(() => {
    console.log(currentCycle);
    if (isCompleted) {
      return;
    }
    let timer;
    if (showText && !isPaused && timeLeft >= showZero) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === showZero - 1) {
      if (currentPhase === "Interval") {
        setCurrentCycle((prevCycle) => prevCycle - 1);
      }
      const currentIndex = phases.findIndex(
        (phase) => phase.name === currentPhase
      );
      if (currentCycle == 1 && currentIndex === phases.length - 2) {
        setCurrentCycle(0);
        return;
      }
      const nextIndex = (currentIndex + 1) % phases.length;
      setCurrentPhase(phases[nextIndex].name);
      setTimeLeft(phases[nextIndex].duration);
    }
    return () => clearInterval(timer);
  }, [showText, timeLeft, currentPhase, isPaused]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <TimerElement />
      <Text style={styles.text}>Current Cycle: {currentCycle}</Text>
      <Button
        title={buttonTitle}
        onPress={showText ? handlePause : handleStart}
      />
      {showText && (
        <View style={styles.block}>
          <Button title="Stop Timer" onPress={handleStop} />
          <Text style={styles.text}>Current Phase: {currentPhase}</Text>
          <Text style={styles.text}>Time Left: {formatTime(timeLeft)}</Text>
        </View>
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
