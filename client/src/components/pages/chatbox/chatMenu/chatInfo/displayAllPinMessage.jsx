import DialogComponent from "../../../../utils/dialogComponent";
import { useState } from "react";
import useThemeStore from "../../../../state/useThemeStore";
import { getExactDate } from "../../../../utils/getTimeDifference";
import {
  getPinByName,
  getPinByImg,
} from "../../../sidebar/getAllChats/getChatInfo";
const DisplayAllPinMessages = ({
  chatData,
  toggleDisplayPinMessage,
  displayPinMessageModal,
}) => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <DialogComponent
      openModal={displayPinMessageModal}
      closeModal={toggleDisplayPinMessage}
      title="Pinned message"
    >
      <div className="h-96 overflow-y-scroll">
        <ul className="flex flex-col gap-4 ">
          {chatData.chat.pinMessages.map((message) => {
            return (
              <li className="flex gap-2 justify-center items-end">
                <img
                  src={getPinByImg(chatData, message.pinBy)}
                  alt="avatar"
                  className="h-9 w-9 rounded-full"
                />
                <div className="w-[85%]">
                  <div className="flex justify-between pl-2 mb-1 text-sm ">
                    <p>{getPinByName(chatData, message.pinBy)}</p>
                    <p className="lowercase">
                      {getExactDate(message.updatedAt)}
                    </p>
                  </div>
                  <p className="break-words bg-black p-2 rounded-lg">
                    {message.pinMessage}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </DialogComponent>
  );
};

export default DisplayAllPinMessages;
