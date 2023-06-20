import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/service/trainer.service';

@Component({
  selector: 'app-trainer-delete',
  templateUrl: './trainer-delete.component.html',
  styleUrls: ['./trainer-delete.component.scss']
})
export class TrainerDeleteComponent {
  idTrainer: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tS: TrainerService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idTrainer = +params['id']; // Convierte el parámetro a número
    });
  }
}
