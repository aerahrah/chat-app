import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import useThemeStore from "../../../../state/useThemeStore";
import { FaXmark } from "react-icons/fa6";
import { getUserProfile } from "../../../../api/authAPI";
import { useState } from "react";
import UpdateUserInfo from "./updateUserInfo";
import EditImage from "./updateUserImg";

const ProfileSetting = ({ profileSettingOpen, toggleProfileSetting }) => {
  const theme = useThemeStore((state) => state.theme);
  const [isEditImgOpen, setIsEditImgOpen] = useState(false);
  const { data, isLoading, error, isFetching } = useQuery("userData", () =>
    getUserProfile()
  );
  const [userData, setUserData] = useState(data);
  const toggleEditImgOpen = () => {
    return setIsEditImgOpen(!isEditImgOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  console.log(isEditImgOpen);
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
          onClose={() => {
            setIsEditImgOpen(false);
            toggleProfileSetting();
          }}
        >
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={
                profileSettingOpen
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.7, opacity: 0 }
              }
              exit={{ scale: 0.7, opacity: 0 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : " bg-neutral-700 text-neutral-300"
              } relative mx-auto rounded-md shadow-xl p-4 w-[100vw]  max-w-md overflow-hidden`}
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
                  onClick={toggleEditImgOpen}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/${userData.userImgType}/svg?seed=${userData.userImg}`}
                    alt="avatar"
                    className="h-16 w-16 rounded-full"
                  />
                  <button>Edit Image</button>
                </div>
                <hr />
                <div className="relative">
                  <UpdateUserInfo
                    userData={userData}
                    setUserData={setUserData}
                    theme={theme}
                    isEditImgOpen={isEditImgOpen}
                    toggleEditImgOpen={toggleEditImgOpen}
                  />
                  <EditImage
                    userData={userData}
                    setUserData={setUserData}
                    isEditImgOpen={isEditImgOpen}
                    toggleEditImgOpen={toggleEditImgOpen}
                  />
                </div>
              </div>
              <button
                className={`${
                  theme === "light"
                    ? "bg-neutral-100 hover:bg-neutral-200"
                    : "bg-neutral-600/20 hover:bg-neutral-600/50 "
                } absolute top-3 right-4 p-2 rounded-full `}
                onClick={() => {
                  setIsEditImgOpen(false);
                  toggleProfileSetting();
                }}
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