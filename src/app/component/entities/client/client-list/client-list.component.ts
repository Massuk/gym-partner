import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/model/client';
import { ClientService } from '../../../../service/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {

  constructor(private cS: ClientService,){}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  clientList: Client[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'trainer',
    'nutritionist',
    'actions',
  ];


  dataSource: MatTableDataSource<Client> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

}
