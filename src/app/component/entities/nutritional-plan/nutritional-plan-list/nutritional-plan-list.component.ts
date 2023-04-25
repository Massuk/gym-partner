import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NutritionalPlan } from 'src/app/model/nutritionalPlan';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';

@Component({
  selector: 'app-nutritional-plan-list',
  templateUrl: './nutritional-plan-list.component.html',
  styleUrls: ['./nutritional-plan-list.component.scss'],
})
export class NutritionalPlanListComponent implements OnInit {
  lista: NutritionalPlan[] = [];
  dataSource: MatTableDataSource<NutritionalPlan> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'titleNutritionalPlan',
    'statusNutritionalPlan',
    'objectiveNutritionalPlan',
    'descriptionNutritionalPlan',
    'startDateNutritionalPlan',
    'endDateNutritionalPlan',
    'recommendationsNutritionalPlan',
    'edit',
  ];
  constructor(private pNP: NutritionalPlanService) {
    this.pNP.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngOnInit(): void {
    this.pNP.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.pNP.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  filter(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }
}
