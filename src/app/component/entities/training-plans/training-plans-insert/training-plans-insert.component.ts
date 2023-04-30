import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingPlan } from 'src/app/model/training-plans';
import { TrainingPlansService } from 'src/app/service/training-plans.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-training-plans-insert',
  templateUrl: './training-plans-insert.component.html',
  styleUrls: ['./training-plans-insert.component.scss']
})
export class TrainingPlansInsertarComponent implements OnInit {

  id: number = 0;
  edicion: boolean = false;

  form: FormGroup = new FormGroup({});
  tPlan: TrainingPlan = new TrainingPlan();
  mensaje: string = '';
  Fecha: Date = moment().add().toDate();
  maxFecha: Date = moment().add( +30, 'days').toDate();
  constructor(
    private tpS: TrainingPlansService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      objective: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      enable: new FormControl('', Validators.required),
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

    if (this.form.valid) {
      if (this.edicion) {
        this.tpS.update(this.tPlan).subscribe(() => {
          this.tpS.list().subscribe((data) => {
            this.tpS.setList(data);
          });
        });
      }
      else {
        this.tpS.insert(this.tPlan).subscribe((data) => {
        this.tpS.list().subscribe((data) => {
          this.tpS.setList(data);
        })
      })
      }
      this.router.navigate(['/dashboard/trainingPlans'])
    }
    else {
      this.mensaje = 'Ingrese el titulo del plan de entrenamiento';
      console.log(this.mensaje);
    }
  }


  init() {
    if (this.edicion) {
      this.tpS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          title: new FormControl(data.title),
          description: new FormControl(data.description),
          objective: new FormControl(data.objective),
          level: new FormControl(data.level),
          startDate: new FormControl(data.startDate),
          endDate: new FormControl(data.endDate),
          enable: new FormControl(data.enable),
        });
      });
    }
  }
}
