import { Link, Navigate } from "@tanstack/react-router";
import { Col, Container, Row } from "react-bootstrap";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import { CreateUserDTO } from "../../../users/models/CreateUserDTO/CreateUserDTO";
import { RegisterForm } from "../../forms/RegisterForm/RegisterForm";
import { useRegister } from "../../hooks/mutations/useRegister/useRegister";
import { useAuth } from "../../hooks/utils/useAuth/useAuth";

export const RegisterContainer = () => {
  const { isAuthenticated } = useAuth();
  const { openToast } = useToast();
  const { mutate: register } = useRegister();

  const onSubmit = (user: CreateUserDTO) => {
    register(user, {
      onSuccess: () => {
        router.navigate({ to: links.login() });
        queryClient.invalidateQueries();
        openToast({ message: "Registration successful", variant: "success" });
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
          <h3 className={"mb-3 d-flex justify-content-center"}>Register</h3>
          <RegisterForm onSubmit={onSubmit} />
        </Col>
        <Link className={"d-flex justify-content-center"} to={links.login()}>
          Login
        </Link>
      </Row>
    </Container>
  );
};
