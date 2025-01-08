import { Breadcrumb } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { TagsTableContainer } from "../../containers/TagsTableContainer/TagsTableContainer";

export const TagsPage = () => {
  return (
    <>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} active href={links.tags()}>
          <b>Tags</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <TagsTableContainer />
    </>
  );
};
