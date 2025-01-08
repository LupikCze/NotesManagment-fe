export const links = {
  users: () => "/users",
  editUser: (id: string | undefined = undefined) =>
    id !== undefined ? `/users/${id}/edit` : "/users/$id/edit",
  editNote: (id: string | undefined = undefined) =>
    id !== undefined ? `/notes/${id}/edit` : "/notes/$id/edit",
  editGroup: (id: string | undefined = undefined) =>
    id !== undefined ? `/groups/${id}/edit` : "/groups/$id/edit",
  editTag: (id: string | undefined = undefined) =>
    id !== undefined ? `/tags/${id}/edit` : "/tags/$id/edit",
  createUser: () => "/create-user",
  createGroup: () => "/create-group",
  createNote: () => "/create-note",
  createTag: () => "/create-tag",
  userDetail: (id: string | undefined = undefined) =>
    id !== undefined ? `/users/${id}` : "/users/$id",
  groups: () => "/groups",
  groupDetail: (id: string | undefined = undefined) =>
    id !== undefined ? `/groups/${id}` : "/groups/$id",
  notes: () => "/notes",
  noteDetail: (id: string | undefined = undefined) =>
    id !== undefined ? `/notes/${id}` : "/notes/$id",
  tags: () => "/tags",
  tagDetail: (id: string | undefined = undefined) =>
    id !== undefined ? `/tags/${id}` : "/tags/$id",
  register: () => "/register",
  login: () => "/login",
};
