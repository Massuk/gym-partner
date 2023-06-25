import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingPlan } from 'src/app/model/training-plan';
import { TrainingPlansService } from 'src/app/service/training-plans.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-training-plans-list',
  templateUrl: './training-plans-list.component.html',
  styleUrls: ['./training-plans-list.component.scss'],
})
export class TrainingPlansListarComponent implements OnInit {
  idClient: number;
  dataSource: MatTableDataSource<TrainingPlan> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'title',
    'description',
    'objective',
    'level',
    'startDate',
    'endDate',
    'status',
    'actions',
  ];

  constructor(
    private tPS: TrainingPlansService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idClient = data['id'];
    });
    this.tPS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
    this.tPS.list(this.idClient).subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }
  clearFilter() {
    this.dataSource.filter = '';
  }
  showDeletePopup(idTrainingPlan: number): void {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      width: '450px',
      data: {
        title: '¿Deseas eliminar el registro?',
        description: 'Esta acción es irreversible',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showConfirmButton: true,
        showCancelButton: true,
      },
    });

    const snack = this.snackbar;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tPS.hide(idTrainingPlan).subscribe(() => {
          this.tPS.list(this.idClient).subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
          });
        });
        snack.dismiss();
        this.snackbar.open('Se ha eliminado correctamente', 'Aceptar', {
          duration: 3000,
        });
      } else {
        snack.dismiss();
      }
    });
  }

  toggleBadgeStatus(idTrainingPlan: number, status: boolean): void {
    const newStatus = !status;

    this.tPS.listId(idTrainingPlan).subscribe((data) => {
      data.status = newStatus;
      console.log(data);
      this.tPS.update(data).subscribe(() => {
        console.log('Estado actualizado correctamente a: ' + data.status);

        // Actualizar el objeto data en la lista de entrenamientos
        const trainingPlanIndex = this.dataSource.data.findIndex(
          (tp) => tp.idTrainingPlan === idTrainingPlan
        );
        if (trainingPlanIndex !== -1) {
          this.dataSource.data[trainingPlanIndex] = data;
          this.dataSource._updateChangeSubscription(); // Notificar cambios a la tabla
        }
        this.tPS.list(this.idClient).subscribe((data) => {
          this.tPS.setList(data);
        });
      });
    });
  }
}
