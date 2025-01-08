import {
  createRootRoute,
  createRouter,
  Navigate,
} from "@tanstack/react-router";

import { links } from "./links";
import { loginRoute, registerRoute } from "./routes/authRoutes/authRoutes";
import {
  createGroupRoute,
  editGroupRoute,
  groupRoute,
  groupsRoute,
} from "./routes/groupRoutes/groupRoutes";
import {
  createNoteRoute,
  editNoteRoute,
  noteRoute,
  notesRoute,
} from "./routes/noteRoutes/noteRoutes";
import {
  createTagRoute,
  editTagRoute,
  tagRoute,
  tagsRoute,
} from "./routes/tagRoutes/tagRoutes";
import {
  createUserRoute,
  editUserRoute,
  userRoute,
  usersRoute,
} from "./routes/userRoutes/userRoutes";
import { EnvVariableName, getEnvVariable } from "../config/env/getEnvVariable";
import { BaseLayout } from "../layout/BaseLayout";

export const rootRoute = createRootRoute({
  component: BaseLayout,
  errorComponent: (e) => <div>{e.error.message}</div>,
  notFoundComponent: () => <Navigate to={links.login()} />,
});

export const router = createRouter({
  ...(getEnvVariable(EnvVariableName.PUBLIC_URL, undefined, false) !== ""
    ? { basepath: getEnvVariable(EnvVariableName.PUBLIC_URL) }
    : null),
  routeTree: rootRoute.addChildren([
    usersRoute,
    userRoute,
    groupsRoute,
    groupRoute,
    notesRoute,
    noteRoute,
    tagsRoute,
    tagRoute,
    loginRoute,
    registerRoute,
    createNoteRoute,
    createTagRoute,
    createGroupRoute,
    createUserRoute,
    editNoteRoute,
    editTagRoute,
    editGroupRoute,
    editUserRoute,
  ]),
});
