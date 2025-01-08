import { createRoute } from "@tanstack/react-router";

import { LoginPage } from "../../../../modules/auth/pages/LoginPage/LoginPage";
import { RegisterPage } from "../../../../modules/auth/pages/RegisterPage/RegisterPage";
import { links } from "../../links";
import { rootRoute } from "../../router";

export const registerRoute = createRoute({
  path: links.register(),
  getParentRoute: () => rootRoute,
  component: RegisterPage,
});

export const loginRoute = createRoute({
  path: links.login(),
  getParentRoute: () => rootRoute,
  component: LoginPage,
});
