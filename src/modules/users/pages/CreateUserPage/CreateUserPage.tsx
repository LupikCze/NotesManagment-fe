import { Breadcrumb } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { CreateUserContainer } from "../../containers/CreateUserContainer/CreateUserContainer";

export const CreateUserPage = () => {
  return (
    <AdminAccessPermission>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.users()}>
          <b>Users</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active href={links.createUser()}>
          <b>Create user</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <CreateUserContainer />
    </AdminAccessPermission>
  );
};
