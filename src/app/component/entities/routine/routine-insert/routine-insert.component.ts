import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Routine } from 'src/app/model/routine';
import { RoutineService } from 'src/app/service/routine.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TrainingPlansService } from 'src/app/service/training-plans.service';
import { TrainingPlan } from 'src/app/model/training-plan';

@Component({
  selector: 'app-routine-insert',
  templateUrl: './routine-insert.component.html',
  styleUrls: ['./routine-insert.component.scss'],
})
export class RoutineInsertComponent implements OnInit {
  idTrainingPlan: number = 0;
  idRoutine: number = 0;
  idClient: number = 0;
  edit: boolean = false;
  title: string = 'Registrar rutina';
  form: FormGroup = new FormGroup({});
  routine: Routine = new Routine();

  constructor(
    private rS: RoutineService,
    private tPS: TrainingPlansService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idRoutine = data['id'];
      this.idTrainingPlan = this.getIdTrainingPlanFromUrl();
      this.idClient = this.getIdClientFromUrl();
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
    });
  }

  aceptar(): void {
    this.routine.title = this.form.value['title'];
    this.routine.day = this.form.value['day'];
    this.routine.description = this.form.value['description'];
    this.routine.hide = false;

    if (this.form.valid) {
      if (this.edit) {
        this.rS.listId(this.idRoutine).subscribe((data) => {
          data.title = this.routine.title;
          data.day = this.routine.day;
          data.description = this.routine.description;
          this.rS.update(data).subscribe(() => {
            this.rS.list(this.idTrainingPlan).subscribe((data) => {
              this.rS.setList(data);
            });
          });
        });
      } else {
        this.tPS.listId(this.idTrainingPlan).subscribe((data) => {
          this.routine.trainingPlan = data;
          this.rS.insert(this.routine).subscribe(() => {
            this.rS.list(this.idTrainingPlan).subscribe((data) => {
              this.rS.setList(data);
            });
          });
        });
      }
      this.router.navigate([
        '/dashboard/clients/' +
          this.idClient +
          '/training-plans/' +
          this.idTrainingPlan +
          '/routines',
      ]);
    }
  }
  init() {
    if (this.edit) {
      this.title = 'Editar rutina';
      this.rS.listId(this.idRoutine).subscribe((data) => {
        this.form.patchValue({
          id: data.idRoutine,
          title: data.title,
          day: data.day,
          description: data.description,
        });
      });
    }
  }
  getIdTrainingPlanFromUrl(): number {
    const urlSegments = this.router.url.split('/');
    const index = urlSegments.indexOf('training-plans');
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
}
