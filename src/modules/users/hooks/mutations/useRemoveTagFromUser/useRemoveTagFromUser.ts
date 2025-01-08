import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface RemoveTagFromUserInput {
  userId: string;
  tagId: string;
}

export const useRemoveTagFromUser = () => {
  return useMutation({
    mutationFn: (data: RemoveTagFromUserInput) =>
      axios
        .delete(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/${data.userId}/tags/${data.tagId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data),
  });
};
