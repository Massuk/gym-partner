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
  currentTime: Date;
  userItems = userItems;

  constructor(private loginService: LoginService, private router: Router) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
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

  handleMenuItemClick(item: any): void {
    if (item.label === 'Cerrar sesión') {
      sessionStorage.clear();
      this.router.navigate(['/auth/login']);
    }
  }

}
