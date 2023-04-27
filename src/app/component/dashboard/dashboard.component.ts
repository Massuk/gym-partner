import { Component, OnInit } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
ngOnInit(): void {
}

title = 'sidenav';

isSideNavCollapsed = false;
screenWidth = 0;

onToggleSideNav(data: SideNavToggle): void {
  this.screenWidth = data.screenWidth;
  this.isSideNavCollapsed = data.collapsed;
}
}
