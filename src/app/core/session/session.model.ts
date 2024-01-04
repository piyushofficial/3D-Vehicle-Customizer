
import { Role, RolePermission } from "../auth/role/service/roles.model";


export type SessionPermissionMap = { [key: string]: RolePermission };
export type SessionPermissions = { [key: string]: SessionPermissionMap };

export interface Session {
    token: string;
    id: string;
    expiry: Date;
}

export interface AuthTokenResponse {
    token: string;
}

export interface LogoutResponse {
    status: string;
    data:any
}

export interface SessionAccount {
    id?: number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    initials?: string;
    userName?: string;
    designation?: string;
    type?: string;
    email?: string;
    roles?: Role[];
    permissions?: SessionPermissions;

}

export interface LoginCredentials {
    username: string;
    password: string
}


