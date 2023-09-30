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

const AvatarOptions = ({ setUserData, avatars }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {console.log(avatars)}
      {avatars.map((avatar, index) => (
        <img
          className="h-20 w-20"
          key={index}
          src={avatar.dataUri}
          alt={`Avatar ${index}`}
          onClick={() =>
            setUserData((prevVal) => ({
              ...prevVal,
              userImg: avatar.seed,
              userImgType: avatar.collection,
            }))
          }
        />
      ))}
    </div>
  );
};

export default AvatarOptions;