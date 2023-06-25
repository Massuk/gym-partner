import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Gym } from 'src/app/model/gym';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.scss']
})
export class GymDetailsComponent implements OnInit{
  @Input() gym: Gym; // Recibe el objeto Gym como entrada desde el componente padre
  constructor(
    public dialogRef: MatDialogRef<GymDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gym = this.data.gym; // Asignar el valor del objeto Gym recibido desde GymListComponent
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  navigateToTrainers(): void {
    this.dialogRef.close();
    this.router.navigate(['/dashboard/trainers']);
  }

  navigateToNutritionists(): void {
    this.dialogRef.close();
    this.router.navigate(['/dashboard/nutritionists']);
  }

  navigateToClients(): void {
    this.dialogRef.close();
    this.router.navigate(['/dashboard/clients']);
  }

  navigateToEdit(): void {
    this.dialogRef.close();
    this.router.navigate(['/dashboard/gyms/edit']);
  }
}
