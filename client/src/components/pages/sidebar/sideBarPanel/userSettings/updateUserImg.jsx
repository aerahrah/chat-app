import { motion } from "framer-motion";
import { useQueryClient, useMutation } from "react-query";
import { useState } from "react";
import AvatarOptions, { generateAvatars } from "./loadUserImgOptions";
import { useMemo } from "react";
import { adventurer, avataaarsNeutral, funEmoji } from "@dicebear/collection";
import { updateUserImage } from "../../../../api/authAPI";
import {
  adventurerAvatar,
  funAvatar,
  avatarsNeutral,
} from "../../../../utils/diceBearAvatars/avatars";

const EditImage = ({ userData, setUserData, isEditImgOpen, theme }) => {
  const queryClient = useQueryClient();
  const updateUserImageMutation = useMutation(updateUserImage);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleUpdateUserImage = async () => {
    try {
      const updatedUserImage = await updateUserImageMutation.mutateAsync(
        userData
      );

      queryClient.invalidateQueries("userData");
      setMessage(updatedUserImage.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      {isEditImgOpen && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: isEditImgOpen ? 0 : 300 }}
          exit={{ opacity: 0 }}
          className={` mt-4 h-full overflow-hidden`}
        >
          <div
            className={`${
              theme === "light" ? "bg-neutral-100" : "bg-neutral-800/50"
            } h-full p-2 flex flex-col max-h-[300px] rounded overflow-y-auto gap-6`}
          >
            <div>
              <h2 className="font-semibold mb-2">Adventurer Avatars</h2>
              <AvatarOptions
                setUserData={setUserData}
                avatars={adventurerAvatars}
                type="userImage"
              />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Neutral Avatars</h2>
              <AvatarOptions
                setUserData={setUserData}
                avatars={neutralAvatars}
                type="userImage"
              />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Fun Avatars</h2>
              <AvatarOptions
                setUserData={setUserData}
                avatars={funAvatars}
                type="userImage"
              />
            </div>
          </div>
          <div className="relative py-6">
            <p className="absolute top-1/2 transform translate-y-[-50%] text-center w-full text-base text-green-500">
              {message}
            </p>
            <p className="absolute top-1/2 transform translate-y-[-50%] center w-full text-base text-red-500">
              {errorMessage}
            </p>
          </div>
          <div className="w-[100%] ">
            <button
              className="block bg-blue-500 text-blue-50 rounded p-2 hover:bg-blue-600 mx-auto shadow-md capitalize w-[80vw] max-w-[80%] cursor-pointer"
              onClick={handleUpdateUserImage}
            >
              Update Image
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default EditImage;
