import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  innerWidth: any;
  constructor(public route: ActivatedRoute) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  getClass() {
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }
}
