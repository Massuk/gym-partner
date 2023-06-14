import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'src/app/model/exercise';
import { ExerciseService } from 'src/app/service/exercise.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-exercise-insert',
  templateUrl: './exercise-insert.component.html',
  styleUrls: ['./exercise-insert.component.scss'],
})
export class ExerciseInsertComponent implements OnInit {
  idExercise: number = 0;
  edicion: boolean = false;

  form: FormGroup = new FormGroup({});
  exercise: Exercise = new Exercise();

  constructor(
    private eS: ExerciseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idExercise = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      series: new FormControl('', Validators.required),
      kilograms: new FormControl('', Validators.required),
      repetitions: new FormControl('', Validators.required),
    });
  }

  aceptar(): void {
    this.exercise.idExercise = this.form.value['id'];
    this.exercise.name = this.form.value['name'];
    this.exercise.series = this.form.value['series'];
    this.exercise.kilograms = this.form.value['kilograms'];
    this.exercise.repetitions = this.form.value['repetitions'];
    this.exercise.hide = false;

    if (this.form.valid) {
      if (this.edicion) {
        this.eS.update(this.exercise).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.exercise).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['/dashboard/exercises']);
    }
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.idExercise).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idExercise),
          name: new FormControl(data.name),
          series: new FormControl(data.series),
          kilograms: new FormControl(data.kilograms),
          repetitions: new FormControl(data.repetitions),
        });
      });
    }
  }
}
