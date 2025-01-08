import { FC } from "react";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { EditNoteForm } from "../../forms/EditNoteForm/EditNoteForm";
import { useEditNote } from "../../hooks/mutations/useEditNote/useEditNote";
import { EditNoteDTO } from "../../models/EditNoteDTO/EditNoteDTO";
import { NoteDTO } from "../../models/NoteDTO/NoteDTO";

interface EditNoteContainerProps {
  note: NoteDTO;
}

export const EditNoteContainer: FC<EditNoteContainerProps> = ({ note }) => {
  const { mutate: editNote } = useEditNote();
  const { openToast } = useToast();

  const onSubmit = (data: EditNoteDTO) => {
    editNote(
      { note: data, id: note.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          openToast({
            variant: "success",
            message: "Note updated successfully",
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
  return <EditNoteForm onSubmit={onSubmit} note={note} />;
};
