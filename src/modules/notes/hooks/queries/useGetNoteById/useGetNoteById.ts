import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { NoteDTO } from "../../../models/NoteDTO/NoteDTO";

const noteQueryKey = "notes";
export const getNotesQueryKey = (id: string) => [noteQueryKey, id];

export const useGetNoteById = (id: string) => {
  return useQuery<NoteDTO>({
    queryKey: getNotesQueryKey(id),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<NoteDTO>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data as NoteDTO;
    },
  });
};
