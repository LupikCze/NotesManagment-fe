import { createRoute } from "@tanstack/react-router";

import { CreateGroupPage } from "../../../../modules/groups/pages/CreateGroupPage/CreateGroupPage";
import { EditGroupPage } from "../../../../modules/groups/pages/EditGroupPage/EditGroupPage";
import { GroupDetailPage } from "../../../../modules/groups/pages/GroupDetailPage/GroupDetailPage";
import { GroupsPage } from "../../../../modules/groups/pages/GroupsPage/GroupsPage";
import { links } from "../../links";
import { rootRoute } from "../../router";

export const groupsRoute = createRoute({
  path: links.groups(),
  getParentRoute: () => rootRoute,
  component: GroupsPage,
});

export const groupRoute = createRoute({
  path: links.groupDetail(),
  getParentRoute: () => rootRoute,
  component: GroupDetailPage,
});

export const createGroupRoute = createRoute({
  path: links.createGroup(),
  getParentRoute: () => rootRoute,
  component: CreateGroupPage,
});

export const editGroupRoute = createRoute({
  path: links.editGroup(),
  getParentRoute: () => rootRoute,
  component: EditGroupPage,
});
