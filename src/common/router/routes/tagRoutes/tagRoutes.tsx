import { createRoute } from "@tanstack/react-router";

import { CreateTagPage } from "../../../../modules/tags/pages/CreateTagPage/CreateTagPage";
import { EditTagPage } from "../../../../modules/tags/pages/EditTagPage/EditTagPage";
import { TagDetailPage } from "../../../../modules/tags/pages/TagDetailPage/TagDetailPage";
import { TagsPage } from "../../../../modules/tags/pages/TagsPage/TagsPage";
import { links } from "../../links";
import { rootRoute } from "../../router";

export const tagsRoute = createRoute({
  path: links.tags(),
  getParentRoute: () => rootRoute,
  component: TagsPage,
});

export const tagRoute = createRoute({
  path: links.tagDetail(),
  getParentRoute: () => rootRoute,
  component: TagDetailPage,
});

export const createTagRoute = createRoute({
  path: links.createTag(),
  getParentRoute: () => rootRoute,
  component: CreateTagPage,
});

export const editTagRoute = createRoute({
  path: links.editTag(),
  getParentRoute: () => rootRoute,
  component: EditTagPage,
});
