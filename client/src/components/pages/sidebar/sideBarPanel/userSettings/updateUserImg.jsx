import { AnimatePresence, motion } from "framer-motion";
import AvatarOptions, { generateAvatars } from "./loadUserImgOptions";
import { useMemo } from "react";
import { adventurer, avataaarsNeutral, funEmoji } from "@dicebear/collection";
import {
  adventurerAvatar,
  funAvatar,
  avatarsNeutral,
} from "../../../../utils/diceBearAvatars/avatars";

const EditImage = ({ isEditImgOpen, toggleEditImgOpen }) => {
  const adventurerAvatars = useMemo(
    () => generateAvatars(adventurerAvatar, adventurer),
    [adventurerAvatar]
  );
  const neutralAvatars = useMemo(
    () => generateAvatars(avatarsNeutral, avataaarsNeutral),
    [avatarsNeutral]
  );
  const funAvatars = useMemo(
    () => generateAvatars(funAvatar, funEmoji),
    [funAvatar]
  );
  return (
    <div>
      {isEditImgOpen && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: isEditImgOpen ? 0 : 300 }}
          exit={{ opacity: 0 }}
          className="mt-4 h-full max-h-[344px] bg-neutral-100 dark:bg-neutral-700 p-2 rounded-md overflow-hidden"
        >
          <div className="h-full  flex flex-col max-h-[344px]  overflow-y-auto gap-6">
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
      )}
    </div>
  );
};
export default EditImage;
