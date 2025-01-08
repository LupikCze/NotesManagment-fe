import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { CreateTagDTO } from "../../../models/CreateTagDTO/CreateTagDTO";
import { TagDTO } from "../../../models/TagDTO/TagDTO";

export const useCreateTag = () => {
  return useMutation({
    mutationFn: (tag: CreateTagDTO) =>
      axios
        .post(`${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/tags`, tag, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => response.data as TagDTO),
  });
};
