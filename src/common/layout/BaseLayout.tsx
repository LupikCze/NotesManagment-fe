import { Outlet, useLocation } from "@tanstack/react-router";

import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { links } from "../router/links";

export const BaseLayout = () => {
  const { pathname } = useLocation();
  const isAuth = pathname == links.register() || pathname == links.login();
  return (
    <>
      {isAuth ? (
        <Outlet />
      ) : (
        <>
          <NavigationBar />
          <div className={"p-3"}>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};
