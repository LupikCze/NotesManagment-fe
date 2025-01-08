import { FC } from "react";

import { queryClient } from "../../../../common/config/queryClient/queryClient";
import { useToast } from "../../../../common/hooks/useToast/useToast";
import { links } from "../../../../common/router/links";
import { router } from "../../../../common/router/router";
import { TagDetail } from "../../components/TagDetail/TagDetail";
import { useDeleteTag } from "../../hooks/mutations/useDeleteTag/useDeleteTag";
import { TagDTO } from "../../models/TagDTO/TagDTO";

interface TagDetailContainerProps {
  tag: TagDTO;
}

export const TagDetailContainer: FC<TagDetailContainerProps> = ({ tag }) => {
  const { mutate: deleteTag } = useDeleteTag();
  const { openToast } = useToast();

  const handleDeleteTag = () => {
    deleteTag(tag.id, {
      onSuccess: () => {
        openToast({
          message: "Tag deleted successfully",
          variant: "success",
        });
        queryClient.invalidateQueries();
        router.navigate({ to: links.tags() });
      },
      onError: (error) => {
        openToast({ message: error.message, variant: "danger" });
      },
    });
  };
  return <TagDetail handleDeleteTag={handleDeleteTag} tag={tag} />;
};
