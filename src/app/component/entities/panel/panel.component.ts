import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  innerWidth: any;

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])

  onResize(event:any) {
    this.innerWidth= window.innerWidth;
  }

  getClass(){
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }

}
