import { FC } from "react";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import { useGetGroups } from "../../../groups/hooks/queries/useGetGroups/useGetGroups";
import { useGetNotes } from "../../../notes/hooks/queries/useGetNotes/useGetNotes";
import { useGetUnusedTags } from "../../../tags/hooks/queries/useGetUnusedTags/useGetUnusedTags";
import { UserDetail } from "../../components/UserDetail/UserDetail";
import { useAddGroupToUser } from "../../hooks/mutations/useAddGroupToUser/useAddGroupToUser";
import { useAddNoteToUser } from "../../hooks/mutations/useAddNoteToUser/useAddNoteToUser";
import { useAddTagToUser } from "../../hooks/mutations/useAddTagToUser/useAddTagToUser";
import { useDeleteUser } from "../../hooks/mutations/useDeleteUser/useDeleteUser";
import { useRemoveGroupFromUser } from "../../hooks/mutations/useRemoveGroupFromUser/useRemoveGroupFromUser";
import { useRemoveNoteFromUser } from "../../hooks/mutations/useRemoveNoteFromUser/useRemoveNoteFromUser";
import { useRemoveTagFromUser } from "../../hooks/mutations/useRemoveTagFromUser/useRemoveTagFromUser";
import { User } from "../../models/User/User";

interface UserDetailContainerProps {
  user: User;
}

export const UserDetailContainer: FC<UserDetailContainerProps> = ({ user }) => {
  const { data: tags } = useGetUnusedTags();
  const { data: notes } = useGetNotes();
  const { data: groups } = useGetGroups();
  const { mutate: addTag } = useAddTagToUser();
  const { mutate: removeTag } = useRemoveTagFromUser();
  const { mutate: addGroup } = useAddGroupToUser();
  const { mutate: removeNote } = useRemoveNoteFromUser();
  const { mutate: removeGroup } = useRemoveGroupFromUser();
  const { mutate: addNote } = useAddNoteToUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { openToast } = useToast();

  const handleAddTag = (tagId: string) => {
    addTag(
      { userId: user.id, tagId },
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
      { userId: user.id, tagId },
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
  const handleAddGroup = (groupId: string) => {
    addGroup(
      { userId: user.id, groupId },
      {
        onSuccess: () => {
          openToast({
            message: "Group added successfully",
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

  const handleRemoveGroup = (groupId: string) => {
    removeGroup(
      { userId: user.id, groupId },
      {
        onSuccess: () => {
          openToast({
            message: "Group removed successfully",
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
      { userId: user.id, noteId },
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
      { userId: user.id, noteId },
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

  const handleDeleteUser = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        openToast({
          message: "User deleted successfully",
          variant: "success",
        });
        queryClient.invalidateQueries();
        router.navigate({ to: links.users() });
      },
      onError: (error) => {
        openToast({ message: error.message, variant: "danger" });
      },
    });
  };
  return (
    <UserDetail
      groups={groups}
      handleDeleteUser={handleDeleteUser}
      handleRemoveGroup={handleRemoveGroup}
      handleRemoveNote={handleRemoveNote}
      handleAddNote={handleAddNote}
      notes={notes}
      user={user}
      tags={tags}
      handleAddTag={handleAddTag}
      handleRemoveTag={handleRemoveTag}
      handleAddGroup={handleAddGroup}
    />
  );
};
