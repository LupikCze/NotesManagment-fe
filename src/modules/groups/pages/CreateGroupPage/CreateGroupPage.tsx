import { Breadcrumb } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { CreateGroupContainer } from "../../containers/CreateGroupContainer/CreateGroupContainer";

export const CreateGroupPage = () => {
  return (
    <AdminAccessPermission>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.groups()}>
          <b>Groups</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active href={links.createGroup()}>
          <b>Create group</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <CreateGroupContainer />
    </AdminAccessPermission>
  );
};
