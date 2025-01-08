import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { EditUserDTO } from "../../../models/EditUserDTO/EditUserDTO";

interface EditUserInput {
  user: EditUserDTO;
  id: string;
}

export const useEditUser = () => {
  return useMutation({
    mutationFn: (data: EditUserInput) =>
      axios
        .put(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/${data.id}`,
          data.user,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data as EditUserDTO),
  });
};
