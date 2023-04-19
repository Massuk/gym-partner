
import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/service/exercise.service';
import { exercise } from 'src/app/model/exercise';
import {MatTableDataSource} from '@angular/material/table'
@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})

export class ExerciseListComponent implements OnInit{
  lista:exercise[]=[];
  dataSource:MatTableDataSource<exercise> = new MatTableDataSource();
  displayedColumns:string[] = ['id','nameExercise','series','kilograms','repetitions','Editar']
  constructor(private eS:ExerciseService){}
  ngOnInit(): void {
    this.eS.list().subscribe(data=>{this.dataSource = new MatTableDataSource(data)})
    this.eS.getList().subscribe(data=>(this.dataSource=new MatTableDataSource(data)))
  }
  filtrar(exercise:any){
    this.dataSource.filter =exercise.target.value.trim();
  }

}
