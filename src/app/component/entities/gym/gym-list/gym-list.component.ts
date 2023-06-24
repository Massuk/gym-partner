import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Gym } from 'src/app/model/gym';
import { GymService } from 'src/app/service/gym.service';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GymDataService } from 'src/app/service/gym-data.service';
import { MatSort } from '@angular/material/sort';
import { UserDataService } from '../../../../service/user-data.service';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.scss'],
})
export class GymListComponent implements OnInit {
  innerWidth: any;
  currentTime: Date;
  username: string;
  lastname: string;
  role: string;
  gyms: Gym[] = []; // Variable para almacenar los gimnasios


  constructor(
    private udS: UserDataService,
    private gS: GymService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private gymDataService: GymDataService
  ) {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000); // Actualiza la hora cada segundo (1000 ms)
  }

  lista: Gym[] = [];
  displayedColumns: string[] = ['id', 'name', 'code', 'ruc', 'rs', 'actions'];

  dataSource: MatTableDataSource<Gym> = new MatTableDataSource();

  ngOnInit(): void {
    this.getUserData(); // Llama al método para obtener los datos del usuario
    this.innerWidth = window.innerWidth;
    this.gS.getList().subscribe((data) => {
      this.gyms = data;
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });

    this.gS.list().subscribe((data) => {
      this.gyms = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Ajustes visuales
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  getClass() {
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  getUserData() {
    this.udS.getUserData().subscribe(
      (data: any) => {
        this.username = data.name;
        this.lastname = data.lastname;
        this.role = data.role.name;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

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
        this.gS.hide(id).subscribe(() => {
          this.gS.list().subscribe((data) => {
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

  filterResults(gym: any) {
    this.dataSource.filter = gym.target.value.trim();
  }

  clearFilter() {
    this.dataSource.filter = '';
  }
}
