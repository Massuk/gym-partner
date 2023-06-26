import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { Meal } from 'src/app/model/meal';
import { MealService } from 'src/app/service/meal.service';
import { NutritionalPlan } from '../../../../model/nutritional-plan';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent implements OnInit {
  idNutritionalPlan: number;
  dataSource: MatTableDataSource<Meal> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['title', 'day', 'type', 'actions'];

  constructor(
    private mS: MealService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idNutritionalPlan = data['id'];
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
    this.mS.list(this.idNutritionalPlan).subscribe((data) => {
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

  showDeletePopup(idMeal: number): void {
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
        this.mS.hide(idMeal).subscribe(() => {
          this.mS.list(this.idNutritionalPlan).subscribe((data) => {
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
