import {
  getPinByName,
  getPinByImg,
  getPinMessageDetails,
} from "../../../../utils/getChatInfo";
import { getExactDate } from "../../../../utils/getTimeDifference";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import useThemeStore from "../../../../components/state/useThemeStore";
import RemovePinMessage from "./removePinMessage";

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
      <div className="h-96 overflow-y-scroll md:px-2">
        <ul className="flex flex-col gap-8 ">
          {chatData.chat.pinMessages.map((message) => {
            return (
              <li className="flex gap-2 justify-center items-end">
                <img
                  src={getPinByImg(chatData, message.pinBy)}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
                <div className="w-[90%]">
                  <div className="flex justify-between pl-2 mb-1 text-sm ">
                    <p>{getPinByName(chatData, message.pinBy)}</p>
                    <p className="lowercase">
                      {getExactDate(
                        getPinMessageDetails(chatData, message.pinMessage)
                          .updatedAt
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between gap-2 items-center w-full">
                    <p
                      className={`${
                        theme === "light"
                          ? "bg-neutral-200/70"
                          : "bg-neutral-600/70"
                      } break-words p-2 rounded-lg w-[90%]`}
                    >
                      {
                        getPinMessageDetails(chatData, message.pinMessage)
                          .content
                      }
                    </p>
                    <RemovePinMessage
                      chatId={chatData.chat._id}
                      theme={theme}
                      pinMessageId={message._id}
                    />
                  </div>
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
