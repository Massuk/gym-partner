import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Trainer } from 'src/app/model/trainer';
import { TrainerService } from 'src/app/service/trainer.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {
  dataSource: MatTableDataSource<Trainer> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'lastname',
    'status',
    'actions'
  ];
  
  constructor(
    private tS: TrainerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.tS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.tS
      .list(String(sessionStorage.getItem('username')))
      .subscribe((data) => {
        this.dataSource.data = data;
        console.log(data);
        console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      })
  }

  filter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

  toggleBadgeStatus(idTrainer: number, status: boolean): void {
    const newStatus = !status;

    this.tS.listId(idTrainer).subscribe((data) => {
      data.status = newStatus;

      this.tS.update(data).subscribe(() => {
        console.log('Estado actualizado correctamente a: ' + data.status);

        // Actualizar el objeto data en la lista de entrenamientos
        const trainingPlanIndex = this.dataSource.data.findIndex(
          (tp) => tp.idTrainer === idTrainer
        );
        if (trainingPlanIndex !== -1) {
          this.dataSource.data[trainingPlanIndex] = data;
          this.dataSource._updateChangeSubscription(); // Notificar cambios a la tabla
        }
        this.tS
          .list(String(sessionStorage.getItem('username')))
          .subscribe((data) => {
            this.tS.setList(data);
          });
      });
    });
  }
}
