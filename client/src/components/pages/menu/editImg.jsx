import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { adventurer, avataaarsNeutral, funEmoji } from "@dicebear/collection";
import {
  adventurerAvatar,
  funAvatar,
  avatarsNeutral,
} from "../../utils/diceBearAvatars/avatars";

const EditImage = ({ isEditImgOpen, setIsEditImgOpen }) => {
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
        <div>
          <h2>Adventurer Avatars</h2>
          <div className="flex gap-1 flex-wrap">
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
      )}
    </div>
  );
};
export default EditImage;
