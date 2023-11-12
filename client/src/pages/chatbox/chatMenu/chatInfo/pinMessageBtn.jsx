import { useState } from "react";
import { BiSolidPin } from "react-icons/bi";
import DisplayAllPinMessages from "./displayAllPinMessage";

const GetAllPinMessageBtn = ({ chatData, isChatInfoOpen }) => {
  const [displayPinMessageModal, setDisplayPinMessageModal] = useState(false);
  const toggleDisplayPinMessage = () => {
    return setDisplayPinMessageModal(!displayPinMessageModal);
  };

  return (
    <div>
      {isChatInfoOpen && (
        <button
          className="w-full flex items-center gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer "
          onClick={toggleDisplayPinMessage}
        >
          <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
            <BiSolidPin className="h-5 w-5" />
          </i>
          <p>View pinned messages</p>
        </button>
      )}
      <DisplayAllPinMessages
        chatData={chatData}
        displayPinMessageModal={displayPinMessageModal}
        toggleDisplayPinMessage={toggleDisplayPinMessage}
      />
    </div>
  );
};
export default GetAllPinMessageBtn;
