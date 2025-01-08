import { GroupDTO } from "../../../groups/models/GroupDTO/GroupDTO";
import { TagDTO } from "../../../tags/models/TagDTO/TagDTO";
import { UserDTO } from "../../../users/models/UserDTO/UserDTO";

export interface NoteDTO {
  id: string;
  title: string;
  content: string;
  user?: UserDTO;
  group?: GroupDTO;
  tags?: TagDTO[];
}
