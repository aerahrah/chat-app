import { BiSolidEditAlt, BiCheck } from "react-icons/bi";
import { getSpecificImg } from "../../sidebar/getAllChats/getChatInfo";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editChatMemberNickname } from "../../../api/chatAPI";

const GetUserNickname = ({ chatId, user }) => {
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
      className="relative flex items-center gap-2 hover:bg-neutral-600 p-3 rounded-md "
      onClick={toggleOpenInputBox}
    >
      <img
        src={getSpecificImg(user)}
        alt="avatar"
        className="h-10 w-10 rounded-full"
      />
      {openInputBox ? (
        <div className="flex gap-2  hover:bg-neutral-600 items-center justify-center w-[100vw] max-w-[100%] z-30">
          <input
            type="text"
            placeholder={nickname ? user.displayName : user.name}
            value={nickname}
            className=" p-2.5 w-full z-50 rounded outline-0"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setNickname(e.target.value)}
          />

          <i>
            <BiCheck
              className="h-7 w-7 "
              onClick={(e) => {
                e.stopPropagation();
                handleChangeMemberNickname(user._id);
              }}
            />
          </i>
        </div>
      ) : (
        <div className="flex w-[100vw] max-w-[30rem] justify-between items-center">
          <div className="flex flex-col gap-1  hover:bg-neutral-600 justify-center ">
            <p>{user.displayName ? user.displayName : user.name}</p>
            <p className="text-xs">
              {user.displayName ? user.name : "Set Nickname"}
            </p>
          </div>
          <i>
            <BiSolidEditAlt className="h-6 w-6" />
          </i>
        </div>
      )}
    </div>
  );
};

export default GetUserNickname;
