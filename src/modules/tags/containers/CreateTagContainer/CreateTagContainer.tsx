import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { CreateTagForm } from "../../forms/CreateTagForm/CreateTagForm";
import { useCreateTag } from "../../hooks/mutations/useCreateTag/useCreateTag";
import { CreateTagDTO } from "../../models/CreateTagDTO/CreateTagDTO";

export const CreateTagContainer = () => {
  const { mutate: createTag } = useCreateTag();
  const { openToast } = useToast();
  const handleSubmit = (data: CreateTagDTO) => {
    createTag(data, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        openToast({
          variant: "success",
          message: "Tag created",
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
  return <CreateTagForm onSubmit={handleSubmit} />;
};
