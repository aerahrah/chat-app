import DialogComponent from "../../../../../utils/dialogComponent";
import GetUserNickname from "./getUserNickname";
import useThemeStore from "../../../../../state/useThemeStore";

const EditNickname = ({ chatData, editNicknameModal, toggleEditNickname }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <DialogComponent
      openModal={editNicknameModal}
      closeModal={toggleEditNickname}
      title="Change nickname"
    >
      <div className="flex flex-col gap-2">
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
