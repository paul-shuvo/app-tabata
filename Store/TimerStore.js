import { create } from "zustand";

// TODO Timer can't be more than 59'59"

const timerStore = create((set) => ({
  data: {
    preparation: 0,
    work: 0,
    rest: 0,
    set: 1,
    workouts: [{ "workout 1": 10 }],
    cycle: 1,
    totalTime: 0,
  },
  setPreparation: (value) =>
    set((state) => ({
      data: { ...state.data, preparation: value > 0 ? value : 0 },
    })),
  setWork: (value) =>
    set((state) => ({ data: { ...state.data, work: value > 0 ? value : 0 } })),
  setRest: (value) =>
    set((state) => ({ data: { ...state.data, rest: value > 0 ? value : 0 } })),
  setSet: (value) =>
    set((state) => ({ data: { ...state.data, set: value > 1 ? value : 1 } })),
  setCycle: (value) =>
    set((state) => ({ data: { ...state.data, cycle: value > 1 ? value : 1 } })),
  setTotalTime: (value) =>
    set((state) => ({
      data: { ...state.data, totalTime: value > 0 ? value : 0 },
    })),
  reset: () =>
    set({
      data: {
        preparation: 0,
        work: 0,
        rest: 0,
        set: 1,
        workouts: [{ "workout 1": 10 }],
        cycle: 1,
        totalTime: 0,
      },
    }),
}));

export default timerStore;
