import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { NoteDTO } from "../../../models/NoteDTO/NoteDTO";

const notesQueryKey = "notes";
export const getNotesQueryKey = () => [notesQueryKey];

export const useGetNotes = () => {
  return useQuery<NoteDTO[]>({
    queryKey: getNotesQueryKey(),
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<NoteDTO[]>(
        `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/notes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data as NoteDTO[];
    },
  });
};
