import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { EditNoteDTO } from "../../../models/EditNoteDTO/EditNoteDTO";

interface EditNoteInput {
  note: EditNoteDTO;
  id: string;
}

export const useEditNote = () => {
  return useMutation({
    mutationFn: (data: EditNoteInput) =>
      axios
        .put(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/notes/${data.id}`,
          data.note,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data as EditNoteDTO),
  });
};
