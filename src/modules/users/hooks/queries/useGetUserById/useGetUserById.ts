import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { User } from "../../../models/User/User";

const usersQueryKey = "users";
export const getUsersQueryKey = (id: string) => [usersQueryKey, id];

export const useGetUserById = (id: string) => {
  return useQuery<User>({
    queryKey: getUsersQueryKey(id),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<User>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/${id}/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data as User;
    },
  });
};
