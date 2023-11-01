import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import useThemeStore from "../state/useThemeStore";

const DialogComponent = ({ openModal, closeModal, title, children }) => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <AnimatePresence>
      {openModal && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: openModal ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={openModal}
          onClose={closeModal}
        >
          <div className="fixed inset-0 !bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={
                openModal
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.7, opacity: 0 }
              }
              exit={{ scale: 0.7, opacity: 0 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } w-full relative mx-auto max-w-lg rounded-md shadow-lg p-4`}
            >
              <Dialog.Title className="text-lg text-center pb-4 font-semibold capitalize">
                {title}
              </Dialog.Title>
              <div className="overflow-hidden ">{children}</div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default DialogComponent;
