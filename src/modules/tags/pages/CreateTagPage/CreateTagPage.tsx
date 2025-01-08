import { Breadcrumb } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { CreateTagContainer } from "../../containers/CreateTagContainer/CreateTagContainer";

export const CreateTagPage = () => {
  return (
    <AdminAccessPermission>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.tags()}>
          <b>Tags</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active href={links.createTag()}>
          <b>Create tag</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <CreateTagContainer />
    </AdminAccessPermission>
  );
};
