import {
  avatarsNeutral,
  funAvatar,
  adventurerAvatar,
} from "../../../../utils/getAvatarsDetails";
import AvatarOptions, {
  generateAvatars,
} from "../../../../components/globalComponents/loadAvatarOptions";
import {
  adventurer,
  avataaarsNeutral,
  funEmoji,
  initials,
} from "@dicebear/collection";
import { motion } from "framer-motion";
import { useQueryClient, useMutation } from "react-query";
import { getInitials } from "../../../../utils/getInitials";
import { useState } from "react";
import { useMemo } from "react";
import { updateUserImage } from "../../../../services/authAPI";

const EditImage = ({ userData, setUserData, isEditImgOpen, theme }) => {
  const queryClient = useQueryClient();
  const updateUserImageMutation = useMutation(updateUserImage);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const singleArrayInitial = [getInitials(userData.firstName)];

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
  const handleUpdateUserImage = async () => {
    try {
      const updatedUserImage = await updateUserImageMutation.mutateAsync(
        userData
      );

      queryClient.invalidateQueries("userData");
      queryClient.invalidateQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
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
          className={` mt-2 h-full overflow-hidden`}
        >
          <div
            className={`${
              theme === "light" ? "bg-neutral-100" : "bg-neutral-800/50"
            } h-full p-2 flex flex-col max-h-[300px] rounded overflow-y-auto gap-6`}
          >
            <div>
              <h2 className="font-semibold mb-2">Initials Avatar</h2>
              <AvatarOptions
                avatars={initialsAvatar}
                setUserData={setUserData}
                type="userImage"
              />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Adventurer Avatars</h2>
              <AvatarOptions
                avatars={adventurerAvatars}
                setUserData={setUserData}
                type="userImage"
              />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Neutral Avatars</h2>
              <AvatarOptions
                avatars={neutralAvatars}
                setUserData={setUserData}
                type="userImage"
              />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Fun Avatars</h2>
              <AvatarOptions
                avatars={funAvatars}
                setUserData={setUserData}
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
