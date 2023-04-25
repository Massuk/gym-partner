import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/service/foods.service';
import { food } from 'src/app/model/food';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-foods-insert',
  templateUrl: './foods-insert.component.html',
  styleUrls: ['./foods-insert.component.scss']
})
export class FoodsInsertComponent implements OnInit {
  id: number = 0;
  edicion: boolean = false;
  form: FormGroup = new FormGroup({});
  food: food= new food();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  constructor(
    private fS: FoodService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {

      this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
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
      if(this.edicion){
        //guardar lo actualizado
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
      this.router.navigate(['foods']);
    }
      else {
      this.mensaje = 'Ingrese el nombre del alimento';
     }
   }
   init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nameFood: new FormControl(data.nameFood),
          portionsFood: new FormControl(data.portionsFood),
          caloriesFood: new FormControl(data.caloriesFood),
        });
      });
    }
  }
}
