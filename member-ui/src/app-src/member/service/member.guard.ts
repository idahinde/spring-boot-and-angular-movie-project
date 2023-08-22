import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({providedIn: "any"})
export class MemberGuard implements CanActivate {

  constructor(private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const jwt: any = sessionStorage.getItem("member.user.fullname");
    if (jwt) {
      return true;
    }
    return this._router.navigate(["/member", "login"]);
  }

}
