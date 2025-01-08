import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface AddGroupToUserInput {
  userId: string;
  groupId: string;
}

export const useAddGroupToUser = () => {
  return useMutation({
    mutationFn: (data: AddGroupToUserInput) =>
      axios
        .post(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/${data.userId}/groups/${data.groupId}`,
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
