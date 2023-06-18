import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingPlan } from 'src/app/model/training-plan';
import { TrainingPlansService } from 'src/app/service/training-plans.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-training-plans-insert',
  templateUrl: './training-plans-insert.component.html',
  styleUrls: ['./training-plans-insert.component.scss']
})
export class TrainingPlansInsertarComponent implements OnInit {

  idTrainingPlan: number = 0;
  edit: boolean = false;

  form: FormGroup = new FormGroup({});
  tPlan: TrainingPlan = new TrainingPlan();
  Fecha: Date = moment().add().toDate();
  maxFecha: Date = moment().add( +30, 'days').toDate();
  constructor(
    private tpS: TrainingPlansService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.idTrainingPlan = data['id'];
      this.edit = data['id'] != null;
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
      status: new FormControl('Activo', Validators.required),
    })
  }

  aceptar(): void {
    this.tPlan.idTrainingPlan = this.form.value['id'];
    this.tPlan.title = this.form.value['title'];
    this.tPlan.description = this.form.value['description'];
    this.tPlan.objective = this.form.value['objective'];
    this.tPlan.level = this.form.value['level'];
    this.tPlan.startDate = this.form.value['startDate'];
    this.tPlan.endDate = this.form.value['endDate'];
    this.tPlan.status = this.form.value['status'];
    this.tPlan.hide = false;

    if (this.form.valid) {
      if (this.edit) {
        this.tpS.update(this.tPlan).subscribe(() => {
          this.tpS.list().subscribe((data) => {
            this.tpS.setList(data);
          });
        });
      }
      else {
        this.tpS.insert(this.tPlan).subscribe(() => {
        this.tpS.list().subscribe((data) => {
          this.tpS.setList(data);
        })
      })
      }
      this.router.navigate(['/dashboard/training-plans'])
    }
  }


  init() {
    if (this.edit) {
      this.tpS.listId(this.idTrainingPlan).subscribe((data) => {
        this.form.patchValue({
          id: data.idTrainingPlan,
          title: data.title,
          status: data.status,
          description: data.description,
          objective: data.objective,
          level: data.level,
          startDate: data.startDate,
          endDate: data.endDate
        });
      });
    }
  }
}
