import { useToast } from "../../../../common/hooks/useToast/useToast";
import { Role } from "../../../../common/models/Role/Role";
import { useGetCurrentUser } from "../../../users/hooks/queries/useGetCurrentUser/useGetCurrentUser";
import { NotesTable } from "../../components/NotesTable/NotesTable";
import { useGetNotes } from "../../hooks/queries/useGetNotes/useGetNotes";

export const NotesTableContainer = () => {
  const { data: notes, error, isLoading, isError } = useGetNotes();
  const { data: currentUser } = useGetCurrentUser();
  const { openToast } = useToast();

  if (isError || !notes) {
    if (!isLoading)
      openToast({
        variant: "danger",
        message: error ? error.message : "Couldnt fetch notes",
      });
    return null;
  }

  return (
    <NotesTable
      notes={notes}
      userIsAdmin={currentUser ? currentUser.role == Role.ADMIN : false}
    />
  );
};
