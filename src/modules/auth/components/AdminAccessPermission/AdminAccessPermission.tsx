import { FC, ReactNode } from "react";

import { useGetCurrentUser } from "../../../users/hooks/queries/useGetCurrentUser/useGetCurrentUser";

interface AdminAccessPermissionProps {
  children: ReactNode;
}

export const AdminAccessPermission: FC<AdminAccessPermissionProps> = ({
  children,
}) => {
  const { data: currentUser } = useGetCurrentUser();
  if (currentUser?.role !== "ADMIN") {
    return null;
  }
  return <div>{children}</div>;
};
