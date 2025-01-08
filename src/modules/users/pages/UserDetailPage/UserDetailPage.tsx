import { useParams } from "@tanstack/react-router";
import { Breadcrumb } from "react-bootstrap";

import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { UserDetailContainer } from "../../containers/UserDetailContainer/UserDetailContainer";
import { useGetUserById } from "../../hooks/queries/useGetUserById/useGetUserById";

export const UserDetailPage = () => {
  const params = useParams({ from: links.userDetail() });
  const { openToast } = useToast();
  const { data: user, isError, isLoading, error } = useGetUserById(params.id);

  if (isError) {
    openToast({
      variant: "danger",
      message: error?.message,
    });
  }
  if (!user) {
    if (!isLoading)
      openToast({
        variant: "danger",
        message: "User not found",
      });

    return null;
  }

  return (
    <>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.users()}>
          <b>Users</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active href={links.users()}>
          <b>{user.username}</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <UserDetailContainer user={user} />
    </>
  );
};
