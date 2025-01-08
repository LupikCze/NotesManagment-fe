import { Breadcrumb } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { UsersTableContainer } from "../../containers/UsersTableContainer/UsersTableContainer";

export const UsersPage = () => {
  return (
    <>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} active href={links.users()}>
          <b>Users</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <UsersTableContainer />
    </>
  );
};
