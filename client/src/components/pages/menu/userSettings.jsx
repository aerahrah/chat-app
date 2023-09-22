import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Popover, Transition } from "@headlessui/react";

const UserSettings = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="hover:bg-gray-200 rounded-full">
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
          <div className="absolute shadow-md p-6 flex flex-col gap-6 z-10 rounded-md bg-white items-start whitespace-nowrap">
            <div>Profile settings</div>
            <div>Logout</div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default UserSettings;
