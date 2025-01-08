import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { CreateUserDTO } from "../../../models/CreateUserDTO/CreateUserDTO";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: CreateUserDTO) =>
      axios
        .post(`${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users`, user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => response.data as CreateUserDTO),
  });
};
