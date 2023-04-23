import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingPlan } from 'src/app/model/training-plans';
import { TrainingPlansService } from 'src/app/service/training-plans.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-training-plans-listar',
  templateUrl: './training-plans-listar.component.html',
  styleUrls: ['./training-plans-listar.component.scss'],
})
export class TrainingPlansListarComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  lista: TrainingPlan[] = [];
  displayedColumns: string[] = [
    'number',
    'title',
    'description',
    'objective',
    'level',
    'startDate',
    'endDate',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<TrainingPlan> = new MatTableDataSource();

  ngOnInit(): void {
    this.tpS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.tpS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

  }

  constructor(
    private tpS: TrainingPlansService,
  ) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

}
