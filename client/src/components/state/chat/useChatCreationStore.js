import { create } from "zustand";

const useChatCreationStore = create((set) => ({
  chatName: "",
  userNameId: "",
  searchTermChat: "",
  openChatMenu: false,
  setChatName: (chatName) => set({ chatName }),
  setUserNameId: (userNameId) => set({ userNameId }),
  setSearchTermChat: (searchTermChat) => set({ searchTermChat }),
  toggleOpenChatMenu: () =>
    set((state) => ({ openChatMenu: !state.openChatMenu })),
}));

export default useChatCreationStore;
