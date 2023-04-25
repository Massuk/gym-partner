import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingPlansService } from 'src/app/service/training-plans.service';

@Component({
  selector: 'app-training-plans-delete',
  templateUrl: './training-plans-delete.component.html',
  styleUrls: ['./training-plans-delete.component.scss']
})
export class TrainingPlansDeleteComponent {

  tPlanId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tpS: TrainingPlansService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tPlanId = +params['id']; // Convierte el parámetro a número
    });
  }
}
