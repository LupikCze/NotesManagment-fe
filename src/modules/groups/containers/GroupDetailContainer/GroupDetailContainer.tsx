import { FC } from "react";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import { useGetNotes } from "../../../notes/hooks/queries/useGetNotes/useGetNotes";
import { useGetUnusedTags } from "../../../tags/hooks/queries/useGetUnusedTags/useGetUnusedTags";
import { GroupDetail } from "../../components/GroupDetail/GroupDetail";
import { useAddNoteToGroup } from "../../hooks/mutations/useAddNoteToGroup/useAddNoteToGroup";
import { useAddTagToGroup } from "../../hooks/mutations/useAddTagToGroup/useAddTagToGroup";
import { useDeleteGroup } from "../../hooks/mutations/useDeleteGroup/useDeleteGroup";
import { useRemoveNoteFromGroup } from "../../hooks/mutations/useRemoveNoteFromGroup/useRemoveNoteFromGroup";
import { useRemoveTagFromGroup } from "../../hooks/mutations/useRemoveTagFromGroup/useRemoveTagFromGroup";
import { GroupDTO } from "../../models/GroupDTO/GroupDTO";

interface GroupDetailContainerProps {
  group: GroupDTO;
}

export const GroupDetailContainer: FC<GroupDetailContainerProps> = ({
  group,
}) => {
  const { data: tags } = useGetUnusedTags();
  const { data: notes } = useGetNotes();
  const { mutate: addTag } = useAddTagToGroup();
  const { mutate: removeTag } = useRemoveTagFromGroup();
  const { mutate: removeNote } = useRemoveNoteFromGroup();
  const { mutate: addNote } = useAddNoteToGroup();
  const { mutate: deleteGroup } = useDeleteGroup();
  const { openToast } = useToast();

  const handleAddTag = (tagId: string) => {
    addTag(
      { groupId: group.id, tagId },
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
      { groupId: group.id, tagId },
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

  const handleAddNote = (noteId: string) => {
    addNote(
      { groupId: group.id, noteId },
      {
        onSuccess: () => {
          openToast({
            message: "Note added successfully",
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

  const handleRemoveNote = (noteId: string) => {
    removeNote(
      { groupId: group.id, noteId },
      {
        onSuccess: () => {
          openToast({
            message: "Note removed successfully",
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

  const handleDeleteGroup = () => {
    deleteGroup(group.id, {
      onSuccess: () => {
        openToast({
          message: "Group deleted successfully",
          variant: "success",
        });
        queryClient.invalidateQueries();
        router.navigate({ to: links.groups() });
      },
      onError: (error) => {
        openToast({ message: error.message, variant: "danger" });
      },
    });
  };
  return (
    <GroupDetail
      handleDeleteGroup={handleDeleteGroup}
      handleRemoveNote={handleRemoveNote}
      handleAddNote={handleAddNote}
      notes={notes}
      group={group}
      tags={tags}
      handleAddTag={handleAddTag}
      handleRemoveTag={handleRemoveTag}
    />
  );
};
