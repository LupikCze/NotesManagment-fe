import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { CreateUserDTO } from "../../../../users/models/CreateUserDTO/CreateUserDTO";

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: CreateUserDTO) =>
      axios
        .post(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/register`,
          user,
        )
        .then((response) => response.data as CreateUserDTO),
  });
};
