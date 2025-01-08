import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { TagDTO } from "../../../models/TagDTO/TagDTO";

const unusedTagsQueryKey = "unusedTags";
export const getUnusedTagsQueryKey = () => [unusedTagsQueryKey];

export const useGetUnusedTags = () => {
  return useQuery<TagDTO[]>({
    queryKey: getUnusedTagsQueryKey(),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<TagDTO[]>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/tags/unused`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data as TagDTO[];
    },
  });
};
