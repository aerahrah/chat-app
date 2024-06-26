import AvatarOptions, {
  generateAvatars,
} from "../../../../../components/globalComponents/loadAvatarOptions";
import {
  adventurerAvatar,
  avatarsNeutral,
  funAvatar,
} from "../../../../../utils/getAvatarsDetails";
import {
  adventurer,
  avataaarsNeutral,
  funEmoji,
  initials,
} from "@dicebear/collection";
import { useMemo } from "react";
import { getInitials } from "../../../../../utils/getInitials";
import { motion } from "framer-motion";

const LoadImgOption = ({ theme, chatInitials, setStateChatData }) => {
  const singleArrayInitial = [getInitials(chatInitials)];
  const adventurerAvatars = useMemo(
    () => generateAvatars(adventurerAvatar, adventurer, "adventurer"),
    [adventurerAvatar]
  );
  const neutralAvatars = useMemo(
    () =>
      generateAvatars(avatarsNeutral, avataaarsNeutral, "avataaars-neutral"),
    [avatarsNeutral]
  );
  const funAvatars = useMemo(
    () => generateAvatars(funAvatar, funEmoji, "fun-emoji"),
    [funAvatar]
  );

  const initialsAvatar = useMemo(
    () => generateAvatars(singleArrayInitial, initials, "initials"),
    [funAvatar]
  );
  return (
    <div>
      <motion.div
        className={`${
          theme === "light" ? "bg-neutral-100" : "bg-neutral-800/50"
        } my-4 h-full max-h-[360px] p-2 rounded-md overflow-hidden`}
      >
        <div className="h-full  flex flex-col max-h-[330px]  overflow-y-auto gap-6">
          <div>
            <h2 className="font-semibold mb-2">Initials Avatar</h2>
            <AvatarOptions
              avatars={initialsAvatar}
              setChatData={setStateChatData}
              type="groupChatImage"
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Adventurer Avatars</h2>
            <AvatarOptions
              avatars={adventurerAvatars}
              setChatData={setStateChatData}
              type="groupChatImage"
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Neutral Avatars</h2>
            <AvatarOptions
              avatars={neutralAvatars}
              setChatData={setStateChatData}
              type="groupChatImage"
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Fun Avatars</h2>
            <AvatarOptions
              avatars={funAvatars}
              setChatData={setStateChatData}
              type="groupChatImage"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default LoadImgOption;
