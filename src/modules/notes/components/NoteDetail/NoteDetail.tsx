import { FC, useState } from "react";

import { Badge, Button, Card, Modal, Stack, Form } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import close from "../../../../resources/icons/close_24dp_BB271A_FILL0_wght400_GRAD0_opsz24.svg";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { TagDTO } from "../../../tags/models/TagDTO/TagDTO";
import { NoteDTO } from "../../models/NoteDTO/NoteDTO";

interface NoteDetailProps {
  note: NoteDTO;
  tags: TagDTO[] | undefined;
  handleAddTag: (tagId: string) => void;
  handleDeleteNote: () => void;
  handleRemoveTag: (tagId: string) => void;
}

export const NoteDetail: FC<NoteDetailProps> = ({
  note,
  tags,
  handleAddTag,
  handleDeleteNote,
  handleRemoveTag,
}) => {
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [tagToAdd, setTagToAdd] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  return (
    <Card
      className={"p-2"}
      style={{ backgroundColor: "#e5e5e5", maxWidth: "1000px" }}
    >
      <Stack>
        <div className={"d-flex justify-content-between flex-wrap"}>
          <h2>
            <b>{note.title}</b>
          </h2>
          <div className={"d-flex flex-wrap"} style={{ gap: 5 }}>
            <AdminAccessPermission>
              <Button
                style={{ minWidth: "100px" }}
                onClick={() => setShowTagDialog(true)}
              >
                Add tag
              </Button>
            </AdminAccessPermission>
            <AdminAccessPermission>
              <Button
                style={{ minWidth: "100px" }}
                variant={"secondary"}
                onClick={() =>
                  router.navigate({
                    to: links.editNote(note.id),
                    from: links.noteDetail(note.id),
                  })
                }
              >
                Edit note
              </Button>
            </AdminAccessPermission>
            <AdminAccessPermission>
              <Button
                style={{ minWidth: "130px" }}
                variant={"danger"}
                onClick={() => {
                  if (deleteConfirmation) handleDeleteNote();
                  else setDeleteConfirmation(true);
                }}
              >
                {deleteConfirmation ? "Are you sure?" : "Delete note"}
              </Button>
            </AdminAccessPermission>
          </div>
        </div>
        <div className={"d-flex flex-wrap"} style={{ gap: 5 }}>
          {note.tags?.map((tag) => (
            <div key={tag.id} className={"d-flex align-items-center"}>
              <Badge
                key={tag.id}
                className={"px-3 py-1"}
                text={"white"}
                pill
                style={{ width: "auto" }}
              >
                #{tag.title}
              </Badge>
              <AdminAccessPermission>
                <img
                  src={close}
                  height={"100%"}
                  alt="close"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveTag(tag.id)}
                />
              </AdminAccessPermission>
            </div>
          ))}
        </div>
        <h4 className={"mt-4"}>{note.content}</h4>
      </Stack>
      <Modal show={showTagDialog} onHide={() => setShowTagDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add tag to {note.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectTag">
            <Form.Label>Select a tag:</Form.Label>
            <Form.Select
              value={tagToAdd}
              onChange={(e) => setTagToAdd(e.target.value)}
            >
              <option value="" disabled>
                -- Select a tag --
              </option>
              {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTagDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (tagToAdd) handleAddTag(tagToAdd);
              setShowTagDialog(false);
            }}
            disabled={!tagToAdd}
          >
            Add tag
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};
