import { FC, useState } from "react";

import { Button, Card, Stack } from "react-bootstrap";

import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import { AdminAccessPermission } from "../../../auth/components/AdminAccessPermission/AdminAccessPermission";
import { TagDTO } from "../../models/TagDTO/TagDTO";

interface TagDetailProps {
  tag: TagDTO;
  handleDeleteTag: () => void;
}

export const TagDetail: FC<TagDetailProps> = ({ tag, handleDeleteTag }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  return (
    <Card
      className={"p-2"}
      style={{ backgroundColor: "#e5e5e5", maxWidth: "1000px" }}
    >
      <Stack>
        <div className={"d-flex justify-content-between flex-wrap"}>
          <h2>
            <b>{tag.title}</b>
          </h2>
          <div className={"d-flex flex-wrap"} style={{ gap: 5 }}>
            <AdminAccessPermission>
              <Button
                style={{ minWidth: "100px" }}
                variant={"secondary"}
                onClick={() =>
                  router.navigate({
                    to: links.editTag(tag.id),
                    from: links.tagDetail(tag.id),
                  })
                }
              >
                Edit tag
              </Button>
            </AdminAccessPermission>
            <AdminAccessPermission>
              <Button
                style={{ minWidth: "130px" }}
                variant={"danger"}
                onClick={() => {
                  if (deleteConfirmation) handleDeleteTag();
                  else setDeleteConfirmation(true);
                }}
              >
                {deleteConfirmation ? "Are you sure?" : "Delete tag"}
              </Button>
            </AdminAccessPermission>
          </div>
        </div>
      </Stack>
    </Card>
  );
};
