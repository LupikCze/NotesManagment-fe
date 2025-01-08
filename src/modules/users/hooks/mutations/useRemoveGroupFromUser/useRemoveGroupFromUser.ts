import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface RemoveGroupFromUserInput {
  userId: string;
  groupId: string;
}

export const useRemoveGroupFromUser = () => {
  return useMutation({
    mutationFn: (data: RemoveGroupFromUserInput) =>
      axios
        .delete(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/${data.userId}/groups/${data.groupId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data),
  });
};
