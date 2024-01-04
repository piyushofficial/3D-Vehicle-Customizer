
import { Permission } from "../../permission/service/permission.model";


export interface Role {
  id?: string;
  name?: string;
  code?: string;
  permissions?: RolePermission[];

}

export interface RolePermission {
  id?: number;
  originalStatus: string;
  status: string;
  permission?: Permission;
}



