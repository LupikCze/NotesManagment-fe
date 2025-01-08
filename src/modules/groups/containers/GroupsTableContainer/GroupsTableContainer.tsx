import { useToast } from "../../../../common/hooks/useToast/useToast";
import { Role } from "../../../../common/models/Role/Role";
import { useGetCurrentUser } from "../../../users/hooks/queries/useGetCurrentUser/useGetCurrentUser";
import { GroupsTable } from "../../components/GroupsTable/GroupsTable";
import { useGetGroups } from "../../hooks/queries/useGetGroups/useGetGroups";

export const GroupsTableContainer = () => {
  const { data: groups, error, isLoading, isError } = useGetGroups();
  const { data: currentUser } = useGetCurrentUser();
  const { openToast } = useToast();

  if (isError || !groups) {
    if (!isLoading)
      openToast({
        variant: "danger",
        message: error ? error.message : "Couldnt fetch groups",
      });
    return null;
  }

  return (
    <GroupsTable
      groups={groups}
      userIsAdmin={currentUser ? currentUser.role == Role.ADMIN : false}
    />
  );
};
