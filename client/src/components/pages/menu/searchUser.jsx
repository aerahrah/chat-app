import { useQuery, useQueryClient } from "react-query";

import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { getAllUsers } from "../../api/authAPI";
import { Combobox } from "@headlessui/react";

const SearchUser = ({ setUserNameId }) => {
  const queryClient = useQueryClient();
  const [userName, setUserName] = useState("");

  const { data, isLoading, error, refetch } = useQuery(
    "getAllUsers",
    () => getAllUsers(userName),
    {
      initialData: [],
      enabled: false,
      staleTime: 60000,
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  useEffect(() => {
    if (userName) {
      const debouncedRefetch = debounce(() => {
        refetch();
      }, 500);

      debouncedRefetch();
      return () => {
        debouncedRefetch.cancel();
      };
    }
  }, [userName, refetch]);
  return (
    <div>
      <Combobox value={userName}>
        <Combobox.Input onChange={(e) => setUserName(e.target.value)} />
        {data?.length > 0 && (
          <Combobox.Options>
            {data.map((user) => (
              <Combobox.Option
                className="cursor-pointer hover:bg-blue-200 p-1 px-6 border-b-[1px] border-blue-100"
                key={user._id}
                value={user._id}
                onClick={() => setUserNameId(user._id)}
              >
                {user.username}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  );
};
export default SearchUser;
