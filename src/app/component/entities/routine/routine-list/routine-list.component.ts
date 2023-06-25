import { Component, OnInit, ViewChild } from '@angular/core';
import { Routine } from 'src/app/model/routine';
import { RoutineService } from 'src/app/service/routine.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.scss']
})
export class RoutineListComponent implements OnInit{
  lista: Routine[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'day',
    'description',
    'actions'
  ];


  dataSource: MatTableDataSource<Routine> = new MatTableDataSource();

  ngOnInit(): void {

    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor(
    private rS: RoutineService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  showDeletePopup(idRoutine: number): void {
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
        this.rS.hide(idRoutine).subscribe(() => {
          this.rS.list().subscribe((data) => {
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
