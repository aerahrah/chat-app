import DialogComponent from "../../../../utils/dialogComponent";
import { useState } from "react";

const DisplayAllPinMessages = ({
  chatData,
  toggleDisplayPinMessage,
  displayPinMessageModal,
}) => {
  return (
    <DialogComponent
      openModal={displayPinMessageModal}
      closeModal={toggleDisplayPinMessage}
      title="Pinned message"
    >
      <div className="h-80"> test</div>
    </DialogComponent>
  );
};

export default DisplayAllPinMessages;
