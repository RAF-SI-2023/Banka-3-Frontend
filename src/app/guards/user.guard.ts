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
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return !("role" in payload);
     // ako nema atribut role, znaci da je user ulogovan ( vraca true )
    }

    this.router.navigate(['user-login']);
    return false;
  }
}
