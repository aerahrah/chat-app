import { AnimatePresence, motion } from "framer-motion";
import AvatarOptions, { generateAvatars } from "./loadImgOptionSetting";
import { useMemo } from "react";
import { adventurer, avataaarsNeutral, funEmoji } from "@dicebear/collection";
import {
  adventurerAvatar,
  funAvatar,
  avatarsNeutral,
} from "../../../../utils/diceBearAvatars/avatars";

const LoadImgOption = ({ theme }) => {
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
  return (
    <div>
      <motion.div
        className={`${
          theme === "light" ? "bg-neutral-100" : "bg-neutral-800/50"
        } my-4 h-full max-h-[360px] p-2 rounded-md overflow-hidden`}
      >
        <div className="h-full  flex flex-col max-h-[330px]  overflow-y-auto gap-6">
          <div>
            <h2 className="font-semibold mb-2">Adventurer Avatars</h2>
            <AvatarOptions avatars={adventurerAvatars} />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Neutral Avatars</h2>
            <AvatarOptions avatars={neutralAvatars} />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Fun Avatars</h2>
            <AvatarOptions avatars={funAvatars} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default LoadImgOption;
