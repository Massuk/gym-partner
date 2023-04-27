import { Component, OnInit, ViewChild } from '@angular/core';
import { food } from 'src/app/model/food';
import { MatTableDataSource } from '@angular/material/table';
import { FoodService } from 'src/app/service/foods.service';
import { MatDialog } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from '../../../dashboard/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit {
  lista: food[] = [];
  dataSource: MatTableDataSource<food> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'Name', 'portions', 'calories','actions'];


  constructor(private fS: FoodService, private dialog: MatDialog,
    private snackBar: MatSnackBar ) {}
  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.fS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });

  }

filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: { message: '¿Quieres eliminar alimento?' },
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
