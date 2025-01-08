import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { GroupDTO } from "../../../models/GroupDTO/GroupDTO";

const groupsQueryKey = "groups";
export const getGroupsQueryKey = () => [groupsQueryKey];

export const useGetGroups = () => {
  return useQuery<GroupDTO[]>({
    queryKey: getGroupsQueryKey(),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<GroupDTO[]>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/groups`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data as GroupDTO[];
    },
  });
};
