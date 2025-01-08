import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { CreateUserForm } from "../../forms/CreateUserForm/CreateUserForm";
import { useCreateUser } from "../../hooks/mutations/useCreateUser/useCreateUser";
import { CreateUserDTO } from "../../models/CreateUserDTO/CreateUserDTO";

export const CreateUserContainer = () => {
  const { mutate: createUser } = useCreateUser();
  const { openToast } = useToast();
  const handleSubmit = (data: CreateUserDTO) => {
    createUser(data, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        openToast({
          variant: "success",
          message: "User created",
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
  return <CreateUserForm onSubmit={handleSubmit} />;
};
