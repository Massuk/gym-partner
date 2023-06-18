import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingPlan } from 'src/app/model/training-plan';
import { TrainingPlansService } from 'src/app/service/training-plans.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-training-plans-list',
  templateUrl: './training-plans-list.component.html',
  styleUrls: ['./training-plans-list.component.scss'],
})
export class TrainingPlansListarComponent implements OnInit {
  lista: TrainingPlan[] = [];
  displayedColumns: string[] = [
    'id',
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


  showDeletePopup(idTrainingPlan: number): void {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      width: '450px',
      data: {
        title: '¿Deseas eliminar el registro?',
        description:
          'Esta acción es irreversible',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showConfirmButton: true,
        showCancelButton: true
      },
    });

    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tpS.hide(idTrainingPlan).subscribe(() => {
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

  toggleBadgeStatus(idTrainingPlan: number, status: string): void {
    const newStatus = status === 'Activo' ? 'Inactivo' : 'Activo';

    this.tpS.listId(idTrainingPlan).subscribe((data) => {
      data.status = newStatus;

      this.tpS.update(data).subscribe(() => {
        console.log('Estado actualizado correctamente a: ' + data.status);

        // Actualizar el objeto data en la lista de entrenamientos
        const trainingPlanIndex = this.dataSource.data.findIndex((tp) => tp.idTrainingPlan === idTrainingPlan);
        if (trainingPlanIndex !== -1) {
          this.dataSource.data[trainingPlanIndex] = data;
          this.dataSource._updateChangeSubscription(); // Notificar cambios a la tabla
        }
      });
    });
  }



}
