import { useQuery } from "react-query";
import { getAllChat } from "../../../api/chatAPI";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import { getChatName, getChatImg } from "./getChatInfo";
import { Link } from "react-router-dom";

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

  return (
    <div className="relative text-neutral-700 dark:text-neutral-300 overflow-y-auto h-full">
      <div>
        {chatInfo.chats.map((data) => (
          <Link key={data._id} to={`/chat/${data._id}`}>
            <ul className="flex items-center justify-between p-4 hover:bg-neutral-300 hover:dark:bg-neutral-700">
              <li>
                <img
                  src={getChatImg(data, chatInfo.userId)}
                  alt="avatar"
                  className="h-12 w-12 rounded-full"
                />
              </li>
              {getChatName(data, chatInfo.userId)}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GetAllChat;
