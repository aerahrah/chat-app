import { create } from "zustand";

const useChatCreationStore = create((set) => ({
  isAddChatOpen: false,
  isCreateGroupChatOpen: false,
  isCreatePrivateChatOpen: false,
  chatName: "",
  userNameId: "",
  toggleChatOpen: () =>
    set((state) => ({ isAddChatOpen: !state.isAddChatOpen })),
  toggleCreateGroupChatOpen: () =>
    set((state) => ({ isCreateGroupChatOpen: !state.isCreateGroupChatOpen })),
  toggleCreatePrivateChatOpen: () =>
    set((state) => ({
      isCreatePrivateChatOpen: !state.isCreatePrivateChatOpen,
    })),
  setChatName: (chatName) => set({ chatName }),
  setUserNameId: (userNameId) => set({ userNameId }),
}));

export default useChatCreationStore;
