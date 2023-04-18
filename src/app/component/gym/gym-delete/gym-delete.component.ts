import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GymService } from 'src/app/service/gym.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gym-delete',
  templateUrl: './gym-delete.component.html',
  styleUrls: ['./gym-delete.component.scss']
})
export class GymDeleteComponent {

  gymId: number=0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gS: GymService,
    private dialog: MatDialog
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gymId = +params['id']; // Convierte el parámetro a número
    });
  }
}
