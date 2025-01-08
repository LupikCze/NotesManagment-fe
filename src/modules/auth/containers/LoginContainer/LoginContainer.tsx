import { Link, Navigate } from "@tanstack/react-router";
import { Col, Container, Row } from "react-bootstrap";

import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { LoginForm } from "../../forms/LoginForm/LoginForm";
import { useLogin } from "../../hooks/mutations/useLogin/useLogin";
import { useAuth } from "../../hooks/utils/useAuth/useAuth";
import { AuthenticationRequest } from "../../models/AuthenticationRequest/AuthenticationRequest";

export const LoginContainer = () => {
  const { isAuthenticated } = useAuth();
  const { openToast } = useToast();

  const { mutate: login } = useLogin();

  const onSubmit = (data: AuthenticationRequest) => {
    login(data, {
      onSuccess: () => {
        openToast({ message: "Login successful", variant: "success" });
      },
      onError: (error) => {
        openToast({ message: error.message, variant: "danger" });
      },
    });
  };

  if (isAuthenticated()) {
    return <Navigate to={links.users()} />;
  }
  return (
    <Container className="d-flex justify-content-center mt-4">
      <Row>
        <Col className={"p-4 shadow rounded bg-white"}>
          <h3 className={"mb-3 d-flex justify-content-center"}>Login</h3>
          <LoginForm onSubmit={onSubmit} />
        </Col>
        <Link
          className={"d-flex justify-content-center mt-2"}
          to={links.register()}
        >
          Register
        </Link>
      </Row>
    </Container>
  );
};
