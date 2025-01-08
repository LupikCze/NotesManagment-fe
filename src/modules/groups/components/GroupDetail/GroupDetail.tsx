import { FC, useState } from "react";

import {
  Badge,
  Button,
  Card,
  Modal,
  Stack,
  Tab,
  Tabs,
  Form,
} from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import close from "../../../../resources/icons/close_24dp_BB271A_FILL0_wght400_GRAD0_opsz24.svg";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { NoteDTO } from "../../../notes/models/NoteDTO/NoteDTO";
import { TagDTO } from "../../../tags/models/TagDTO/TagDTO";
import { GroupDTO } from "../../models/GroupDTO/GroupDTO";

interface GroupDetailProps {
  group: GroupDTO;
  tags: TagDTO[] | undefined;
  notes: NoteDTO[] | undefined;
  handleAddNote: (noteId: string) => void;
  handleRemoveNote: (noteId: string) => void;
  handleAddTag: (tagId: string) => void;
  handleRemoveTag: (tagId: string) => void;
  handleDeleteGroup: () => void;
}

export const GroupDetail: FC<GroupDetailProps> = ({
  group,
  tags,
  notes,
  handleAddTag,
  handleRemoveTag,
  handleAddNote,
  handleRemoveNote,
  handleDeleteGroup,
}) => {
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [tagToAdd, setTagToAdd] = useState<string>("");
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteToAdd, setNoteToAdd] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  return (
    <Card
      className={"p-2"}
      style={{ backgroundColor: "#e5e5e5", maxWidth: "1000px" }}
    >
      <Stack>
        <div className={"d-flex justify-content-between flex-wrap"}>
          <h2>
            <b>{group.title}</b>
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
                    to: links.editGroup(group.id),
                    from: links.groupDetail(group.id),
                  })
                }
              >
                Edit group
              </Button>
            </AdminAccessPermission>
            <AdminAccessPermission>
              <Button
                style={{ minWidth: "130px" }}
                variant={"danger"}
                onClick={() => {
                  if (deleteConfirmation) handleDeleteGroup();
                  else setDeleteConfirmation(true);
                }}
              >
                {deleteConfirmation ? "Are you sure?" : "Delete group"}
              </Button>
            </AdminAccessPermission>
          </div>
        </div>
        <div className={"d-flex flex-wrap"} style={{ gap: 5 }}>
          {group.tags?.map((tag) => (
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
        {group.user && (
          <h4 className={"mt-4"}>Owner: {group.user?.username}</h4>
        )}
        <div>
          <Tabs className={"mt-3"} defaultActiveKey="notes">
            <Tab title="Notes" eventKey="notes">
              <div className={"d-flex mt-2 justify-content-between flex-wrap"}>
                <div className={"w-50 flex-column"}>
                  {group.notes?.map((note) => (
                    <div
                      key={note.id}
                      className={"d-flex"}
                      style={{ gap: "10px" }}
                    >
                      <h5>
                        <a href={links.noteDetail(note.id)}>{note.title}</a>
                      </h5>
                      <AdminAccessPermission>
                        <img
                          src={close}
                          height={"70%"}
                          alt="close"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveNote(note.id)}
                        />
                      </AdminAccessPermission>
                    </div>
                  ))}
                </div>
                <AdminAccessPermission>
                  <Button
                    style={{ minWidth: "110px" }}
                    onClick={() => setShowNoteDialog(true)}
                  >
                    Add note
                  </Button>
                </AdminAccessPermission>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Stack>
      <Modal show={showTagDialog} onHide={() => setShowTagDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add tag to {group.title}</Modal.Title>
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
      <Modal show={showNoteDialog} onHide={() => setShowNoteDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add note to {group.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectGroup">
            <Form.Label>Select a note:</Form.Label>
            <Form.Select
              value={noteToAdd}
              onChange={(e) => setNoteToAdd(e.target.value)}
            >
              <option value="" disabled>
                -- Select a note --
              </option>
              {notes?.map((note) => (
                <option key={note.id} value={note.id}>
                  {note.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNoteDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (noteToAdd) handleAddNote(noteToAdd);
              setShowNoteDialog(false);
            }}
            disabled={!noteToAdd}
          >
            Add note
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};
