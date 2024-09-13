import { create } from 'zustand'

export const useUserStore = create((set) => ({
  IsLogin: false,
  Username: "Psycho",
  Email: "",
  SetIsLogin: (newState) => set({ isLogin: newState }),
  SetUsername: (newState) => set({ username: newState }),
  SetEmail: (newState) => set({ email: newState }),
}))