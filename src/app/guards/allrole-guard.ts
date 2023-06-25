import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserDataService } from '../service/user-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AllRoleGuard implements CanActivate {
  constructor(private userDataService: UserDataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userDataService.getUserData().pipe(
      map(userData => {
        const role = userData?.role.name;
        console.log('User role:', role);

        if (role === 'ADMINISTRADOR' || role === 'NUTRICIONISTA' || role === 'ENTRENADOR') {
          return true; // Permite el acceso a la ruta si el rol es ADMINISTRADOR, NUTRITIONIST o TRAINER
        } else {
          console.log('ROL NO AUTORIZADO');
          return false;
        }
      })
    );
  }
}

