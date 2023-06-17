import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Gym } from 'src/app/model/gym';
import { GymService } from 'src/app/service/gym.service';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GymDataService } from 'src/app/service/gym-data.service';


@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.scss'],
})
export class GymListComponent implements OnInit {

  lista: Gym[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'ruc',
    'rs',
    'actions',
  ];
  selectedRadioValue: string | undefined;
  selectedGym: Gym | undefined;

  selectGym(gym: Gym) {
    this.selectedGym = gym;
    this.selectedRadioValue = gym.idGym.toString();
    this.gymDataService.setSelectedGym(this.selectedGym);
    this.gymDataService.setSelectedRadioValue(this.selectedRadioValue);
  }


  dataSource: MatTableDataSource<Gym> = new MatTableDataSource();

  ngOnInit(): void {

  this.gS.getList().subscribe((data) => {
    this.dataSource.data = data;
    if (!this.selectedGym) {
      this.selectedGym = data[0]; // Asigna el primer gimnasio de la lista solo si selectedGym es undefined
      this.selectedRadioValue = this.selectedGym.idGym.toString(); // Establece su idGym como el valor de selectedRadioValue
      this.gymDataService.setSelectedGym(this.selectedGym);
      this.gymDataService.setSelectedRadioValue(this.selectedRadioValue);
    }
  });

    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if (!this.selectedGym) {
        this.selectedGym = data[0];
        this.selectedRadioValue = this.selectedGym.idGym.toString();
        this.gymDataService.setSelectedGym(this.selectedGym);
        this.gymDataService.setSelectedRadioValue(this.selectedRadioValue);
      }
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor(
    private gS: GymService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private gymDataService: GymDataService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showDeletePopup(id: number): void {
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

  filterResults(gym:any){
    this.dataSource.filter = gym.target.value.trim();
    console.log(this.selectedGym);
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

}
