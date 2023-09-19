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

  // if (isFetching) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="relative z-0 overflow-y-auto h-full">
      <div>
        {data.map((data) => (
          <ul className="p-4 hover:bg-gray-300" key={data._id}>
            <li>{data.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default GetAllChat;
