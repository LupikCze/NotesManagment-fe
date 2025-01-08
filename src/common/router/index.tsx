import { FunctionComponent } from "react";

import { RouterProvider } from "@tanstack/react-router";

import { router } from "./router";

export const Router: FunctionComponent = () => (
  <RouterProvider router={router} />
);
