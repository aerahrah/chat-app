import { useState } from "react";
import { updateUserInfo } from "../../../../api/authAPI";
import { useMutation, useQueryClient } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowTrendUp, FaGalacticSenate } from "react-icons/fa6";

const UpdateUserInfo = ({
  userData,
  setUserData,
  theme,
  isEditImgOpen,
  toggleEditImgOpen,
}) => {
  const updateUserInfoMutation = useMutation(updateUserInfo);

  const [initialState, setInitialState] = useState(false);
  const queryClient = useQueryClient();

  const handleUpdateUserInfo = async () => {
    try {
      const updatedUserInfo = await updateUserInfoMutation.mutateAsync(
        userData
      );
      queryClient.invalidateQueries("userData");

      console.log(updatedUserInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <div>
        {!isEditImgOpen && (
          <motion.div
            initial={{ x: !isEditImgOpen && initialState ? -300 : 0 }}
            animate={{ x: !isEditImgOpen ? 0 : -300 }}
            onAnimationComplete={() => setInitialState(true)}
          >
            <div>
              <h3 className="mt-4 m-2 font-semibold">personal information</h3>
              <div className="p-2 flex flex-col gap-3.5 w-full mb-4">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <label>First Name</label>
                    <input
                      className={`${
                        theme === "light"
                          ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                          : "bg-neutral-800 outline-neutral-800"
                      } outline outline-1 rounded block p-2  `}
                      type="text"
                      value={userData.firstName}
                      onChange={(e) =>
                        setUserData((prevVal) => ({
                          ...prevVal,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Last Name</label>
                    <input
                      className={`${
                        theme === "light"
                          ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                          : "bg-neutral-800 outline-neutral-800"
                      } outline outline-1 rounded block p-2`}
                      type="text"
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData((prevVal) => ({
                          ...prevVal,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label>Username </label>
                  <input
                    className={`${
                      theme === "light"
                        ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                        : "bg-neutral-800 outline-neutral-800"
                    } outline outline-1 rounded block p-2  w-full`}
                    type="text"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData((prevVal) => ({
                        ...prevVal,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Email</label>
                  <input
                    className={`${
                      theme === "light"
                        ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                        : "bg-neutral-800 outline-neutral-800"
                    } outline outline-1 rounded block p-2 mb-2 w-full`}
                    type="text"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prevVal) => ({
                        ...prevVal,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%]">
              <button
                className="block bg-blue-500 text-blue-50 rounded p-2 hover:bg-blue-600 mx-auto shadow-md capitalize w-[80vw] max-w-[80%]"
                onClick={handleUpdateUserInfo}
              >
                Update profile
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
export default UpdateUserInfo;
