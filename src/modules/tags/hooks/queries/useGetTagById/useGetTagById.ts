import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { TagDTO } from "../../../models/TagDTO/TagDTO";

const tagsQueryKey = "tags";
export const getTagQueryKey = (id: string) => [tagsQueryKey, id];

export const useGetTagById = (id: string) => {
  return useQuery<TagDTO>({
    queryKey: getTagQueryKey(id),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<TagDTO>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/tags/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data as TagDTO;
    },
  });
};
