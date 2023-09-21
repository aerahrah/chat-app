import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Popover } from "@headlessui/react";

const UserSettings = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="hover:bg-gray-200 rounded-full">
        <BiDotsHorizontalRounded className="h-8 w-8 " />
      </Popover.Button>
      <Popover.Panel className="absolute z-10">
        <div className="absolute shadow-md p-6 flex flex-col gap-6 z-10 rounded-md bg-white items-start whitespace-nowrap">
          <div>Profile settings</div>
          <div>Logout</div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
export default UserSettings;
