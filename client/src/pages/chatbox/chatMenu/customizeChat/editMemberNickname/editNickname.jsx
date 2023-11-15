import useThemeStore from "../../../../../components/state/useThemeStore";
import DialogComponent from "../../../../../components/globalComponents/dialogComponent";
import GetUserNickname from "./getUserNickname";

const EditNickname = ({ chatData, editNicknameModal, toggleEditNickname }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <DialogComponent
      openModal={editNicknameModal}
      closeModal={toggleEditNickname}
      title="Change nickname"
    >
      <div className="flex overflow-y-auto max-h-96 flex-col gap-2">
        {chatData.chat.members.map((user) => (
          <GetUserNickname
            key={user._id}
            user={user}
            theme={theme}
            chatId={chatData.chat._id}
          />
        ))}
      </div>
    </DialogComponent>
  );
};

export default EditNickname;
