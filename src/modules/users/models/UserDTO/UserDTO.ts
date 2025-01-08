import { Role } from "../../../../common/models/Role/Role";

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
}
