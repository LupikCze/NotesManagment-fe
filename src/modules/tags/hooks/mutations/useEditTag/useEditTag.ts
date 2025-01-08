import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { EditTagDTO } from "../../../models/EditTagDTO/EditTagDTO";

interface EditTagInput {
  tag: EditTagDTO;
  id: string;
}

export const useEditTag = () => {
  return useMutation({
    mutationFn: (data: EditTagInput) =>
      axios
        .put(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/tags/${data.id}`,
          data.tag,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data as EditTagDTO),
  });
};
