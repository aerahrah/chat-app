import { useQuery } from "react-query";
import { getAllChat } from "../../api/chatAPI";

const GetAllChat = () => {
  const { data, isLoading, error } = useQuery("getAllChat", getAllChat, {
    staleTime: 60000,
  });
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
        <ul key={data._id}>
          <li>{data.name}</li>
        </ul>
      ))}
    </div>
  );
};

export default GetAllChat;
