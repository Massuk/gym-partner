import { Component, OnInit, ViewChild } from '@angular/core';
import { Food } from 'src/app/model/food';
import { MatTableDataSource } from '@angular/material/table';
import { FoodService } from 'src/app/service/foods.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit {
  lista: Food[] = [];
  dataSource: MatTableDataSource<Food> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'name',
    'portions',
    'calories',
    'actions',
  ];

  constructor(
    private fS: FoodService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.fS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  filter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showDeletePopup(id: number): void {
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

    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fS.delete(id).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
          });
        });
        snack.dismiss();
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
      } else {
        snack.dismiss();
      }
    });
  }
}
