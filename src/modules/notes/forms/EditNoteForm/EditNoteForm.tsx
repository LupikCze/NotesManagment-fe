import { FC } from "react";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { CreateNoteDTO } from "../../models/CreateNoteDTO/CreateNoteDTO";
import { EditNoteDTO } from "../../models/EditNoteDTO/EditNoteDTO";
import { NoteDTO } from "../../models/NoteDTO/NoteDTO";

interface EditNoteFormProps {
  onSubmit: (data: EditNoteDTO) => void;
  note: NoteDTO;
}

export const EditNoteForm: FC<EditNoteFormProps> = ({ onSubmit, note }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteDTO>({ defaultValues: note });

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
          <Col>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter content"
                {...register("content", {
                  required: "Content is required",
                })}
                isInvalid={!!errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className={"d-flex justify-content-center"}>
            <Button
              variant="primary"
              type="submit"
              style={{ minWidth: "130px", height: "38px" }}
            >
              Edit Note
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
