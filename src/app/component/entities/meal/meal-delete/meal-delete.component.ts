import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-meal-delete',
  templateUrl: './meal-delete.component.html',
  styleUrls: ['./meal-delete.component.scss']
})
export class MealDeleteComponent {

  routineId: number = 0;

  constructor(
  ) { }

  ngOnInit() {
  }

}
