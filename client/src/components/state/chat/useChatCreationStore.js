import { create } from "zustand";

const useChatCreationStore = create((set) => ({
  chatName: "",
  userNameId: "",
  searchTermChat: "",
  setChatName: (chatName) => set({ chatName }),
  setUserNameId: (userNameId) => set({ userNameId }),
  setSearchTermChat: (searchTermChat) => set({ searchTermChat }),
}));

export default useChatCreationStore;
