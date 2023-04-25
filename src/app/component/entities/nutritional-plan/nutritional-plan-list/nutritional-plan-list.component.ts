import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NutritionalPlan } from 'src/app/model/nutritionalPlan';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/component/dashboard/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-nutritional-plan-list',
  templateUrl: './nutritional-plan-list.component.html',
  styleUrls: ['./nutritional-plan-list.component.scss'],
})
export class NutritionalPlanListComponent implements OnInit {
  lista: NutritionalPlan[] = [];
  dataSource: MatTableDataSource<NutritionalPlan> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'titleNutritionalPlan',
    'statusNutritionalPlan',
    'objectiveNutritionalPlan',
    'descriptionNutritionalPlan',
    'startDateNutritionalPlan',
    'endDateNutritionalPlan',
    'recommendationsNutritionalPlan',
    'edit',
  ];

  constructor(
    private pNP: NutritionalPlanService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.pNP.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.pNP.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.pNP.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  filter(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }
  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: { message: '¿Quieres eliminar el plan nutricional?' },
    });

    const snack = this.snackbar;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pNP.delete(id).subscribe(() => {
          this.pNP.list().subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
          });
        });
        snack.dismiss();
        this.snackbar.open('Se ha eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
      } else {
        snack.dismiss();
      }
    });
  }
}
