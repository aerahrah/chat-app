import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Popover, Transition } from "@headlessui/react";
import { FaGear, FaArrowRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Popover className="relative text-gray-700 text-lg">
      <Popover.Button className="bg-gray-200/40 hover:bg-gray-200 rounded-full">
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
          <div className="absolute shadow-md p-2 flex flex-col gap-2 z-10 rounded-md bg-white items-start whitespace-nowrap">
            <button className="flex gap-2 items-center whitespace-nowrap py-2 px-4 hover:bg-gray-100">
              <FaGear />
              Profile settings
            </button>
            <button
              className="flex gap-2 items-center whitespace-nowrap py-2 px-4  hover:bg-gray-100 w-full"
              onClick={handleLogout}
            >
              <i>
                <FaArrowRightFromBracket />
              </i>
              Logout
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default UserSettings;
