import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface RemoveNoteFromGroupInput {
  groupId: string;
  noteId: string;
}

export const useRemoveNoteFromGroup = () => {
  return useMutation({
    mutationFn: (data: RemoveNoteFromGroupInput) =>
      axios
        .delete(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/groups/${data.groupId}/notes/${data.noteId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data),
  });
};
