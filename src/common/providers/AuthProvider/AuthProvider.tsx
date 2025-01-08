import { FC, ReactNode } from "react";

import { useAuth } from "../../../modules/auth/hooks/utils/useAuth/useAuth";
import { links } from "../../router/links";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const pathname = window.location.pathname;

  const isAuthSite =
    pathname === links.register() || pathname === links.login();

  if (!isAuthenticated() && !isAuthSite) {
    window.location.href = links.login();
    return null;
  }

  return <>{children}</>;
};
