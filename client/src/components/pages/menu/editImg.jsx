import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { adventurer, avataaarsNeutral, funEmoji } from "@dicebear/collection";
import { AnimatePresence, motion } from "framer-motion";
import {
  adventurerAvatar,
  funAvatar,
  avatarsNeutral,
} from "../../utils/diceBearAvatars/avatars";

const EditImage = ({ isEditImgOpen, toggleEditImgOpen }) => {
  const generateAvatars = (seeds, collection) => {
    return seeds.map((seed) => {
      const avatar = createAvatar(collection, {
        seed: seed,
        size: 128,
      }).toDataUriSync();
      return avatar;
    });
  };

  const adventurerAvatars = generateAvatars(adventurerAvatar, adventurer);
  const neutralAvatars = generateAvatars(avatarsNeutral, avataaarsNeutral);
  const funAvatars = generateAvatars(funAvatar, funEmoji);
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
              <div className="flex gap-2 flex-wrap ">
                {adventurerAvatars.map((avatar, index) => (
                  <img
                    className="h-20 w-20"
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-semibold mb-2">Adventurer Avatars</h2>
              <div className="flex gap-2 flex-wrap ">
                {neutralAvatars.map((avatar, index) => (
                  <img
                    className="h-20 w-20"
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-semibold mb-2">Adventurer Avatars</h2>
              <div className="flex gap-2 flex-wrap ">
                {funAvatars.map((avatar, index) => (
                  <img
                    className="h-20 w-20"
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default EditImage;
