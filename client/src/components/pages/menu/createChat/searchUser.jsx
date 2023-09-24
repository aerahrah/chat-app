import { useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { getAllUsers } from "../../../api/authAPI";
import { Combobox } from "@headlessui/react";

const SearchUser = ({ setUserNameId }) => {
  const [identifier, setIdentifier] = useState("");

  const { data, isLoading, error, refetch } = useQuery(
    "getAllUsers",
    () => getAllUsers(identifier),
    {
      initialData: [],
      enabled: false,
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  const handleChangeUsername = (e) => {
    setIdentifier(`${e.firstName} ${e.lastName}`);
    setUserNameId(e._id);
  };

  useEffect(() => {
    if (identifier) {
      const debouncedRefetch = debounce(() => {
        refetch();
      }, 500);

      debouncedRefetch();
      return () => {
        debouncedRefetch.cancel();
      };
    }
  }, [identifier, refetch]);
  return (
    <div className="mb-2">
      <Combobox value={identifier}>
        <Combobox.Input
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Enter name or username"
          className="outline outline-1 bg-stone-100 outline-neutral-400 rounded-sm focus:outline-blue-500 block p-2 mb-2 w-[40vw] max-w-[100%] "
        />
        <div className="h-36 overflow-y-auto">
          {data?.length > 0 && (
            <Combobox.Options>
              {data.map((user) => (
                <Combobox.Option
                  className="cursor-pointer hover:bg-stone-100 p-2 border-b-[1px] border-blue-100"
                  key={user._id}
                  value={user._id}
                  onClick={() => handleChangeUsername(user)}
                >
                  <div className="flex justify-between items-center">
                    <img
                      src={`https://api.dicebear.com/7.x/${user.userProfileImgType}/svg?seed=${user.userProfileImg}`}
                      alt="avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                  </div>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};
export default SearchUser;
