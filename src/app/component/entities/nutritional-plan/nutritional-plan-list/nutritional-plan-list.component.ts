import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NutritionalPlan } from 'src/app/model/nutritional-plan';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-nutritional-plan-list',
  templateUrl: './nutritional-plan-list.component.html',
  styleUrls: ['./nutritional-plan-list.component.scss'],
})
export class NutritionalPlanListComponent implements OnInit {
  idClient: number;
  dataSource: MatTableDataSource<NutritionalPlan> = new MatTableDataSource();
  displayedColumns: string[] = [
    'title',
    'description',
    'objective',
    'startDate',
    'endDate',
    'recommendations',
    'status',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private npS: NutritionalPlanService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idClient = data['id'];
    });
    this.npS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
    this.npS.list(this.idClient).subscribe((data) => {
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

  showDeletePopup(idNutritionalPlan: number): void {
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
        this.npS.hide(idNutritionalPlan).subscribe(() => {
          this.npS.list(this.idClient).subscribe((data) => {
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

  toggleBadgeStatus(idNutritionalPlan: number, status: boolean): void {
    const newStatus = !status;

    this.npS.listId(idNutritionalPlan).subscribe((data) => {
      data.status = newStatus;

      this.npS.update(data).subscribe(() => {
        console.log('Estado actualizado correctamente a: ' + data.status);

        // Actualizar el objeto data en la lista de entrenamientos
        const nutritionalPlanIndex = this.dataSource.data.findIndex(
          (np) => np.idNutritionalPlan === idNutritionalPlan
        );
        if (nutritionalPlanIndex !== -1) {
          this.dataSource.data[nutritionalPlanIndex] = data;
          this.dataSource._updateChangeSubscription(); // Notificar cambios a la tabla
        }
      });
    });
  }
}
