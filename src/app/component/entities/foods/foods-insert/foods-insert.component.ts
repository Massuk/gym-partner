import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/service/foods.service';
import { Food } from 'src/app/model/food';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NutritionixService } from 'src/app/service/nutritionix.service';

@Component({
  selector: 'app-foods-insert',
  templateUrl: './foods-insert.component.html',
  styleUrls: ['./foods-insert.component.scss'],
})
export class FoodsInsertComponent implements OnInit {
  idFood: number = 0;
  edit: boolean = false;
  form: FormGroup = new FormGroup({});
  food: Food = new Food();
  selectedFood: any;

  constructor(
    private fS: FoodService,
    private router: Router,
    private route: ActivatedRoute,
    private nutritionixService: NutritionixService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idFood = data['id'];
      this.edit = data['id'] != null;
      this.init();
    });
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      portions: new FormControl('', Validators.required),
      calories: new FormControl('', Validators.required),
    });

    // Suscribirse a los cambios en el campo 'name'
    this.form.controls['name'].valueChanges.subscribe((value: string) => {
      this.searchFoods(value);
    });
  }
  accept(): void {
    this.food.idFood = this.form.value['id'];
    this.food.name = this.form.value['name'];
    this.food.portions = this.form.value['portions'];
    this.food.calories = this.form.value['calories'];
    if (this.form.valid) {
      if (this.edit) {
        this.fS.update(this.food).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      } else {
        this.fS.insert(this.food).subscribe((data) => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      this.router.navigate(['/dashboard/foods']);
    }
  }
  init() {
    if (this.edit) {
      this.fS.listId(this.idFood).subscribe((data) => {
        this.form.patchValue({
          id: data.idFood,
          name: data.name,
          portions: data.portions,
          calories: data.calories,
        });
      });
    }
  }

  // API para autorellenar valor de calorias u otras propiedades que necesitemos de un alimento
  searchFoods(query: string) {
    if (query.trim() === '') {
      this.form.patchValue({
        calories: ''
      });
      return;
    }

    this.nutritionixService.getFoods(query).subscribe(
      response => {
        this.selectedFood = response.foods[0];
        if (this.selectedFood) {
          this.form.patchValue({
            calories: this.selectedFood.nf_calories
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
