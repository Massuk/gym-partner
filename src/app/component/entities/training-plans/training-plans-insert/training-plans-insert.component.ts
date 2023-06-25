import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingPlan } from 'src/app/model/training-plan';
import { TrainingPlansService } from 'src/app/service/training-plans.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import * as moment from 'moment';
import { ClientService } from 'src/app/service/client.service';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-training-plans-insert',
  templateUrl: './training-plans-insert.component.html',
  styleUrls: ['./training-plans-insert.component.scss'],
})
export class TrainingPlansInsertarComponent implements OnInit {
  idClient: number = 0;
  idTrainingPlan: number = 0;
  edit: boolean = false;
  title: string = 'Registrar plan de entrenamiento';
  form: FormGroup = new FormGroup({});
  trainingPlan: TrainingPlan = new TrainingPlan();
  minDate: Date = moment().add().toDate();
  maxDate: Date = moment().add(+30, 'days').toDate();
  constructor(
    private tPS: TrainingPlansService,
    private c: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idTrainingPlan = data['id'];
      this.idClient = this.getIdClientFromUrl();
      this.edit = data['id'] != null;
      this.init();
    });
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      objective: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

  accept(): void {
    this.trainingPlan.title = this.form.value['title'];
    this.trainingPlan.description = this.form.value['description'];
    this.trainingPlan.objective = this.form.value['objective'];
    this.trainingPlan.level = this.form.value['level'];
    this.trainingPlan.startDate = this.form.value['startDate'];
    this.trainingPlan.endDate = this.form.value['endDate'];
    this.trainingPlan.status = true;
    this.trainingPlan.hide = false;

    if (this.form.valid) {
      if (this.edit) {
        this.tPS.listId(this.idTrainingPlan).subscribe((data) => {
          data.title = this.trainingPlan.title;
          data.description = this.trainingPlan.description;
          data.objective = this.trainingPlan.objective;
          data.startDate = this.trainingPlan.startDate;
          data.endDate = this.trainingPlan.endDate;
          data.status = this.trainingPlan.status;
          data.hide = this.trainingPlan.hide;
          this.tPS.update(data).subscribe(() => {
            this.tPS.list(this.idClient).subscribe((data) => {
              this.tPS.setList(data);
            });
          });
        });
      } else {
        this.c.listId(this.idClient).subscribe((data) => {
          this.trainingPlan.client = data;
          this.tPS.insert(this.trainingPlan).subscribe(() => {
            this.tPS.list(this.idClient).subscribe((data) => {
              this.tPS.setList(data);
            });
          });
        });
      }
      this.router.navigate([
        '/dashboard/clients/' + this.idClient + '/training-plans',
      ]);
    }
  }
  init() {
    if (this.edit) {
      this.title = 'Editar plan de entrenamiento';
      this.tPS.listId(this.idTrainingPlan).subscribe((data) => {
        this.form.patchValue({
          id: data.idTrainingPlan,
          title: data.title,
          status: data.status,
          description: data.description,
          objective: data.objective,
          level: data.level,
          startDate: data.startDate,
          endDate: data.endDate,
        });
      });
    }
  }
  getIdClientFromUrl(): number {
    const urlSegments = this.router.url.split('/');
    const index = urlSegments.indexOf('clients');
    if (index !== -1 && index + 1 < urlSegments.length) {
      return +urlSegments[index + 1];
    }
    return 0;
  }
}
