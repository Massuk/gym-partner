import { Component, OnInit, ViewChild } from '@angular/core';
import { food } from 'src/app/model/food';
import { MatTableDataSource } from '@angular/material/table';
import { FoodService } from 'src/app/service/foods.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit {
  lista: food[] = [];
  dataSource: MatTableDataSource<food> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'Name',
    'portions',
    'calories',
    'actions',
  ];

  constructor(private fS: FoodService) {}
  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.fS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
