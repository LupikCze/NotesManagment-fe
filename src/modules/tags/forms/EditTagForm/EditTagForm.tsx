import { FC } from "react";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { EditTagDTO } from "../../models/EditTagDTO/EditTagDTO";
import { TagDTO } from "../../models/TagDTO/TagDTO";

interface EditTagFormProps {
  onSubmit: (data: EditTagDTO) => void;
  tag: TagDTO;
}

export const EditTagForm: FC<EditTagFormProps> = ({ onSubmit, tag }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTagDTO>({ defaultValues: tag });

  return (
    <Container className={"w-50"}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3" style={{ gap: "20px" }}>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title", {
                  required: "Title is required",
                })}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col
            md={3}
            lg={3}
            className={"d-flex justify-content-center align-items-end"}
          >
            <Button
              variant="primary"
              type="submit"
              style={{ minWidth: "130px", height: "38px" }}
            >
              Edit Tag
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
