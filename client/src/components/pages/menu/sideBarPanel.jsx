import CreateChat from "./createChat/createChatBtn";
import { useQuery } from "react-query";
import { getUserProfile } from "../../api/authAPI";
const SideBarPanel = () => {
  const { data, isLoading, error, isFetching } = useQuery(
    "userData",
    () => getUserProfile(),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  console.log(data);
  return (
    <div className="flex justify-between px-4 pt-6">
      <img
        src={`https://api.dicebear.com/7.x/${data.userImgType}/svg?seed=${data.userImg}`}
        alt="avatar"
        className="h-12 w-12 rounded-full"
      />
      <div className="flex">
        <p>settings</p>
        <CreateChat />
        <p>DMode</p>
      </div>
    </div>
  );
};
export default SideBarPanel;
