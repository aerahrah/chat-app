import { BiSolidEditAlt, BiCheck } from "react-icons/bi";
import { getSpecificImg } from "../../sidebar/getAllChats/getChatInfo";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editChatMemberNickname } from "../../../api/chatAPI";

const GetUserNickname = ({ chatId, theme, user }) => {
  const editMemberNicknameMutation = useMutation(editChatMemberNickname);
  const [nickname, setNickname] = useState(user.displayName);
  const [openInputBox, setOpenInputBox] = useState(false);
  const queryClient = useQueryClient();

  const handleChangeMemberNickname = async (memberId) => {
    try {
      await editMemberNicknameMutation.mutateAsync({
        chatId,
        memberId,
        nickname,
      });
      queryClient.invalidateQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
    } catch (error) {
      console.log(error);
    }
  };
  const toggleOpenInputBox = () => {
    return setOpenInputBox(!openInputBox);
  };

  return (
    <div
      key={user._id}
      className={`${
        theme === "light"
          ? "bg-white hover:bg-neutral-200 text-neutral-700"
          : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300"
      } relative flex items-center gap-2 p-3 rounded-md`}
      onClick={toggleOpenInputBox}
    >
      <img
        src={getSpecificImg(user)}
        alt="avatar"
        className="h-10 w-10 rounded-full"
      />
      {openInputBox ? (
        <div className="flex gap-2 items-center justify-center w-[100vw] max-w-[100%] z-30">
          <input
            type="text"
            placeholder={nickname ? user.displayName : user.name}
            value={nickname}
            className={`${
              theme === "light"
                ? "bg-white text-neutral-700"
                : "bg-neutral-700 text-neutral-300  outline-neutral-300/70"
            } p-2.5 w-full z-50 rounded focus:outline `}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setNickname(e.target.value)}
          />

          <i
            className={`${
              theme === "light"
                ? "bg-neutral-100 hover:bg-neutral-200"
                : "bg-neutral-600/20 hover:bg-neutral-800/50 "
            } rounded-full p-1`}
            onClick={(e) => {
              e.stopPropagation();
              handleChangeMemberNickname(user._id);
              toggleOpenInputBox();
            }}
          >
            <BiCheck className="h-7 w-7 " />
          </i>
        </div>
      ) : (
        <div className="flex w-[100vw] max-w-[30rem] justify-between items-center">
          <div className="flex flex-col gap-1 justify-center ">
            <p>{user.displayName ? user.displayName : user.name}</p>
            <p className="text-xs">
              {user.displayName ? user.name : "Set Nickname"}
            </p>
          </div>
          <i
            className={`${
              theme === "light"
                ? "bg-neutral-100 hover:bg-neutral-200"
                : "bg-neutral-600/20 hover:bg-neutral-800/50 "
            } rounded-full p-1`}
            onClick={(e) => {
              e.stopPropagation();
              toggleOpenInputBox();
            }}
          >
            <BiSolidEditAlt className="h-7 w-7" />
          </i>
        </div>
      )}
    </div>
  );
};

export default GetUserNickname;
