import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { UserDataService } from 'src/app/service/user-data.service';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  username: string;
  lastname: string;
  role: string;

  constructor(private udS: UserDataService) {}

  ngOnInit(): void {
    this.getUserData();
    this.screenWidth = window.innerWidth;
  }

  getUserData() {
    this.udS.getUserData().subscribe(
      (data: any) => {
        this.username = data.name;
        this.lastname = data.lastname;
        this.role = data.role.name;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  showComponent(data: any): boolean {
    if (!this.role) {
      return false; // Si no se ha obtenido el rol del usuario, no mostrar el elemento
    }

    if (this.role === 'ADMINISTRADOR') {
      if (data.routeLink === 'gyms') {
        return true; // Mostrar elementos para el rol de administrador con los routeLink permitidos
      }
    } else if (this.role === 'ENTRENADOR') {
      if (data.routeLink === 'gyms' || data.routeLink === 'clients') {
        return true; // Mostrar elementos para el rol de entrenador con el routeLink permitido
      }
    } else if (this.role === 'NUTRICIONISTA') {
      if (data.routeLink === 'gyms' || data.routeLink === 'clients') {
        return true; // Mostrar elementos para el rol de nutricionista con el routeLink permitido
      }
    }

    return false;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
