import { createRoute } from "@tanstack/react-router";

import { CreateNotePage } from "../../../../modules/notes/pages/CreateNotePage/CreateNotePage";
import { EditNotePage } from "../../../../modules/notes/pages/EditNotePage/EditNotePage";
import { NoteDetailPage } from "../../../../modules/notes/pages/NoteDetailPage/NoteDetailPage";
import { NotesPage } from "../../../../modules/notes/pages/NotesPage/NotesPage";
import { links } from "../../links";
import { rootRoute } from "../../router";

export const notesRoute = createRoute({
  path: links.notes(),
  getParentRoute: () => rootRoute,
  component: NotesPage,
});

export const noteRoute = createRoute({
  path: links.noteDetail(),
  getParentRoute: () => rootRoute,
  component: NoteDetailPage,
});

export const createNoteRoute = createRoute({
  path: links.createNote(),
  getParentRoute: () => rootRoute,
  component: CreateNotePage,
});
export const editNoteRoute = createRoute({
  path: links.editNote(),
  getParentRoute: () => rootRoute,
  component: EditNotePage,
});
