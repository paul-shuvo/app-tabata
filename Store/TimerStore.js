import { create } from "zustand";

const timerStore = create((set) => ({
  data: {
    preparation: 0,
    work: 0,
    rest: 0,
    cycle: 1,
    interval: 0,
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
  setCycle: (value) =>
    set((state) => ({ data: { ...state.data, cycle: value > 1 ? value : 1 } })),
  setInterval: (value) =>
    set((state) => ({
      data: { ...state.data, interval: value > 0 ? value : 0 },
    })),
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
        cycle: 1,
        interval: 0,
        totalTime: 0,
      },
    }),
}));

export default timerStore;
