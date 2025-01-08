import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface AddNoteToGroupInput {
  groupId: string;
  noteId: string;
}

export const useAddNoteToGroup = () => {
  return useMutation({
    mutationFn: (data: AddNoteToGroupInput) =>
      axios
        .post(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/groups/${data.groupId}/notes/${data.noteId}`,
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
