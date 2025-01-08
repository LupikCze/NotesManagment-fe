import { FC } from "react";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { EditTagForm } from "../../forms/EditTagForm/EditTagForm";
import { useEditTag } from "../../hooks/mutations/useEditTag/useEditTag";
import { EditTagDTO } from "../../models/EditTagDTO/EditTagDTO";
import { TagDTO } from "../../models/TagDTO/TagDTO";

interface EditTagContainerProps {
  tag: TagDTO;
}

export const EditTagContainer: FC<EditTagContainerProps> = ({ tag }) => {
  const { mutate: editTag } = useEditTag();
  const { openToast } = useToast();

  const onSubmit = (data: EditTagDTO) => {
    editTag(
      { tag: data, id: tag.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          openToast({
            variant: "success",
            message: "Tag updated successfully",
          });
        },
        onError: (error) => {
          openToast({
            variant: "danger",
            message: error?.message,
          });
        },
      },
    );
  };
  return <EditTagForm onSubmit={onSubmit} tag={tag} />;
};
