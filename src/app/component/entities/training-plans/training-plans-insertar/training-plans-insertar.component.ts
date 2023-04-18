import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TrainingPlan } from 'src/app/model/training-plans';
import { TrainingPlansService } from 'src/app/service/training-plans.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-training-plans-insertar',
  templateUrl: './training-plans-insertar.component.html',
  styleUrls: ['./training-plans-insertar.component.scss']
})
export class TrainingPlansInsertarComponent implements OnInit {
  
  form: FormGroup = new FormGroup({});
  tPlan: TrainingPlan = new TrainingPlan();
  mensaje: string = '';
  Fecha: Date = moment().add().toDate();
  maxFecha: Date = moment().add( +30, 'days').toDate();
  constructor(
    private tpS: TrainingPlansService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      objective: new FormControl(),
      level: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      enable: new FormControl(),
    })
  }

  aceptar(): void {
    this.tPlan.id = this.form.value['id'];
    this.tPlan.title = this.form.value['title'];
    this.tPlan.description = this.form.value['description'];
    this.tPlan.objective = this.form.value['objective'];
    this.tPlan.level = this.form.value['level'];
    this.tPlan.startDate = this.form.value['startDate'];
    this.tPlan.endDate = this.form.value['endDate'];
    this.tPlan.enable = this.form.value['enable'];

    if (this.form.value['title'].length > 0) {
      this.tpS.insert(this.tPlan).subscribe((data) => {
        this.tpS.list().subscribe((data) => {
          this.tpS.setList(data);
        })
      })
      this.router.navigate(['trainingPlans'])
    }
    else {
      this.mensaje = 'Ingrese el titulo del plan de entrenamiento';
      console.log(this.mensaje);
    }
  }

}
