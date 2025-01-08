import { useParams } from "@tanstack/react-router";
import { Breadcrumb } from "react-bootstrap";

import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { EditUserContainer } from "../../containers/EditUserContainer/EditUserContainer";
import { useGetUserById } from "../../hooks/queries/useGetUserById/useGetUserById";

export const EditUserPage = () => {
  const params = useParams({ from: links.editUser() });
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
    <AdminAccessPermission>
      <Breadcrumb className={"d-flex"} style={{ fontSize: "30px" }}>
        <Breadcrumb.Item className={"d-flex"} href={links.users()}>
          <b>Users</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className={"d-flex"}
          href={links.userDetail(params.id)}
        >
          <b>{user.username}</b>
        </Breadcrumb.Item>
        <Breadcrumb.Item className={"d-flex"} active>
          <b>Edit</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <EditUserContainer user={user} />
    </AdminAccessPermission>
  );
};
