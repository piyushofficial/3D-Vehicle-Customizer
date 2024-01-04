import { Store } from "src/app/core/store/store";
import { Role, RoleAccounts, Roles } from "./roles.model";

export class RolesLoadingState extends Store.AbstractLoadingState<Roles> {}
export class RolesLoadingErrorState extends Store.AbstractErrorState<Roles> {}
export class RolesLoadedState extends Store.AbstractIdealState<Roles> {}


export class CreateRoleLoadingState extends Store.AbstractLoadingState<Roles>{}
export class CreateRoleLoadingErrorState extends Store.AbstractErrorState<Roles> {}
export class CreateRoleLoadedState extends Store.AbstractIdealState<Roles> {}

export class EditRoleLoadingState extends Store.AbstractLoadingState<Roles>{}
export class EditRoleLoadingErrorState extends Store.AbstractErrorState<Roles> {}
export class EditRoleLoadedState extends Store.AbstractIdealState<Roles> {}

export class RemoveRoleLoadingState extends Store.AbstractLoadingState<Roles>{}
export class RemoveRoleLoadingErrorState extends Store.AbstractErrorState<Roles> {}
export class RemoveRoleLoadedState extends Store.AbstractIdealState<Roles> {}




export class RoleAccountLoadingState extends Store.AbstractLoadingState<RoleAccounts[]> {}
export class RoleAccountLoadingErrorState extends Store.AbstractErrorState<RoleAccounts[]> {}
export class RoleAccountLoadedState extends Store.AbstractIdealState<RoleAccounts[]> {}

export class CreateRoleAccountLoadingState extends Store.AbstractLoadingState<RoleAccounts> {}
export class CreateRoleAccountLoadingErrorState extends Store.AbstractErrorState<RoleAccounts> {}
export class CreateRoleAccountLoadedState extends Store.AbstractIdealState<RoleAccounts> {}

export class RemoveRoleAccountLoadingState extends Store.AbstractLoadingState<RoleAccounts> {}
export class RemoveRoleAccountLoadingErrorState extends Store.AbstractErrorState<RoleAccounts> {}
export class RemoveRoleAccountLoadedState extends Store.AbstractIdealState<RoleAccounts> {}

export class GetRoleLoadingState extends Store.AbstractLoadingState<Role> {}
export class GetRoleLoadingErrorState extends Store.AbstractErrorState<Role> {}
export class GetRoleLoadedState extends Store.AbstractIdealState<Role> {}

