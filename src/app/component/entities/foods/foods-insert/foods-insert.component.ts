import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/service/foods.service';
import { Food } from 'src/app/model/food';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-foods-insert',
  templateUrl: './foods-insert.component.html',
  styleUrls: ['./foods-insert.component.scss']
})
export class FoodsInsertComponent implements OnInit {
  idFood: number = 0;
  edit: boolean = false;
  form: FormGroup = new FormGroup({});
  food: Food= new Food();
  constructor(
    private fS: FoodService,
    private router: Router,
    private route: ActivatedRoute
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
  }
  accept(): void {
    this.food.idFood = this.form.value['id'];
    this.food.name = this.form.value['name'];
    this.food.portions = this.form.value['portions'];
    this.food.calories = this.form.value['calories'];
    if (this.form.valid) {
      if(this.edit){
        this.fS.update(this.food).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      else {
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
          calories: data.calories
        });
      });
    }
  }
}
