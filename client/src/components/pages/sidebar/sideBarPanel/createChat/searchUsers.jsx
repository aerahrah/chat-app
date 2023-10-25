import { useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { getAllUsers } from "../../../../api/authAPI";
import { Combobox } from "@headlessui/react";

const SearchUser = ({ setUserNameId, theme }) => {
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
    console.log(e);
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
          className={`${
            theme === "light"
              ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
              : "bg-neutral-800/70 outline-neutral-800/70"
          } outline outline-1 rounded block p-2 mb-2 w-[40vw] max-w-[100%]`}
        />
        <div className="h-36 overflow-y-auto">
          {data?.length > 0 && (
            <Combobox.Options>
              {data.map((user) => (
                <Combobox.Option
                  className={`${
                    theme === "light"
                      ? "hover:bg-neutral-100"
                      : "hover:bg-neutral-600"
                  } cursor-pointer  p-2 rounded`}
                  key={user._id}
                  value={user._id}
                  onClick={() => handleChangeUsername(user)}
                >
                  <div className="flex gap-4 items-center">
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
