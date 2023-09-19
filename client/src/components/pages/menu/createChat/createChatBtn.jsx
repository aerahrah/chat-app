import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import CreateGroupChat from "./createGroupChat";
import CreatePrivateChat from "./createPrivateChat";
const CreateChat = () => {
  const {
    isAddChatOpen,
    isCreateGroupChatOpen,
    isCreatePrivateChatOpen,
    toggleChatOpen,
    toggleCreateGroupChatOpen,
    toggleCreatePrivateChatOpen,
  } = useChatCreationStore();

  return (
    <div>
      <div>
        <button onClick={toggleChatOpen}>open modal</button>
        {isAddChatOpen && (
          <div>
            <button onClick={toggleCreateGroupChatOpen}>
              Create group chat
            </button>
            <button onClick={toggleCreatePrivateChatOpen}>
              Create private chat
            </button>
          </div>
        )}
      </div>
      {isCreateGroupChatOpen && <CreateGroupChat />}
      {isCreatePrivateChatOpen && <CreatePrivateChat />}
    </div>
  );
};
export default CreateChat;
