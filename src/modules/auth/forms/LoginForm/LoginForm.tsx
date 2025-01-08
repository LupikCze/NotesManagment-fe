import { FC } from "react";

import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { AuthenticationRequest } from "../../models/AuthenticationRequest/AuthenticationRequest";

interface LoginFormProps {
  onSubmit: (data: AuthenticationRequest) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationRequest>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
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

      <Form.Group className="mb-3" controlId="formBasicPassword">
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
      <div className={"d-flex justify-content-center"}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};
