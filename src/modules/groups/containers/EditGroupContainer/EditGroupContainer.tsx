import { FC } from "react";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { EditGroupForm } from "../../forms/EditGroupForm/EditGroupForm";
import { useEditGroup } from "../../hooks/mutations/useEditGroup/useEditGroup";
import { EditGroupDTO } from "../../models/EditGroupDTO/EditGroupDTO";
import { GroupDTO } from "../../models/GroupDTO/GroupDTO";

interface EditGroupContainerProps {
  group: GroupDTO;
}

export const EditGroupContainer: FC<EditGroupContainerProps> = ({ group }) => {
  const { mutate: editGroup } = useEditGroup();
  const { openToast } = useToast();

  const onSubmit = (data: EditGroupDTO) => {
    editGroup(
      { group: data, id: group.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          openToast({
            variant: "success",
            message: "Group updated successfully",
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
  return <EditGroupForm onSubmit={onSubmit} group={group} />;
};
