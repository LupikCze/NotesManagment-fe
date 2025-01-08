import { useParams } from "@tanstack/react-router";
import { Breadcrumb } from "react-bootstrap";

import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { EditNoteContainer } from "../../container/EditNoteContainer/EditNoteContainer";
import { useGetNoteById } from "../../hooks/queries/useGetNoteById/useGetNoteById";

export const EditNotePage = () => {
  const params = useParams({ from: links.editNote() });
  const { openToast } = useToast();
  const { data: note, isError, isLoading, error } = useGetNoteById(params.id);

  if (isError) {
    openToast({
      variant: "danger",
      message: error?.message,
    });
  }
  if (!note) {
    if (!isLoading)
      openToast({
        variant: "danger",
        message: "Note not found",
      });

    return null;
  }
  return (
    <AdminAccessPermission>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.notes()}>
          <b>Notes</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className={"d-flex"}
          href={links.noteDetail(params.id)}
        >
          <b>{note.title}</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active>
          <b>Edit</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <EditNoteContainer note={note} />
    </AdminAccessPermission>
  );
};
