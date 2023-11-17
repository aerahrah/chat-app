import { useQuery } from "react-query";
import { getAllChat } from "../../../services/chatAPI";
import { getChatName, getChatImg } from "../../../utils/getChatInfo";
import { Link } from "react-router-dom";
import { getTimeDifference } from "../../../utils/getTimeDifference";
import useChatCreationStore from "../../../components/state/useChatCreationStore";

const GetAllChat = () => {
  const searchTermChat = useChatCreationStore((state) => state.searchTermChat);
  const queryKey = ["getAllChat", searchTermChat];
  const {
    data: chatInfo,
    isLoading,
    error,
    isFetching,
  } = useQuery(queryKey, () => getAllChat(searchTermChat));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  console.log(chatInfo);
  return (
    <div className="relative text-neutral-700 dark:text-neutral-300 overflow-y-auto h-full">
      <div>
        {chatInfo.chats.map((data) => (
          <Link key={data._id} to={`/chat/${data._id}`}>
            <div className="flex items-center gap-2 p-4 hover:bg-neutral-300 hover:dark:bg-neutral-700">
              <div className="w-14">
                <img
                  src={getChatImg(data, chatInfo.userId)}
                  alt="avatar"
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1/2  w-[18vw] max-w-[250px]">
                <p className="truncate ">
                  {getChatName(data, chatInfo.userId)}
                </p>
                <div className="flex items-center gap-1 text-sm text-neutral-500">
                  {data.messages.length > 0 && (
                    <p className=" truncate">
                      {data.messages[data.messages.length - 1].content}
                    </p>
                  )}
                  <p>{getTimeDifference(data.updatedAt)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GetAllChat;
