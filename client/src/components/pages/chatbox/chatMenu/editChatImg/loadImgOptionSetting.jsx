import { createAvatar } from "@dicebear/core";

export const generateAvatars = (seeds, collection, collectionName) =>
  seeds.map((seed) => ({
    seed: seed,
    collection: collectionName,
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
          className="h-20 w-20 transition transform hover:scale-[1.04] duration-[200ms] cursor-pointer"
          key={index}
          src={avatar.dataUri}
          alt={`Avatar ${index}`}
        />
      ))}
    </div>
  );
};

export default AvatarOptions;
