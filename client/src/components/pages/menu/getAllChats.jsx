import { useQuery } from "react-query";
import { getAllChat } from "../../api/chatAPI";

const GetAllChat = () => {
  const { data, isLoading, error } = useQuery("getAllChat", getAllChat);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  console.log(data);
  return (
    <div>
      {data.map((data) => (
        <ul>
          <li>{data.name}</li>
        </ul>
      ))}
    </div>
  );
};

export default GetAllChat;
