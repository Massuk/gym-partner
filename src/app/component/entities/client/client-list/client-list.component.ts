import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/model/client';
import { ClientService } from '../../../../service/client.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDataService } from 'src/app/service/user-data.service';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {

  role: string;
  dataSource: MatTableDataSource<Client> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'lastname',
    'gender',
    'birthDate',
    'actions',
  ];

  constructor(
    private cS: ClientService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private udS: UserDataService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.cS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.cS
      .list(String(sessionStorage.getItem('username')))
      .subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
  }

  getUserData() {
    this.udS.getUserData().subscribe(
      (data: any) => {
        this.role = data.role.name;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }
  clearFilter() {
    this.dataSource.filter = '';
  }
}
