import { useToast } from "../../../../common/hooks/useToast/useToast";
import { Role } from "../../../../common/models/Role/Role";
import { useGetCurrentUser } from "../../../users/hooks/queries/useGetCurrentUser/useGetCurrentUser";
import { TagsTable } from "../../components/TagsTable/TagsTable";
import { useGetTags } from "../../hooks/queries/useGetTags/useGetTags";

export const TagsTableContainer = () => {
  const { data: tags, error, isLoading, isError } = useGetTags();
  const { data: currentUser } = useGetCurrentUser();
  const { openToast } = useToast();

  if (isError || !tags) {
    if (!isLoading)
      openToast({
        variant: "danger",
        message: error ? error.message : "Couldnt fetch tags",
      });
    return null;
  }

  return (
    <TagsTable
      tags={tags}
      userIsAdmin={currentUser ? currentUser.role == Role.ADMIN : false}
    />
  );
};
