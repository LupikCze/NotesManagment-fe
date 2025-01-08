import { GroupDTO } from "../../../groups/models/GroupDTO/GroupDTO";
import { NoteDTO } from "../../../notes/models/NoteDTO/NoteDTO";
import { TagDTO } from "../../../tags/models/TagDTO/TagDTO";
import { UserDTO } from "../UserDTO/UserDTO";

export interface User extends UserDTO {
  tags: TagDTO[];
  groups: GroupDTO[];
  notes: NoteDTO[];
}
