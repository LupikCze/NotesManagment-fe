import { FC } from "react";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { EditUserForm } from "../../forms/EditUserForm/EditUserForm";
import { useEditUser } from "../../hooks/mutations/useEditUser/useEditUser";
import { EditUserDTO } from "../../models/EditUserDTO/EditUserDTO";
import { UserDTO } from "../../models/UserDTO/UserDTO";

interface EditUserContainerProps {
  user: UserDTO;
}

export const EditUserContainer: FC<EditUserContainerProps> = ({ user }) => {
  const { mutate: editUser } = useEditUser();
  const { openToast } = useToast();

  const onSubmit = (data: EditUserDTO) => {
    editUser(
      { user: data, id: user.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          openToast({
            variant: "success",
            message: "User updated successfully",
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
  return <EditUserForm onSubmit={onSubmit} user={user} />;
};
