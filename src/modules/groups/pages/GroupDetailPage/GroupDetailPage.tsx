import { useParams } from "@tanstack/react-router";
import { Breadcrumb } from "react-bootstrap";

import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { GroupDetailContainer } from "../../containers/GroupDetailContainer/GroupDetailContainer";
import { useGetGroupById } from "../../hooks/queries/useGetGroupById/useGetGroupById";

export const GroupDetailPage = () => {
  const params = useParams({ from: links.groupDetail() });
  const { openToast } = useToast();
  const { data: group, isError, isLoading, error } = useGetGroupById(params.id);

  if (isError) {
    openToast({
      variant: "danger",
      message: error?.message,
    });
  }
  if (!group) {
    if (!isLoading)
      openToast({
        variant: "danger",
        message: "Group not found",
      });

    return null;
  }

  return (
    <>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.groups()}>
          <b>Groups</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active>
          <b>{group.title}</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <GroupDetailContainer group={group} />
    </>
  );
};
