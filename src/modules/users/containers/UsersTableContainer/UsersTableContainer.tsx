import { useToast } from "../../../../common/hooks/useToast/useToast";
import { Role } from "../../../../common/models/Role/Role";
import { UsersTable } from "../../components/UsersTable/UsersTable";
import { useGetCurrentUser } from "../../hooks/queries/useGetCurrentUser/useGetCurrentUser";
import { useGetUsers } from "../../hooks/queries/useGetUsers/useGetUsers";

export const UsersTableContainer = () => {
  const { data: users, error, isLoading, isError } = useGetUsers();
  const { data: currentUser } = useGetCurrentUser();
  const { openToast } = useToast();

  if (isError || !users) {
    if (!isLoading)
      openToast({
        variant: "danger",
        message: error ? error.message : "Couldnt fetch users",
      });
    return null;
  }

  return (
    <UsersTable
      users={users}
      userIsAdmin={currentUser ? currentUser.role == Role.ADMIN : false}
    />
  );
};
