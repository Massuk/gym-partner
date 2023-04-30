import { Component, OnInit, ViewChild } from '@angular/core';
import { ExerciseService } from 'src/app/service/exercise.service';
import { exercise } from 'src/app/model/exercise';
import {MatTableDataSource} from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from '../../../dashboard/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})

export class ExerciseListComponent implements OnInit{
  lista:exercise[]=[];
  displayedColumns:string[] = [
    'id',
    'nameExercise',
    'series',
    'kilograms',
    'repetitions',
    'Editar'
  ];
  dataSource:MatTableDataSource<exercise> = new MatTableDataSource();

  ngOnInit(): void {

    this.eS.getList().subscribe((data)=>{
      this.dataSource.data=data;
    });

    this.eS.list().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });


  }
  constructor(
    private eS:ExerciseService,
     private dialog: MatDialog,
    private snackBar: MatSnackBar
    ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: { message: '¿Quieres eliminar el ejercicio?' },
    });

    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eS.delete(id).subscribe(() => {
          this.eS.list().subscribe((data) => {
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



  filtrar(exercise:any){
    this.dataSource.filter =exercise.target.value.trim();
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

}
