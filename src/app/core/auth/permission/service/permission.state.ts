import { Store } from "src/app/core/store/store";
import { Permissions } from "./permission.model";

export class PermissionLoadingState extends Store.AbstractLoadingState<Permissions> {}
export class PermissionLoadingErrorState extends Store.AbstractErrorState<Permissions> {}
export class PermissionLoadedState extends Store.AbstractIdealState<Permissions> {}

export class CreatePermissionLoadingState extends Store.AbstractLoadingState<Permissions> {}
export class CreatePermissionLoadingErrorState extends Store.AbstractErrorState<Permissions> {}
export class CreatePermissionLoadedState extends Store.AbstractIdealState<Permissions> {}

export class EditPermissionLoadingState extends Store.AbstractLoadingState<Permissions> {}
export class EditPermissionLoadingErrorState extends Store.AbstractErrorState<Permissions> {}
export class EditPermissionLoadedState extends Store.AbstractIdealState<Permissions> {}

export class RemovePermissionLoadingState extends Store.AbstractLoadingState<Permissions> {}
export class RemovePermissionLoadingErrorState extends Store.AbstractErrorState<Permissions> {}
export class RemovePermissionLoadedState extends Store.AbstractIdealState<Permissions> {}
