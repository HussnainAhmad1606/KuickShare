import { create } from 'zustand'

export const useUserStore = create((set) => ({
  IsLogin: false,
  Username: "Psycho",
  Email: "",
  Avatar: "",
  questions: [],
  cover: "",
  video: "",
  setCover: (newState) => set({ cover: newState }),
  setVideo: (newState) => set({ video: newState }),
  setQuestions: (newState) => set({ questions: newState }),
  SetIsLogin: (newState) => set({ isLogin: newState }),
  SetUsername: (newState) => set({ username: newState }),
  SetEmail: (newState) => set({ email: newState }),
  SetAvatar: (newState) => set({ avatar: newState })

}))