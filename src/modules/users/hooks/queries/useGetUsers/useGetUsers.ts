import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { UserDTO } from "../../../models/UserDTO/UserDTO";

const usersQueryKey = "users";
export const getUsersQueryKey = () => [usersQueryKey];

export const useGetUsers = () => {
  return useQuery<UserDTO[]>({
    queryKey: getUsersQueryKey(),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<UserDTO[]>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data as UserDTO[];
    },
  });
};
