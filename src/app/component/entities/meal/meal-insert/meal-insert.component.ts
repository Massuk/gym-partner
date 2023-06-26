import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Meal } from 'src/app/model/meal';
import { MealService } from 'src/app/service/meal.service';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';

@Component({
  selector: 'app-meal-insert',
  templateUrl: './meal-insert.component.html',
  styleUrls: ['./meal-insert.component.scss'],
})
export class MealInsertComponent implements OnInit {
  idNutritionalPlan: number = 0;
  idMeal: number = 0;
  idClient: number = 0;

  edit: boolean = false;
  title: string = 'Registrar comida';
  form: FormGroup = new FormGroup({});
  meal: Meal = new Meal();

  constructor(
    private mS: MealService,
    private nPS: NutritionalPlanService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idMeal = data['id'];
      this.idNutritionalPlan = this.getIdNutritionalPlanFromUrl();
      this.idClient = this.getIdClientFromUrl();
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
  }

  getIdNutritionalPlanFromUrl(): number {
    const urlSegments = this.router.url.split('/');
    const index = urlSegments.indexOf('nutritional-plans');
    if (index !== -1 && index + 1 < urlSegments.length) {
      return +urlSegments[index + 1];
    }
    return 0;
  }
  getIdClientFromUrl(): number {
    const urlSegments = this.router.url.split('/');
    const index = urlSegments.indexOf('clients');
    if (index !== -1 && index + 1 < urlSegments.length) {
      return +urlSegments[index + 1];
    }
    return 0;
  }

  aceptar(): void {
    this.meal.title = this.form.value['title'];
    this.meal.day = this.form.value['day'];
    this.meal.type = this.form.value['type'];
    this.meal.hide = false;

    if (this.form.valid) {
      if (this.edit) {
        this.mS.listId(this.idMeal).subscribe((data) => {
          data.title = this.meal.title;
          data.day = this.meal.day;
          data.type = this.meal.type;
          this.mS.update(data).subscribe(() => {
            this.mS.list(this.idNutritionalPlan).subscribe((data) => {
              this.mS.setList(data);
            });
          });
        });
      } else {
        this.nPS.listId(this.idNutritionalPlan).subscribe((data) => {
          this.meal.nutritionalPlan = data;
          this.mS.insert(this.meal).subscribe(() => {
            this.mS.list(this.idNutritionalPlan).subscribe((data) => {
              this.mS.setList(data);
            });
          });
        });
      }
      this.router.navigate([
        '/dashboard/clients/' +
          this.idClient +
          '/nutritional-plans/' +
          this.idNutritionalPlan +
          '/meals',
      ]);
    }
  }

  init() {
    if (this.edit) {
      this.title = 'Editar comida';
      this.mS.listId(this.idMeal).subscribe((data) => {
        this.form.patchValue({
          id: data.idMeal,
          title: data.title,
          day: data.day,
          type: data.type,
        });
      });
    }
  }
}
