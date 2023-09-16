import { useQuery, useQueryClient } from "react-query";

import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { getAllUsers } from "../../api/authAPI";
import { Combobox } from "@headlessui/react";

const SearchUser = () => {
  const queryClient = useQueryClient();
  const [userName, setUserName] = useState("");
  const [userNameDispaly, setUserNameDispaly] = useState("");

  const { data, isLoading, error, refetch } = useQuery(
    "getAllUsers",
    () => getAllUsers(userName),
    {
      initialData: [],
      enabled: false,
      staleTime: 60000,
    }
  );

  console.log(data);
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
        {/* {cityDetails?.length > 0 && (
          <Combobox.Options>
            {cityDetails.map((city) => (
              <CityOption key={city.id} city={city} />
            ))}
          </Combobox.Options>
        )} */}
      </Combobox>
    </div>
  );
};
export default SearchUser;
