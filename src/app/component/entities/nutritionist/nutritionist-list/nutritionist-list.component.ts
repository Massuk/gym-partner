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
  displayedColumns: string[] = [
    'id',
    'name',
    'lastname',
    'status',
    'actions',
  ];

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
    this.nS.list().subscribe((data) => {
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
  showDeletePopup(idNutritionist: number): void {
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
        this.nS.hide(idNutritionist).subscribe(() => {
          this.nS.list().subscribe((data) => {
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
  toggleBadgeStatus(idNutritionist: number, status: string): void {
    const newStatus = status === 'Activo' ? 'Inactivo' : 'Activo';

    this.nS.listId(idNutritionist).subscribe((data) => {
      data.status = newStatus;

      this.nS.update(data).subscribe(() => {
        console.log('Estado actualizado correctamente a: ' + data.status);
        // Actualizar el objeto data en la lista de entrenamientos
        const nutritionistIndex = this.dataSource.data.findIndex(
          (n) => n.idNutritionist === idNutritionist
        );
        if (nutritionistIndex !== -1) {
          this.dataSource.data[nutritionistIndex] = data;
          this.dataSource._updateChangeSubscription(); // Notificar cambios a la tabla
        }
      });
    });
  }
}
