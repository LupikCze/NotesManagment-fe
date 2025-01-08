import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface AddTagToGroupInput {
  groupId: string;
  tagId: string;
}

export const useAddTagToGroup = () => {
  return useMutation({
    mutationFn: (data: AddTagToGroupInput) =>
      axios
        .post(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/groups/${data.groupId}/tags/${data.tagId}`,
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
