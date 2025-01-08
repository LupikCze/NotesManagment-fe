import { useParams } from "@tanstack/react-router";
import { Breadcrumb } from "react-bootstrap";

import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { NoteDetailContainer } from "../../container/NoteDetailContainer/NoteDetailContainer";
import { useGetNoteById } from "../../hooks/queries/useGetNoteById/useGetNoteById";

export const NoteDetailPage = () => {
  const params = useParams({ from: links.noteDetail() });
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
    <>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.notes()}>
          <b>Notes</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active>
          <b>{note.title}</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <NoteDetailContainer note={note} />
    </>
  );
};
