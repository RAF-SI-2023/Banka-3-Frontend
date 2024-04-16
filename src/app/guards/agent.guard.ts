import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {parseJson} from "@angular/cli/src/utilities/json-file";
@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const hasRole = "role" in payload;
      if (hasRole && payload.role === 'ROLE_AGENT' || payload.role === 'ROLE_ADMIN' || payload.role === 'ROLE_SUPERVISOR') {
        return true;
      }
    }

    return false;
  }
}
