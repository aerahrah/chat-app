import { createAvatar } from "@dicebear/core";

export const generateAvatars = (seeds, collection) =>
  seeds.map((seed) => ({
    seed: seed,
    collection: collection,
    dataUri: createAvatar(collection, {
      seed,
      size: 128,
    }).toDataUriSync(),
  }));

const AvatarOptions = ({ avatars }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {console.log(avatars)}
      {avatars.map((avatar, index) => (
        <img
          className="h-20 w-20"
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
        />
      ))}
    </div>
  );
};

export default AvatarOptions;
