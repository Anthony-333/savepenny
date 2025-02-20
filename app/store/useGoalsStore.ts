import { create } from "zustand";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

interface Goal {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount?: number;
  createdAt: string;
}

interface GoalsStore {
  goals: Goal[];
  currentGoal: Partial<Goal>;
  setCurrentGoal: (goal: Partial<Goal>) => void;
  addGoal: (goal: Omit<Goal, "id" | "createdAt">) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  loadGoals: () => void;
}

const useGoalsStore = create<GoalsStore>((set) => ({
  goals: [],
  currentGoal: {},
  setCurrentGoal: (goal) => set({ currentGoal: goal }),
  addGoal: (goal) => {
    const newGoal = {
      ...goal,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      currentAmount: 0,
    };
    set((state) => {
      const updatedGoals = [...state.goals, newGoal];
      storage.set("goals", JSON.stringify(updatedGoals));
      return { goals: updatedGoals };
    });
  },
  updateGoal: (id, updatedGoal) =>
    set((state) => {
      const updatedGoals = state.goals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedGoal } : goal
      );
      storage.set("goals", JSON.stringify(updatedGoals));
      return { goals: updatedGoals };
    }),
  deleteGoal: (id) =>
    set((state) => {
      const updatedGoals = state.goals.filter((goal) => goal.id !== id);
      storage.set("goals", JSON.stringify(updatedGoals));
      return { goals: updatedGoals };
    }),
  loadGoals: () => {
    const savedGoals = storage.getString("goals");
    if (savedGoals) {
      set({ goals: JSON.parse(savedGoals) });
    }
  },
}));

export default useGoalsStore; 