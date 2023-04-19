import { Component } from '@angular/core';
import { NutritionalPlan } from 'src/app/model/nutritionalPlan';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nutritional-plan-insert',
  templateUrl: './nutritional-plan-insert.component.html',
  styleUrls: ['./nutritional-plan-insert.component.scss'],
})
export class NutritionalPlanInsertComponent {
  form: FormGroup = new FormGroup({});
  nutritionalPlan: NutritionalPlan = new NutritionalPlan();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  constructor(private pNS: NutritionalPlanService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      titleNutritionalPlan: new FormControl(),
      statusNutritionalPlan: new FormControl(),
      objectiveNutritionalPlan: new FormControl(),
      descriptionNutritionalPlan: new FormControl(),
      startDateNutritionalPlan: new FormControl(),
      endDateNutritionalPlan: new FormControl(),
      recommendationsNutritionalPlan: new FormControl(),
    });
  }
  aceptar(): void {
    this.nutritionalPlan.id =
      this.form.value['id'];
    this.nutritionalPlan.titleNutritionalPlan =
      this.form.value['titleNutritionalPlan'];
    this.nutritionalPlan.statusNutritionalPlan =
      this.form.value['statusNutritionalPlan'];
    this.nutritionalPlan.objectiveNutritionalPlan =
      this.form.value['objectiveNutritionalPlan'];
    this.nutritionalPlan.descriptionNutritionalPlan =
      this.form.value['descriptionNutritionalPlan'];
    this.nutritionalPlan.startDateNutritionalPlan =
      this.form.value['startDateNutritionalPlan'];
    this.nutritionalPlan.endDateNutritionalPlan =
      this.form.value['endDateNutritionalPlan'];
    this.nutritionalPlan.recommendationsNutritionalPlan =
      this.form.value['recommendationsNutritionalPlan'];
    if (this.form.value['titleNutritionalPlan'].length > 0) {
      this.pNS.insert(this.nutritionalPlan).subscribe((data) => {
        this.pNS.list().subscribe((data) => {
          this.pNS.setList(data);
        });
      });
      this.router.navigate(['nutritional-plans']);
    } else {
      this.mensaje = 'Ingrese el titulo del plan!!';
    }
  }
}
