import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { TagDTO } from "../../../models/TagDTO/TagDTO";

const tagsQueryKey = "tags";
export const getTagsQueryKey = () => [tagsQueryKey];

export const useGetTags = () => {
  return useQuery<TagDTO[]>({
    queryKey: getTagsQueryKey(),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<TagDTO[]>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/tags`,
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
