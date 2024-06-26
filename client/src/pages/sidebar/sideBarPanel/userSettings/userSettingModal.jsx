import { useQuery } from "react-query";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { getUserProfile } from "../../../../services/authAPI";
import { useState } from "react";
import useThemeStore from "../../../../components/state/useThemeStore";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import UpdateUserInfo from "./updateUserInfo";
import EditImage from "./updateUserImg";

const ProfileSetting = ({
  profileSettingOpen,
  isEditImgOpen,
  toggleProfileSetting,
  toggleEditImgOpen,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const { data, isLoading, error, isFetching } = useQuery("userData", () =>
    getUserProfile()
  );
  const [userData, setUserData] = useState(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <DialogComponent
      openModal={profileSettingOpen}
      closeModal={toggleProfileSetting}
      title="profile settings"
    >
      <div className="capitalize w-full">
        <h3 className="mb-2 mx-2 font-semibold ">Account</h3>
        <div
          className={`${
            theme === "light"
              ? "hover:bg-neutral-100"
              : "hover:bg-neutral-600/30 "
          } flex items-center justify-between gap-2 mb-2 p-2 rounded-md cursor-pointer`}
          onClick={toggleEditImgOpen}
        >
          <div className="flex gap-2">
            <img
              src={`https://api.dicebear.com/7.x/${userData.userImgType}/svg?seed=${userData.userImg}`}
              alt="avatar"
              className="h-16 w-16 rounded-full"
            />
            <button>Edit Image</button>
          </div>

          <i
            className={`${
              theme === "light" ? "bg-neutral-100" : "bg-neutral-600/50 "
            } p-2 rounded-full `}
          >
            {isEditImgOpen ? (
              <FaAngleLeft className="h-5 w-5" />
            ) : (
              <FaAngleRight className="h-5 w-5" />
            )}
          </i>
        </div>
        <p
          className={`${
            theme === "light" ? "border-neutral-300" : "border-neutral-600 "
          } border-b-[1px]`}
        ></p>
        <div className="relative">
          <UpdateUserInfo
            data={data}
            theme={theme}
            isEditImgOpen={isEditImgOpen}
          />
          <EditImage
            userData={userData}
            setUserData={setUserData}
            theme={theme}
            isEditImgOpen={isEditImgOpen}
          />
        </div>
      </div>
    </DialogComponent>
  );
};
export default ProfileSetting;
