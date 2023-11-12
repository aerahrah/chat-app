import { create } from "zustand";

const useChatCreationStore = create((set) => ({
  chatName: "",
  colorTheme: "",
  userNameId: "",
  searchTermChat: "",
  openChatMenu: false,
  setChatName: (chatName) => set({ chatName }),
  setColorTheme: (colorTheme) => set({ colorTheme }),
  setUserNameId: (userNameId) => set({ userNameId }),
  setSearchTermChat: (searchTermChat) => set({ searchTermChat }),
  toggleOpenChatMenu: () =>
    set((state) => ({ openChatMenu: !state.openChatMenu })),
}));

export default useChatCreationStore;
