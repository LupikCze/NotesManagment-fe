import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";

export const useDeleteTag = () => {
  return useMutation({
    mutationFn: (tagId: string) =>
      axios
        .delete(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/tags/${tagId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data),
  });
};
