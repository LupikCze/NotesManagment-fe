import { Breadcrumb } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { GroupsTableContainer } from "../../containers/GroupsTableContainer/GroupsTableContainer";

export const GroupsPage = () => {
  return (
    <>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} active href={links.groups()}>
          <b>Groups</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <GroupsTableContainer />
    </>
  );
};
