import { create } from "zustand";

const useChatCreationStore = create((set) => ({
  isAddChatOpen: false,
  isCreateGroupChatOpen: false,
  isCreatePrivateChatOpen: false,
  chatName: "",
  userNameId: "",
}));

export default useChatCreationStore;

export const useChatCreationActions = useChatCreationStore((state) => ({
  toggleAddChatModal: () =>
    state.set((prevState) => ({ isAddChatOpen: !prevState.isAddChatOpen })),
  toggleCreateGroupChat: () =>
    state.set((prevState) => ({
      isCreateGroupChatOpen: !prevState.isCreateGroupChatOpen,
    })),
  toggleCreatePrivateChat: () =>
    state.set((prevState) => ({
      isCreatePrivateChatOpen: !prevState.isCreatePrivateChatOpen,
    })),
}));

export const useChatCreationSetter = useChatCreationStore((state) => ({
  setChatName: (chatName) => state.set({ chatName }),
  setUserNameId: (userNameId) => state.set({ userNameId }),
}));
