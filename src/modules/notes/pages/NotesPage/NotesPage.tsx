import { Breadcrumb } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { NotesTableContainer } from "../../container/NotesTableContainer/NotesTableContainer";

export const NotesPage = () => {
  return (
    <>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} active href={links.notes()}>
          <b>Notes</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <NotesTableContainer />
    </>
  );
};
