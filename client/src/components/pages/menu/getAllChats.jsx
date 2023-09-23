import { useQuery } from "react-query";
import { getAllChat } from "../../api/chatAPI";
import useChatCreationStore from "../../state/chat/useChatCreationStore";
const GetAllChat = () => {
  const searchTermChat = useChatCreationStore((state) => state.searchTermChat);
  const queryKey = ["getAllChat", searchTermChat];
  const { data, isLoading, error, isFetching } = useQuery(queryKey, () =>
    getAllChat(searchTermChat)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  return (
    <div className="relative z-0 overflow-y-auto h-full">
      <div>
        {data.map((data) => (
          <ul
            className="flex items-center justify-between p-4 hover:bg-gray-300"
            key={data._id}
          >
            <li>
              <img
                src={`https://api.dicebear.com/7.x/${data.chatImgType}/svg?seed=${data.chatImg}`}
                alt="avatar"
                className="h-12 w-12 rounded-full"
              />
            </li>
            {data.name}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default GetAllChat;
