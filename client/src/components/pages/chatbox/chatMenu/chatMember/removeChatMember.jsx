import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import useThemeStore from "../../../../state/useThemeStore";
const RemoveChatMember = ({
  openConfirmationDialog,
  toggleOpenComfirmationDialog,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const handleRemoveChatMember = () => {};

  return (
    <AnimatePresence>
      {openConfirmationDialog && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: openConfirmationDialog ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={openConfirmationDialog}
          onClose={toggleOpenComfirmationDialog}
        >
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={
                openConfirmationDialog
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.7, opacity: 0 }
              }
              exit={{ scale: 0.7, opacity: 0 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } w-full mx-auto max-w-lg rounded-md shadow-lg p-4`}
            >
              <Dialog.Title className="text-lg text-center pb-4 font-semibold capitalize">
                remove from chat?
              </Dialog.Title>
              <p className="text-sm mb-6 text-center">
                Are you sure you want to remove this person from the
                conversation? They will no longer be able to send or receive new
                messages.
              </p>
              <div className="flex justify-between dark:bg-neutral-800">
                <button
                  className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md capitalize"
                  onClick={toggleOpenComfirmationDialog}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600 shadow-md  capitalize"
                  onClick={handleRemoveChatMember}
                >
                  remove from chat
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default RemoveChatMember;
