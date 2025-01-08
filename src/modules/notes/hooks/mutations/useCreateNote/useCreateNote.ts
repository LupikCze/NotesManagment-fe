import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { CreateNoteDTO } from "../../../models/CreateNoteDTO/CreateNoteDTO";
import { NoteDTO } from "../../../models/NoteDTO/NoteDTO";

export const useCreateNote = () => {
  return useMutation({
    mutationFn: (note: CreateNoteDTO) =>
      axios
        .post(`${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/notes`, note, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => response.data as NoteDTO),
  });
};
