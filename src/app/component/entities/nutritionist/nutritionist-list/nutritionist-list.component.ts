import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { Nutritionist } from 'src/app/model/nutritionist';
import { NutritionistService } from 'src/app/service/nutritionist.service';

@Component({
  selector: 'app-nutritionist-list',
  templateUrl: './nutritionist-list.component.html',
  styleUrls: ['./nutritionist-list.component.scss'],
})
export class NutritionistListComponent {
  dataSource: MatTableDataSource<Nutritionist> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'lastname', 'status', 'actions'];

  constructor(
    private nS: NutritionistService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.nS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.nS
      .list(String(sessionStorage.getItem('username')))
      .subscribe((data) => {
        this.dataSource.data = data;
        console.log(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }
  clearFilter() {
    this.dataSource.filter = '';
  }
  toggleBadgeStatus(idNutritionist: number, status: boolean): void {
    const newStatus = !status;

    this.nS.listId(idNutritionist).subscribe((data) => {
      data.status = newStatus;

      this.nS.update(data).subscribe(() => {
        console.log('Estado actualizado correctamente a: ' + data.status);

        // Actualizar el objeto data en la lista de entrenamientos
        const trainingPlanIndex = this.dataSource.data.findIndex(
          (tp) => tp.idNutritionist === idNutritionist
        );
        if (trainingPlanIndex !== -1) {
          this.dataSource.data[trainingPlanIndex] = data;
          this.dataSource._updateChangeSubscription(); // Notificar cambios a la tabla
        }
        this.nS
          .list(String(sessionStorage.getItem('username')))
          .subscribe((data) => {
            this.nS.setList(data);
          });
      });
    });
  }
}
