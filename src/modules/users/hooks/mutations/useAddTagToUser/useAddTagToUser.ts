import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface AddTagToUserInput {
  userId: string;
  tagId: string;
}

export const useAddTagToUser = () => {
  return useMutation({
    mutationFn: (data: AddTagToUserInput) =>
      axios
        .post(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/${data.userId}/tags/${data.tagId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data),
  });
};
