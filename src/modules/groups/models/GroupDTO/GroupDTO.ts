import { NoteDTO } from "../../../notes/models/NoteDTO/NoteDTO";
import { TagDTO } from "../../../tags/models/TagDTO/TagDTO";
import { UserDTO } from "../../../users/models/UserDTO/UserDTO";

export interface GroupDTO {
  id: string;
  title: string;
  notes?: NoteDTO[];
  tags?: TagDTO[];
  user: UserDTO;
}
