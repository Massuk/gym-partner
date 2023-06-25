import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserDataService } from '../service/user-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorPageComponent } from 'src/app/component/dashboard/error-page/error-page.component';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userDataService: UserDataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userDataService.getUserData().pipe(
      map(userData => {
        const role = userData?.role.name;
        console.log('ROL:', role);

        if (role === 'ADMINISTRADOR') {
          return true;
        } else {
          console.log('ADMINISTRADOR NO AUTORIZADO');
          this.router.navigate(['/401']);
          return false;
        }
      })
    );
  }
}
