import { create } from "zustand";

const useChatBoxStore = create((set) => ({
  chatId: "",
  setChatId: (chatId) => set({ chatId }),
}));

export default useChatBoxStore;
