import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.scss'],
})
export class GymComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {
  }
}
