import { Breadcrumb } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { CreateNoteContainer } from "../../container/CreateNoteContainer/CreateNoteContainer";

export const CreateNotePage = () => {
  return (
    <AdminAccessPermission>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.notes()}>
          <b>Notes</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active href={links.createNote()}>
          <b>Create note</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <CreateNoteContainer />
    </AdminAccessPermission>
  );
};
