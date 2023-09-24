import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import useThemeStore from "../../state/useThemeStore";
import { FaXmark } from "react-icons/fa6";
import { getUserProfile } from "../../api/authAPI";
const ProfileSetting = ({ profileSettingOpen, toggleProfileSetting }) => {
  const theme = useThemeStore((state) => state.theme);
  const { data, isLoading, error, isFetching } = useQuery("userData", () =>
    getUserProfile()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  return (
    <AnimatePresence>
      {profileSettingOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: profileSettingOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={profileSettingOpen}
          onClose={toggleProfileSetting}
        >
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={{ scale: profileSettingOpen ? 1 : 0.7 }}
              exit={{ scale: 0.7 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } relative mx-auto rounded-md bg-white shadow-xl p-4 w-[100vw]  max-w-md`}
            >
              <Dialog.Title className="text-lg text-center mb-6 font-semibold">
                Profile Setting
              </Dialog.Title>

              <div className="capitalize w-full">
                <h3 className="mb-2 mx-2 font-semibold">Account</h3>
                <div
                  className={`${
                    theme === "light"
                      ? "hover:bg-neutral-100"
                      : "hover:bg-neutral-600/30 "
                  } flex items-center gap-2 mb-2 p-2 rounded-md cursor-pointer`}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/${data.userImgType}/svg?seed=${data.userImg}`}
                    alt="avatar"
                    className="h-16 w-16 rounded-full"
                  />
                  <button>Edit Image</button>
                </div>
                <hr />
                <h3 className="mt-4 m-2 font-semibold">personal information</h3>
                <div className="p-2 flex flex-col gap-3.5 w-full mb-4">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <label>First Name</label>
                      <input
                        className={`${
                          theme === "light"
                            ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                            : "bg-neutral-800 outline-neutral-800"
                        } outline outline-1 rounded block p-2  `}
                        type="text"
                        value={data.firstName}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label>Last Name</label>
                      <input
                        className={`${
                          theme === "light"
                            ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                            : "bg-neutral-800 outline-neutral-800"
                        } outline outline-1 rounded block p-2`}
                        type="text"
                        value={data.lastName}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Username </label>
                    <input
                      className={`${
                        theme === "light"
                          ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                          : "bg-neutral-800 outline-neutral-800"
                      } outline outline-1 rounded block p-2  w-full`}
                      type="text"
                      value={data.username}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input
                      className={`${
                        theme === "light"
                          ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                          : "bg-neutral-800 outline-neutral-800"
                      } outline outline-1 rounded block p-2 mb-2 w-full`}
                      type="text"
                      value={data.email}
                    />
                  </div>
                </div>
                <div className="w-[100%]">
                  <button className="block bg-blue-500 text-blue-50 rounded p-2 hover:bg-blue-600 mx-auto shadow-md capitalize w-[80vw] max-w-[80%]">
                    Update profile
                  </button>
                </div>
              </div>
              <button
                className={`${
                  theme === "light"
                    ? "bg-neutral-100 hover:bg-neutral-200"
                    : "bg-neutral-600/20 hover:bg-neutral-600/50 "
                } absolute top-3 right-4 p-2 rounded-full `}
                onClick={toggleProfileSetting}
              >
                <FaXmark className="h-5 w-5" />
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
export default ProfileSetting;
