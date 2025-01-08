import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { CreateGroupForm } from "../../forms/CreateGroupForm/CreateGroupForm";
import { useCreateGroup } from "../../hooks/mutations/useCreateGroup/useCreateGroup";
import { CreateGroupDTO } from "../../models/CreateGroupDTO/CreateGroupDTO";

export const CreateGroupContainer = () => {
  const { mutate: createGroup } = useCreateGroup();
  const { openToast } = useToast();
  const handleSubmit = (data: CreateGroupDTO) => {
    createGroup(data, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        openToast({
          variant: "success",
          message: "Group created",
        });
      },
      onError: (error) => {
        openToast({
          variant: "danger",
          message: error.message,
        });
      },
    });
  };
  return <CreateGroupForm onSubmit={handleSubmit} />;
};
