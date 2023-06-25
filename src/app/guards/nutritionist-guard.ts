import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserDataService } from '../service/user-data.service';

@Injectable()
export class NutritionistGuard implements CanActivate {
  constructor(private userDataService: UserDataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userDataService.getUserData().pipe(
      map(userData => {
        const role = userData?.role.name;
        console.log('ROL:', role);

        if (role === 'NUTRICIONISTA') {
          return true;
        } else {
          console.log('NUTRICIONISTA NO AUTORIZADO');
          return false;
        }
      })
    );
  }
}
