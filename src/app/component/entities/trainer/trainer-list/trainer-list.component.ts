import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { Trainer } from 'src/app/model/trainer';
import { TrainerService } from 'src/app/service/trainer.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {
  list: Trainer[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'lastname',
    'detail',
    'status',
    'actions'
  ];
  dataSource: MatTableDataSource<Trainer> = new MatTableDataSource();

  constructor(
    private tS: TrainerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    this.tS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    });
  }

  showDeletePopup(idTrainer: number): void {
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
        this.tS.hide(idTrainer).subscribe(() => {
          this.tS.list().subscribe((data) => {
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

  toggleBadgeStatus(idTrainer: number, status: string): void {
    const newStatus = status === 'Activo' ? 'Inactivo' : 'Activo';

    this.tS.listId(idTrainer).subscribe((data) => {
      data.status = newStatus;

      this.tS.update(data).subscribe(() => {
        console.log('Estado actualizado correctamente a: ' + data.status);

        // Actualizar el objeto data en la lista de entrenamientos
        const trainerIndex = this.dataSource.data.findIndex((tp) => tp.idTrainer === idTrainer);
        if (trainerIndex !== -1) {
          this.dataSource.data[trainerIndex] = data;
          this.dataSource._updateChangeSubscription(); // Notificar cambios a la tabla
        }
      });
    });
  }
}
