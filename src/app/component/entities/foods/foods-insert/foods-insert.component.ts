import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/service/foods.service';
import { Food } from 'src/app/model/food';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NutritionixService } from 'src/app/service/nutritionix.service';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-foods-insert',
  templateUrl: './foods-insert.component.html',
  styleUrls: ['./foods-insert.component.scss'],
})
export class FoodsInsertComponent implements OnInit {
  idFood: number = 0;
  idMeal: number = 0;
  idNutritionalPlan: number = 0;
  idClient: number = 0;
  edit: boolean = false;
  title: string = 'Registrar alimento';
  form: FormGroup = new FormGroup({});
  food: Food = new Food();
  selectedFood: any;

  constructor(
    private nutritionixService: NutritionixService,
    private fS: FoodService,
    private mS: MealService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idFood = data['id'];
      this.idMeal = this.getIdMealFromUrl();
      this.idNutritionalPlan = this.getIdNutritionalPlanFromUrl();
      this.idClient = this.getIdClientFromUrl();
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      portions: new FormControl('', Validators.required),
      calories: new FormControl('', Validators.required),
    });

    this.form.controls['name'].valueChanges.subscribe((value: string) => {
      this.searchFoods(value);
    });
  }

  accept(): void {
    this.food.name = this.form.value['name'];
    this.food.portions = this.form.value['portions'];
    this.food.calories = this.form.value['calories'];

    if (this.form.valid) {
      if (this.edit) {
        this.fS.listId(this.idFood).subscribe((data) => {
          data.name = this.food.name;
          data.portions = this.food.portions;
          data.calories = this.food.calories;
          this.fS.update(data).subscribe(() => {
            this.fS.list(this.idMeal).subscribe((data) => {
              this.fS.setList(data);
            });
          });
        });
      } else {
        this.mS.listId(this.idMeal).subscribe((data) => {
          this.food.meal = data;
          this.fS.insert(this.food).subscribe(() => {
            this.fS.list(this.idMeal).subscribe((data) => {
              this.fS.setList(data);
            });
          });
        });
      }
      this.router.navigate([
        '/dashboard/clients/' +
          this.idClient +
          '/nutritional-plans/' +
          this.idNutritionalPlan +
          '/meals/' +
          this.idMeal +
          '/foods',
      ]);
    }
  }

  init() {
    if (this.edit) {
      this.title = 'Editar alimento';
      this.fS.listId(this.idFood).subscribe((data) => {
        this.form.patchValue({
          name: data.name,
          portions: data.portions,
          calories: data.calories,
        });
      });
    }
  }
  getIdMealFromUrl(): number {
    const urlSegments = this.router.url.split('/');
    const index = urlSegments.indexOf('meals');
    if (index !== -1 && index + 1 < urlSegments.length) {
      return +urlSegments[index + 1];
    }
    return 0;
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

  // API para autorellenar valor de calorias u otras propiedades que necesitemos de un alimento

  searchFoods(query: string) {
    if (query.trim() === '') {
      this.form.patchValue({
        calories: '',
      });
      return;
    }

    this.nutritionixService.getFoods(query).subscribe(
      (response) => {
        this.selectedFood = response.foods[0];
        if (this.selectedFood) {
          this.form.patchValue({
            calories: this.selectedFood.nf_calories,
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
