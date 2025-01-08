import { FC } from "react";

import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

import { Role } from "../../../../common/models/Role/Role";
import { EditUserDTO } from "../../models/EditUserDTO/EditUserDTO";
import { UserDTO } from "../../models/UserDTO/UserDTO";

interface EditUserFormProps {
  onSubmit: (data: EditUserDTO) => void;
  user: UserDTO;
}

export const EditUserForm: FC<EditUserFormProps> = ({ onSubmit, user }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditUserDTO>({ defaultValues: user });

  return (
    <Container className={"w-50"}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3" style={{ gap: "20px" }}>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="formFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                {...register("firstname", {
                  required: "First name is required",
                })}
                isInvalid={!!errors.firstname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstname?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                {...register("lastname", { required: "Last name is required" })}
                isInvalid={!!errors.lastname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastname?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ gap: "20px" }}>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                {...register("username", { required: "Username is required" })}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ gap: "20px" }}>
          <Col>
            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Controller
                name="role"
                control={control}
                defaultValue={Role.USER}
                render={({ field }) => (
                  <div>
                    {Object.values(Role).map((role) => (
                      <Form.Check
                        {...field}
                        key={role}
                        type="radio"
                        label={role}
                        value={role}
                        id={`role-${role}`}
                        className="mb-2"
                        inline
                        checked={field.value === role}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    ))}
                  </div>
                )}
              />
              {errors.role && (
                <div className="text-danger">{errors.role.message}</div>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className={"mt-2"}>
          <Col className={"d-flex justify-content-center"}>
            <Button
              variant="primary"
              type="submit"
              style={{ minWidth: "120px" }}
            >
              Edit User
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
