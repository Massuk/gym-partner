import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Gym } from 'src/app/model/gym';
import { GymService } from 'src/app/service/gym.service';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.scss']
})
export class GymListComponent implements OnInit{

  ngOnInit(): void {
    this.gS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  constructor(private gS: GymService) {
    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.gS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }



  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  lista: Gym[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'codigo', 'ruc', 'razon', 'edit'];
  dataSource: MatTableDataSource<Gym> = new MatTableDataSource();



}
