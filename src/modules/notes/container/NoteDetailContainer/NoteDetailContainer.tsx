import { FC } from "react";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import { useGetUnusedTags } from "../../../tags/hooks/queries/useGetUnusedTags/useGetUnusedTags";
import { NoteDetail } from "../../components/NoteDetail/NoteDetail";
import { useAddTagToNote } from "../../hooks/mutations/useAddTagToNote/useAddTagToNote";
import { useDeleteNote } from "../../hooks/mutations/useDeleteNote/useDeleteNote";
import { useRemoveTagFromNote } from "../../hooks/mutations/useRemoveTagFromNote/useRemoveTagFromNote";
import { NoteDTO } from "../../models/NoteDTO/NoteDTO";

interface NoteDetailContainerProps {
  note: NoteDTO;
}

export const NoteDetailContainer: FC<NoteDetailContainerProps> = ({ note }) => {
  const { data: tags } = useGetUnusedTags();
  const { mutate: addTag } = useAddTagToNote();
  const { mutate: removeTag } = useRemoveTagFromNote();
  const { mutate: deleteNote } = useDeleteNote();
  const { openToast } = useToast();

  const handleAddTag = (tagId: string) => {
    addTag(
      { noteId: note.id, tagId },
      {
        onSuccess: () => {
          openToast({ message: "Tag added successfully", variant: "success" });
          queryClient.invalidateQueries();
        },
        onError: (error) => {
          openToast({ message: error.message, variant: "danger" });
        },
      },
    );
  };

  const handleRemoveTag = (tagId: string) => {
    removeTag(
      { noteId: note.id, tagId },
      {
        onSuccess: () => {
          openToast({
            message: "Tag removed successfully",
            variant: "success",
          });
          queryClient.invalidateQueries();
        },
        onError: (error) => {
          openToast({ message: error.message, variant: "danger" });
        },
      },
    );
  };

  const handleDeleteNote = () => {
    deleteNote(note.id, {
      onSuccess: () => {
        openToast({
          message: "Note deleted successfully",
          variant: "success",
        });
        queryClient.invalidateQueries();
        router.navigate({ to: links.notes() });
      },
      onError: (error) => {
        openToast({ message: error.message, variant: "danger" });
      },
    });
  };
  return (
    <NoteDetail
      handleDeleteNote={handleDeleteNote}
      note={note}
      tags={tags}
      handleAddTag={handleAddTag}
      handleRemoveTag={handleRemoveTag}
    />
  );
};
