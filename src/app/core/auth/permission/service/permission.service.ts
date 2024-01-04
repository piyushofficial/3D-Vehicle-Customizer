import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Store } from "src/app/core/store/store";
import { ListPayload } from "src/app/shared/table/table.model";
import { environment } from "src/environments/environment";
import { Permissions } from "./permission.model";
import {
  CreatePermissionLoadedState,
  CreatePermissionLoadingErrorState,
  CreatePermissionLoadingState,
  EditPermissionLoadedState,
  EditPermissionLoadingErrorState,
  EditPermissionLoadingState,
  PermissionLoadedState,
  PermissionLoadingErrorState,
  PermissionLoadingState,
  RemovePermissionLoadedState,
  RemovePermissionLoadingErrorState,
  RemovePermissionLoadingState,
} from "./permission.state";

@Injectable({
  providedIn: "root",
})
export class PermissionService extends Store.AbstractService {
  loadPermissionList(payload: ListPayload): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new PermissionLoadingState());
    }, 0);

    /// DEV CODE ----------------->

    // setTimeout(() => {
    //   output.next(new PermissionLoadedState(PERMISSION_DATA));
    //   output.complete();
    // }, 2000);

    // setTimeout(() => {
    //   output.error(new PermissionLoadingErrorState(new Error()));
    // }, 2000);

    /// <----------------- DEV CODE

    const path = environment.api.admin.permission.list.endpoint;

    me.controller
      .post(path, payload, undefined, { Authorization: true })
      .subscribe(
        (data: Permissions) => {
          output.next(new PermissionLoadedState(data));
          output.complete();
        },
        (e: any) => {
          output.error(new PermissionLoadingErrorState(e));
          output.complete();

          me.logger.error("Permissions Page Loading failed", e);
        }
      );

    return output;
  }

  createPermission(createPermissionPayload: any): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new CreatePermissionLoadingState());
    }, 0);

    const path = environment.api.admin.permission.create.endpoint;

    me.controller
      .post(path, createPermissionPayload, undefined, { Authorization: true })
      .subscribe(
        (data: any) => {
          output.next(new CreatePermissionLoadedState(data));
          output.complete();
        },
        (e: any) => {
          output.error(new CreatePermissionLoadingErrorState(e));
          output.complete();

          me.logger.error("Create Permission failed", e);
        }
      );

    return output;
  }

  editPermission(editPermissionPayload: any): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new EditPermissionLoadingState());
    }, 0);

    const path = me.controller.replaceVariables(
      environment.api.admin.permission.update.endpoint,
      { permissionId: editPermissionPayload.id }
    );
    me.controller
      .post(path, editPermissionPayload, undefined, { Authorization: true })
      .subscribe(
        (data: Permissions) => {
          output.next(new EditPermissionLoadedState(data));
          output.complete();
        },
        (e: any) => {
          output.error(new EditPermissionLoadingErrorState(e));
          output.complete();

          me.logger.error("Permission Page Loading failed", e);
        }
      );

    return output;
  }

  removePermission(removePermissionPayload: any): Observable<Store.State> {
    const me = this;
    const output = new Subject<Store.State>();

    setTimeout(() => {
      output.next(new RemovePermissionLoadingState());
    }, 0);

    const path = me.controller.replaceVariables(
      environment.api.admin.permission.remove.endpoint,
      { permissionId: removePermissionPayload }
    );
    me.controller.get(path, null, undefined, { Authorization: true }).subscribe(
      (data: any) => {
        output.next(new RemovePermissionLoadedState(data));
        output.complete();
      },
      (e: any) => {
        output.error(new RemovePermissionLoadingErrorState(e));
        output.complete();

        me.logger.error("Remove Permission failed", e);
      }
    );

    return output;
  }

  getPermissionList(payload: ListPayload) {
    const me = this;
    const output = new Subject<any>();
    const path = environment.api.admin.permission.list.endpoint;
    me.controller
      .post(path, payload, undefined, { Authorization: true })
      .subscribe((data: Permissions) => {
        output.next(me.modifyJson(data.content));
        output.complete();
      });

    return output;
  }

  modifyJson(jsonData): any[] {
    const obj = [];
    if (jsonData?.length) {
      jsonData.forEach((v) => {
        obj.push({ value: v, label: v?.label ? v.label : v.activity });
      });
    }
    return obj;
  }
}
