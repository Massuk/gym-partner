import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nutritional-plan',
  templateUrl: './nutritional-plan.component.html',
  styleUrls: ['./nutritional-plan.component.scss'],
})
export class NutritionalPlanComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
