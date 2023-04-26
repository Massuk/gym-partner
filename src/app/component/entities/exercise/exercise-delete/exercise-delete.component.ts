import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-exercise-delete',
  templateUrl: './exercise-delete.component.html',
  styleUrls: ['./exercise-delete.component.scss']
})
export class ExerciseDeleteComponent {
  exerciseId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eS: ExerciseService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.exerciseId= +params['id']; // Convierte el parámetro a número
    });
  }
}
