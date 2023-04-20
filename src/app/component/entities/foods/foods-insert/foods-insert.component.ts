import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/service/foods.service';
import { food } from 'src/app/model/food';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foods-insert',
  templateUrl: './foods-insert.component.html',
  styleUrls: ['./foods-insert.component.scss']
})
export class FoodsInsertComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  food: food= new food();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  constructor(private fS: FoodService, private router: Router) {}

  ngOnInit(): void {
      this.form = new FormGroup({
      id: new FormControl(),
      nameFood: new FormControl(),
      portionsFood: new FormControl(),
      caloriesFood: new FormControl(),

    });
  }
  aceptar(): void {
    this.food.id = this.form.value['id'];
    this.food.nameFood = this.form.value['nameFood'];
    this.food.portionsFood = this.form.value['portionsFood'];
    this.food.caloriesFood = this.form.value['caloriesFood'];


    if (this.form.value['nameFood'].length > 0) {
      this.fS.insert(this.food).subscribe((data) => {
        this.fS.list().subscribe((data) => {
          this.fS.setList(data);
        });
      });
      this.router.navigate(['foods']);
    } else {
      this.mensaje = 'Ingrese el nombre del alimento';
    }
  }

}
