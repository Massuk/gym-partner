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
  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit() {
  }
}
