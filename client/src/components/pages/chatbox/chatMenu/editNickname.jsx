import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import GetUserNickname from "./getUserNickname";

const EditNickname = ({
  theme,
  chatData,
  editNicknameModal,
  toggleEditNickname,
}) => {
  return (
    <AnimatePresence>
      {editNicknameModal && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: editNicknameModal ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={editNicknameModal}
          onClose={toggleEditNickname}
        >
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={
                editNicknameModal
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.7, opacity: 0 }
              }
              exit={{ scale: 0.7, opacity: 0 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } mx-auto max-w-lg rounded-md shadow-lg p-4`}
            >
              <Dialog.Title className="text-lg text-center pb-4 font-semibold">
                Nickname
              </Dialog.Title>
              <div className="flex flex-col gap-2">
                {chatData.chat.members.map((user) => (
                  <GetUserNickname
                    key={user._id}
                    user={user}
                    chatId={chatData.chat._id}
                  />
                ))}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default EditNickname;
