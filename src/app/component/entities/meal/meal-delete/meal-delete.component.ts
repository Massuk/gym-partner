import { Component } from '@angular/core';

@Component({
  selector: 'app-meal-delete',
  templateUrl: './meal-delete.component.html',
  styleUrls: ['./meal-delete.component.scss']
})
export class MealDeleteComponent {
  mealId: number = 0;

  constructor(
  ) { }

  ngOnInit() {
  }
}
