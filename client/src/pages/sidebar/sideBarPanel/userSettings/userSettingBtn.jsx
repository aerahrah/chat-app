import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Popover, Transition } from "@headlessui/react";
import { FaGear, FaArrowRightFromBracket, FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ProfileSetting from "./userSettingModal";
import UpdateUserPassword from "./updateUserPassword";

const UserSettings = () => {
  const [profileSettingOpen, toggleProfileSettingOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isEditImgOpen, setIsEditImgOpen] = useState(false);
  const isMobileScreen = useMediaQuery({ maxWidth: 548 });

  const navigate = useNavigate();

  const toggleEditImgOpen = () => {
    return setIsEditImgOpen(!isEditImgOpen);
  };

  const toggleChangePassword = () => {
    return setChangePassword(!changePassword);
  };

  const toggleProfileSetting = () => {
    setIsEditImgOpen(false);
    return toggleProfileSettingOpen(!profileSettingOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Popover className="relative text-lg">
        <Popover.Button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-1 transition duration-[300ms] outline-0">
          <BiDotsHorizontalRounded className="h-8 w-8 " />
        </Popover.Button>
        <Transition
          as="div"
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          className="absolute z-30"
        >
          <Popover.Panel>
            <div
              className={`${
                isMobileScreen ? "right-[-9rem]" : ""
              } absolute shadow-md p-2 flex flex-col gap-2 z-10 rounded-md bg-white items-start whitespace-nowrap dark:bg-neutral-700 dark:shadow-lg  border-[1px] border-neutral-200 dark:border-neutral-800 `}
            >
              <button
                className="w-full flex gap-2 items-center  capitalize p-2 hover:bg-neutral-100 hover:dark:bg-neutral-600"
                onClick={toggleProfileSetting}
              >
                <i>
                  <FaGear />
                </i>
                <p>Profile setting</p>
              </button>
              <button
                className="w-full flex gap-2 items-center  capitalize p-2  hover:bg-neutral-100 hover:dark:bg-neutral-600"
                onClick={toggleChangePassword}
              >
                <i>
                  <FaLock />
                </i>
                <p>change password</p>
              </button>
              <button
                className=" w-full flex gap-2 items-center capitalize p-2  hover:bg-neutral-100 hover:dark:bg-neutral-600"
                onClick={handleLogout}
              >
                <i>
                  <FaArrowRightFromBracket />
                </i>
                <p>Logout</p>
              </button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <ProfileSetting
        isEditImgOpen={isEditImgOpen}
        toggleEditImgOpen={toggleEditImgOpen}
        profileSettingOpen={profileSettingOpen}
        toggleProfileSetting={toggleProfileSetting}
      />

      <UpdateUserPassword
        changePassword={changePassword}
        toggleChangePassword={toggleChangePassword}
      />
    </div>
  );
};
export default UserSettings;
