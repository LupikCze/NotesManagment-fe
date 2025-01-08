import { FC } from "react";

import { Button, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Role } from "../../../../common/models/Role/Role";
import { CreateUserDTO } from "../../../users/models/CreateUserDTO/CreateUserDTO";

interface RegisterFormProps {
  onSubmit: (data: CreateUserDTO) => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDTO>();
  register("role", { value: Role.USER });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <Form.Text className="text-danger">
                <div>{errors.username.message?.toString()}</div>
              </Form.Text>
            )}
          </Form.Group>
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <Form.Text className="text-danger">
                <div>{errors.email.message?.toString()}</div>
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              {...register("firstname", { required: "First name is required" })}
            />
            {errors.firstname && (
              <Form.Text className="text-danger">
                <div>{errors.firstname.message?.toString()}</div>
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <Form.Text className="text-danger">
                <div>{errors.lastname.message?.toString()}</div>
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={3} />
        <Col xs={12} md={6} className="mb-3">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <Form.Text className="text-danger">
                <div>{errors.password.message?.toString()}</div>
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <div className={"d-flex justify-content-center"}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};
