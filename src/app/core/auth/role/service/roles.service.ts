import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Store } from "src/app/core/store/store";
import { environment } from "src/environments/environment";
import { Role, RoleRequest, Roles } from "./roles.model";
import {
  CreateRoleLoadedState,
  CreateRoleLoadingErrorState,
  CreateRoleLoadingState,
  EditRoleLoadedState,
  EditRoleLoadingErrorState,
  EditRoleLoadingState,
  GetRoleLoadedState,
  GetRoleLoadingErrorState,
  RemoveRoleAccountLoadedState,
  RemoveRoleAccountLoadingErrorState,
  RemoveRoleAccountLoadingState,
  RemoveRoleLoadedState,
  RemoveRoleLoadingErrorState,
  RemoveRoleLoadingState,
  RoleAccountLoadedState,
  RoleAccountLoadingErrorState,
  RoleAccountLoadingState,
  RolesLoadedState,
  RolesLoadingErrorState,
  RolesLoadingState,
} from "./roles.state";

@Injectable({
  providedIn: "root",
})
export class RolesService extends Store.AbstractService {
  loadRoleList(payload: RoleRequest, groupId): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new RolesLoadingState());
    }, 0);

    /// DEV CODE ----------------->

    // setTimeout(() => {
    //   output.next(new RolesLoadedState(ROLE_DATA));
    //   output.complete();
    // }, 2000);

    // setTimeout(() => {
    //   output.error(new RolesLoadingErrorState(new Error()));
    // }, 2000);

    /// <----------------- DEV CODE

    const path = me.controller.replaceVariables(
      environment.api.admin.org.group.role.list.endpoint,
      { groupId: groupId }
    );

    me.controller
      .post(path, payload, undefined, { Authorization: true })
      .subscribe(
        (data: Roles) => {
          output.next(new RolesLoadedState(data));
          output.complete();
        },
        (e: any) => {
          output.error(new RolesLoadingErrorState(e));
          output.complete();

          me.logger.error("Role Page Loading failed", e);
        }
      );

    return output;
  }

  createRole(createRolePayload: any, groupId): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new CreateRoleLoadingState());
    }, 0);

    /// DEV CODE ----------------->

    // setTimeout(() => {
    //   output.next(new CreateRoleLoadedState(ROLE_DATA));
    //   output.complete();
    // }, 2000);

    const path = me.controller.replaceVariables(
      environment.api.admin.org.group.role.create.endpoint,
      { groupId: groupId }
    );
    me.controller
      .post(path, createRolePayload, undefined, { Authorization: true })
      .subscribe(
        (data: Roles) => {
          output.next(new CreateRoleLoadedState(data));
          output.complete();
        },
        (e: any) => {
          output.error(new CreateRoleLoadingErrorState(e));
          output.complete();

          me.logger.error("New Role Entry failed", e);
        }
      );

    return output;
  }

  editRole(editRolePayload: any, groupId): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new EditRoleLoadingState());
    }, 0);

    /// DEV CODE ----------------->

    // setTimeout(() => {
    //   output.next(new EditRoleLoadedState(ROLE_DATA));
    //   output.complete();
    // }, 2000);

    const path = me.controller.replaceVariables(
      environment.api.admin.org.group.role.update.endpoint,
      { roleId: editRolePayload.id, groupId: groupId }
    );
    me.controller
      .post(path, editRolePayload, undefined, { Authorization: true })
      .subscribe(
        (data: Roles) => {
          output.next(new EditRoleLoadedState(data));
          output.complete();
        },
        (e: any) => {
          output.error(new EditRoleLoadingErrorState(e));
          output.complete();

          me.logger.error("Update Role Entry failed", e);
        }
      );

    return output;
  }

  removeRole(removeRoleId: any, groupId): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    /// <----------------- DEV CODE

    setTimeout(() => {
      output.next(new RemoveRoleLoadingState());
    }, 0);

    const path = me.controller.replaceVariables(
      environment.api.admin.org.group.role.remove.endpoint,
      { roleId: removeRoleId, groupId: groupId }
    );

    me.controller.get(path, null, undefined, { Authorization: true }).subscribe(
      (data: any) => {
        output.next(new RemoveRoleLoadedState(data));
        output.complete();
      },
      (e: any) => {
        output.error(new RemoveRoleLoadingErrorState(e));
        output.complete();

        me.logger.error("Role Id not Found", e);
      }
    );

    return output;
  }

  loadRoleAccountList(payload, roleId, groupId): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new RoleAccountLoadingState());
    }, 0);

    const path = me.controller.replaceVariables(
      environment.api.admin.org.group.role.accountsByRoleAndGroup.list.endpoint,
      { groupId: groupId, roleId: roleId }
    );

    me.controller
      .post(path, payload, undefined, { Authorization: true })
      .subscribe(
        (data: any) => {
          output.next(new RoleAccountLoadedState(data));
          output.complete();
        },
        (e: any) => {
          output.error(new RoleAccountLoadingErrorState(e));
          output.complete();

          me.logger.error("Role Account Page Loading failed", e);
        }
      );

    return output;
  }

  createRoleAccount(createRolePayload: any): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new CreateRoleLoadingState());
    }, 0);

    /// DEV CODE ----------------->

    // setTimeout(() => {
    //   output.next(new CreateRoleLoadedState(ROLE_DATA));
    //   output.complete();
    // }, 2000);

    const path = environment.api.admin.role.create.endpoint;
    me.controller
      .post(path, createRolePayload, undefined, { Authorization: true })
      .subscribe(
        (data: any) => {
          output.next(new CreateRoleLoadedState(data));
          output.complete();
        },
        (e: any) => {
          output.error(new CreateRoleLoadingErrorState(e));
          output.complete();

          me.logger.error("New Role Entry failed", e);
        }
      );

    return output;
  }

  removeRoleAccount(removeRoleId: any, accountId?): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    /// <----------------- DEV CODE

    setTimeout(() => {
      output.next(new RemoveRoleAccountLoadingState());
    }, 0);

    const path = me.controller.replaceVariables(
      environment.api.admin.account.role.remove.endpoint,
      { roleId: removeRoleId, accountId: accountId }
    );

    me.controller.get(path, null, undefined, { Authorization: true }).subscribe(
      (data: any) => {
        output.next(new RemoveRoleAccountLoadedState(data));
        output.complete();
      },
      (e: any) => {
        output.error(new RemoveRoleAccountLoadingErrorState(e));
        output.complete();

        me.logger.error("Role Id not Found", e);
      }
    );

    return output;
  }

  getRole(groupId: number, roleId: number) {
    const me = this;
    const output = new Subject<Store.State>();

    const path = me.controller.replaceVariables(
      environment.api.admin.org.group.role.getRole.endpoint,
      { roleId: String(roleId), groupId: String(groupId) }
    );

    me.controller.get(path, null, undefined, { Authorization: true }).subscribe(
      (data: Role) => {
        output.next(new GetRoleLoadedState(data));
        output.complete();
      },
      (e: any) => {
        output.error(new GetRoleLoadingErrorState(e));
        output.complete();

        me.logger.error("Role not Found", e);
      }
    );

    return output;
  }
}
