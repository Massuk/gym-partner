import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GymService } from 'src/app/service/gym.service';
import { OwnerService } from 'src/app/service/owner.service';
import { TrainerService } from 'src/app/service/trainer.service';
import { NutritionistService } from 'src/app/service/nutritionist.service';
import { ClientsByNutritionist, ClientsByTrainer, NutritionistsByGymDTO, TrainersByGymDTO, GymByOwner } from 'src/app/model/report';

@Component({
  selector: 'app-gym-report',
  templateUrl: './gym-report.component.html',
  styleUrls: ['./gym-report.component.scss'],
})
export class GymReportComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GymReportComponent>,
    private gS: GymService,
    private tS: TrainerService,
    private nS: NutritionistService,
    private oS: OwnerService
  ) {}

  trainers: TrainersByGymDTO[];
  nutritionists: NutritionistsByGymDTO[];
  clientsByTrainer: ClientsByTrainer[];
  clientsByNutritionist: ClientsByNutritionist[];
  gymByOwner: GymByOwner[];

  ngOnInit(): void {
    this.gS.getAllTrainers().subscribe((data) => {
      this.trainers = data;
    });
    this.gS.getAllNutritionists().subscribe((data) => {
      this.nutritionists = data;
    });
    this.tS.clientsByTrainer().subscribe((data) => {
      this.clientsByTrainer = data;
    })
    this.nS.clientsByNutritionist().subscribe((data) => {
      this.clientsByNutritionist = data;
    })
    this.oS.gymByOwner().subscribe((data) => {
      this.gymByOwner = data;
    })
  }
}
