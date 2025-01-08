import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { UserDTO } from "../../../models/UserDTO/UserDTO";

const currentUserQueryKey = "currentUser";
export const getCurrentUserQueryKey = () => [currentUserQueryKey];

export const useGetCurrentUser = () => {
  return useQuery<UserDTO>({
    queryKey: getCurrentUserQueryKey(),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<UserDTO>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data as UserDTO;
    },
  });
};
