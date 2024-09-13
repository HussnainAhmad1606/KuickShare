import { create } from 'zustand'

export const useUserStore = create((set) => ({
  IsLogin: false,
  Username: "",
  Email: "",
  SetIsLogin: (newState) => set({ IsLogin: newState }),
  SetUsername: (newState) => set({ Username: newState }),
  SetEmail: (newState) => set({ Email: newState }),
}))