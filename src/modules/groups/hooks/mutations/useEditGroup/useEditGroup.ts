import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { EditGroupDTO } from "../../../models/EditGroupDTO/EditGroupDTO";

interface EditGroupInput {
  group: EditGroupDTO;
  id: string;
}

export const useEditGroup = () => {
  return useMutation({
    mutationFn: (data: EditGroupInput) =>
      axios
        .put(
          `${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/groups/${data.id}`,
          data.group,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response.data as EditGroupDTO),
  });
};
