import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  EnvVariableName,
  getEnvVariable,
} from "../../../../../common/config/env/getEnvVariable";
import { CreateGroupDTO } from "../../../models/CreateGroupDTO/CreateGroupDTO";
import { GroupDTO } from "../../../models/GroupDTO/GroupDTO";

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: (group: CreateGroupDTO) =>
      axios
        .post(`${getEnvVariable(EnvVariableName.HOST_CORE)}/v1/groups`, group, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => response.data as GroupDTO),
  });
};
