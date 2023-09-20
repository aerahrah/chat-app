import { useQuery } from "react-query";
import { getAllChat } from "../../api/chatAPI";

const GetAllChat = () => {
  const { data, isLoading, error, isFetching } = useQuery(
    "getAllChat",
    () => getAllChat(),
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
            <li>{data.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default GetAllChat;
