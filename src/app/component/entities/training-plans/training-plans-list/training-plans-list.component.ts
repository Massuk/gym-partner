import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingPlan } from 'src/app/model/training-plans';
import { TrainingPlansService } from 'src/app/service/training-plans.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from 'src/app/component/dashboard/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-training-plans-list',
  templateUrl: './training-plans-list.component.html',
  styleUrls: ['./training-plans-list.component.scss'],
})
export class TrainingPlansListarComponent implements OnInit {
  lista: TrainingPlan[] = [];
  displayedColumns: string[] = [
    'number',
    'title',
    'description',
    'objective',
    'level',
    'startDate',
    'endDate',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<TrainingPlan> = new MatTableDataSource();

  ngOnInit(): void {

    this.tpS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.tpS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor(
    private tpS: TrainingPlansService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  openConfirmationDialog(idTrainingPlan: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: { message: '¿Quieres eliminar el plan de entrenamiento?' },
    });

    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tpS.delete(idTrainingPlan).subscribe(() => {
          this.tpS.list().subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
          });
        });
        snack.dismiss();
        this.snackBar.open('Se ha eliminado correctamente', 'Aceptar', {
          duration: 3000,
        });
      } else {
        snack.dismiss();
      }
    });
  }


  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  clearFilter() {
    this.dataSource.filter = '';
  }
}
