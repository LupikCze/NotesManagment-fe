import { useParams } from "@tanstack/react-router";
import { Breadcrumb } from "react-bootstrap";

import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { TagDetailContainer } from "../../containers/TagDetailContainer/TagDetailContainer";
import { useGetTagById } from "../../hooks/queries/useGetTagById/useGetTagById";

export const TagDetailPage = () => {
  const params = useParams({ from: links.tagDetail() });
  const { openToast } = useToast();
  const { data: tag, isError, isLoading, error } = useGetTagById(params.id);

  if (isError) {
    openToast({
      variant: "danger",
      message: error?.message,
    });
  }
  if (!tag) {
    if (!isLoading)
      openToast({
        variant: "danger",
        message: "Tag not found",
      });

    return null;
  }

  return (
    <>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.tags()}>
          <b>Tags</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active>
          <b>{tag.title}</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <TagDetailContainer tag={tag} />
    </>
  );
};
