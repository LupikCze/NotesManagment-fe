import { UserDTO } from "../../../users/models/UserDTO/UserDTO";

export interface TagDTO {
  id: string;
  title: string;
  user?: UserDTO;
}
