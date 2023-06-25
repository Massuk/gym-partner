import { Component, HostListener, Input, OnInit } from '@angular/core';
import { userItems } from './header-dummy-data';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;

  userItems = userItems;

  constructor(private loginService: LoginService, private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

  logout(): void {
    this.loginService.logout().subscribe(
      () => {
        this.router.navigate(['/auth/login']);
        console.log('Sesión cerrada exitosamente');
      },
      (error) => {
        // Manejo de errores en caso de que ocurra algún problema al cerrar sesión
        console.error('Error al cerrar sesión', error);
      }
    );
  }

}
