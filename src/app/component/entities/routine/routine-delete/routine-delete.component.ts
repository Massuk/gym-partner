
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineService } from 'src/app/service/routine.service';

@Component({
  selector: 'app-routine-delete',
  templateUrl: './routine-delete.component.html',
  styleUrls: ['./routine-delete.component.scss']
})
export class RoutineDeleteComponent {

  routineId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rS: RoutineService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routineId = +params['id']; // Convierte el parámetro a número
    });
  }
}
