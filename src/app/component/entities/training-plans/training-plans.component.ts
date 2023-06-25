import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  styleUrls: ['./training-plans.component.scss']
})
export class TrainingPlansComponent implements OnInit {

  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
