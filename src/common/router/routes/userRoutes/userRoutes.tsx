import { createRoute } from "@tanstack/react-router";

import { CreateUserPage } from "../../../../modules/users/pages/CreateUserPage/CreateUserPage";
import { EditUserPage } from "../../../../modules/users/pages/EditUserPage/EditUserPage";
import { UserDetailPage } from "../../../../modules/users/pages/UserDetailPage/UserDetailPage";
import { UsersPage } from "../../../../modules/users/pages/UsersPage/UsersPage";
import { links } from "../../links";
import { rootRoute } from "../../router";

export const usersRoute = createRoute({
  path: links.users(),
  getParentRoute: () => rootRoute,
  component: UsersPage,
});

export const userRoute = createRoute({
  path: links.userDetail(),
  getParentRoute: () => rootRoute,
  component: UserDetailPage,
});

export const createUserRoute = createRoute({
  path: links.createUser(),
  getParentRoute: () => rootRoute,
  component: CreateUserPage,
});

export const editUserRoute = createRoute({
  path: links.editUser(),
  getParentRoute: () => rootRoute,
  component: EditUserPage,
});
