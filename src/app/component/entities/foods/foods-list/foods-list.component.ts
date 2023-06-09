import { Component, OnInit, ViewChild } from '@angular/core';
import { Food } from 'src/app/model/food';
import { MatTableDataSource } from '@angular/material/table';
import { FoodService } from 'src/app/service/foods.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit {
  idMeal: number;
  dataSource: MatTableDataSource<Food> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'portions', 'calories', 'actions'];

  constructor(
    private fS: FoodService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idMeal = data['id'];
    });
    this.fS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
    this.fS.list(this.idMeal).subscribe((data) => {
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
  showDeletePopup(idExercise: number): void {
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
        this.fS.delete(idExercise).subscribe(() => {
          this.fS.list(this.idMeal).subscribe((data) => {
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
}
