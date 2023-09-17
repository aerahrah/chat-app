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

  if (isFetching) {
    return <div>Loading...</div>;
  }

  // Now, render the chat data from the current account
  return (
    <div>
      {data.map((data) => (
        <ul key={data._id}>
          <li>{data.name}</li>
        </ul>
      ))}
    </div>
  );
};

export default GetAllChat;
