import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'src/app/model/exercise';
import { ExerciseService } from 'src/app/service/exercise.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoutineService } from 'src/app/service/routine.service';

@Component({
  selector: 'app-exercise-insert',
  templateUrl: './exercise-insert.component.html',
  styleUrls: ['./exercise-insert.component.scss'],
})
export class ExerciseInsertComponent implements OnInit {
  idExercise: number = 0;
  idRoutine: number = 0;
  idTrainingPlan: number = 0;
  idClient: number = 0;
  edit: boolean = false;
  title: string = 'Registrar ejercicio';
  form: FormGroup = new FormGroup({});
  exercise: Exercise = new Exercise();

  constructor(
    private eS: ExerciseService,
    private rS: RoutineService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idExercise = data['id'];
      this.idRoutine = this.getIdRoutineFromUrl();
      this.idTrainingPlan = this.getIdTrainingPlanFromUrl();
      this.idClient = this.getIdClientFromUrl();
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      series: new FormControl('', Validators.required),
      kilograms: new FormControl('', Validators.required),
      repetitions: new FormControl('', Validators.required),
    });
  }

  accept(): void {
    this.exercise.name = this.form.value['name'];
    this.exercise.series = this.form.value['series'];
    this.exercise.kilograms = this.form.value['kilograms'];
    this.exercise.repetitions = this.form.value['repetitions'];

    if (this.form.valid) {
      if (this.edit) {
        this.eS.listId(this.idExercise).subscribe((data) => {
          data.name = this.exercise.name;
          data.series = this.exercise.series;
          data.kilograms = this.exercise.kilograms;
          data.repetitions = this.exercise.repetitions;
          this.eS.update(data).subscribe(() => {
            this.eS.list(this.idRoutine).subscribe((data) => {
              this.eS.setList(data);
            });
          });
        });
      } else {
        this.rS.listId(this.idRoutine).subscribe((data) => {
          this.exercise.routine = data;
          this.eS.insert(this.exercise).subscribe(() => {
            this.eS.list(this.idRoutine).subscribe((data) => {
              this.eS.setList(data);
            });
          });
        });
      }
      this.router.navigate([
        '/dashboard/clients/' +
          this.idClient +
          '/training-plans/' +
          this.idTrainingPlan +
          '/routines/' +
          this.idRoutine +
          '/exercises',
      ]);
    }
  }

  init() {
    if (this.edit) {
      this.eS.listId(this.idExercise).subscribe((data) => {
        this.form.patchValue({
          name: data.name,
          series: data.series,
          kilograms: data.kilograms,
          repetitions: data.repetitions,
        });
      });
    }
  }
  getIdRoutineFromUrl(): number {
    const urlSegments = this.router.url.split('/');
    const index = urlSegments.indexOf('routines');
    if (index !== -1 && index + 1 < urlSegments.length) {
      return +urlSegments[index + 1];
    }
    return 0;
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
