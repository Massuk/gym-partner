import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Gym } from 'src/app/model/gym';
import { Owner } from 'src/app/model/owner';
import { GymService } from 'src/app/service/gym.service';
import { DialogPopupComponent } from 'src/app/component/dashboard/dialog-popup/dialog-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { UserDataService } from '../../../../service/user-data.service';
import { GymDetailsComponent } from '../gym-details/gym-details.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.scss'],
})
export class GymListComponent implements OnInit {
  innerWidth: any;
  username: string;
  lastname: string;
  role: string;
  progressValue: number = 0;
  gyms: Gym[] = [];

  constructor(
    private udS: UserDataService,
    private gS: GymService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.innerWidth = window.innerWidth;
    this.gS.getList().subscribe((data) => {
      this.gyms = data;
      this.calculateProgressValue();
    });

    this.gS.list().subscribe((data) => {
      this.gyms = data;
      this.calculateProgressValue();
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

  calculateProgressValue(): void {
    const totalGyms = this.gyms.length;
    this.progressValue = totalGyms > 0 ? 100 : 0;
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
          this.gS.list().subscribe((data) => {});
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

  showManagePopup(): void {
    if (this.gyms.length > 0) {
      const gym = this.gyms[0];
      const dialogRef = this.dialog.open(GymDetailsComponent, {
        height: 'auto',
        width: '630px',
        data: {
          gym: gym,
        },
      });
    }
  }

  showEditProfilePopup(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      height: 'auto',
      width: '555px',
      data: {},
    });
  }
}
