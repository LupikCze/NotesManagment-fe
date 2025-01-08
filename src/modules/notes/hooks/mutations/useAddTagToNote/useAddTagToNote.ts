import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

interface AddTagToNoteInput {
  noteId: string;
  tagId: string;
}

export const useAddTagToNote = () => {
  return useMutation({
    mutationFn: (data: AddTagToNoteInput) =>
      axios
        .post(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/notes/${data.noteId}/tags/${data.tagId}`,
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
