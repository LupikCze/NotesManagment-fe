import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface RemoveTagFromNoteInput {
  noteId: string;
  tagId: string;
}

export const useRemoveTagFromNote = () => {
  return useMutation({
    mutationFn: (data: RemoveTagFromNoteInput) =>
      axios
        .delete(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/notes/${data.noteId}/tags/${data.tagId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data),
  });
};
