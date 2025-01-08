import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { AuthenticationRequest } from "../../../models/AuthenticationRequest/AuthenticationRequest";
import { AuthenticationResponse } from "../../../models/AuthenticationResponse/AuthenticationResponse";

export const useLogin = () => {
  return useMutation({
    mutationFn: (auth: AuthenticationRequest) =>
      axios
        .post(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/users/authenticate`,
          auth,
        )
        .then((response) => {
          if (response.data)
            localStorage.setItem("token", response.data.accessToken);
          return response.data as AuthenticationResponse;
        }),
  });
};
