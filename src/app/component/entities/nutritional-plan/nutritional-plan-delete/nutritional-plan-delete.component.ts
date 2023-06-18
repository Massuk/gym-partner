import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';

@Component({
  selector: 'app-nutritional-plan-delete',
  templateUrl: './nutritional-plan-delete.component.html',
  styleUrls: ['./nutritional-plan-delete.component.scss'],
})
export class NutritionalPlanDeleteComponent {
  constructor(
  ) {}

  ngOnInit() {
  }
}
