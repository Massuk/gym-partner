import { Component, OnInit } from '@angular/core';
import { GymReportComponent } from '../../gym/gym-report/gym-report.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';
import { CaloriesByNutritionalPlan } from 'src/app/model/report';

@Component({
  selector: 'app-nutritional-plan-report',
  templateUrl: './nutritional-plan-report.component.html',
  styleUrls: ['./nutritional-plan-report.component.scss'],
})
export class NutritionalPlanReportComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GymReportComponent>,
    private nPS: NutritionalPlanService
  ){}

  totalCaloriesByNutritionalPlan: CaloriesByNutritionalPlan[];

  ngOnInit(): void {
    this.nPS.getCaloriesCount().subscribe((data) => {
      this.totalCaloriesByNutritionalPlan = data;
    });

  }

}
