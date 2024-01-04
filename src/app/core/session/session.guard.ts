import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { SessionService } from "./session.service";

@Injectable()
export class SessionGuard implements CanActivate, CanLoad {
    constructor(public session: SessionService, public router: Router) { }

    private can(): boolean {
        const me = this;
        if (!this.session.isActive()) {
            me.session.redirectToLoginPage();
            return false;
        }
        return true;
    }

    canActivate(): boolean {
        return this.can();
    }

    canLoad(): boolean {
        return this.can();
    }
}