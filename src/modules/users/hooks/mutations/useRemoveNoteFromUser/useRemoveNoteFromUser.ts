import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface RemoveNoteFromUserInput {
  userId: string;
  noteId: string;
}

export const useRemoveNoteFromUser = () => {
  return useMutation({
    mutationFn: (data: RemoveNoteFromUserInput) =>
      axios
        .delete(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/${data.userId}/notes/${data.noteId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data),
  });
};
