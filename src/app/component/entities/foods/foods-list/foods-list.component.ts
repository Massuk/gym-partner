import { Component, OnInit } from '@angular/core';
import { food } from 'src/app/model/food';
import { MatTableDataSource } from '@angular/material/table';
import { FoodService } from 'src/app/service/foods.service';

@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit {
  lista: food[] = [];

  dataSource: MatTableDataSource<food> = new MatTableDataSource();
  constructor(private fS: FoodService) {}
  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  displayedColumns: string[] = ['id', 'Name', 'portions', 'calories'];
}
