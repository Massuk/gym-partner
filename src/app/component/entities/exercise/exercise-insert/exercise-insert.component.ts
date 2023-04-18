import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { exercise } from 'src/app/model/exercise';
import { ExerciseService } from 'src/app/service/exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-insert',
  templateUrl: './exercise-insert.component.html',
  styleUrls: ['./exercise-insert.component.scss']
})

export class ExerciseInsertComponent implements OnInit{

  form:FormGroup = new FormGroup({});
  exercise:exercise = new exercise();
  mensaje:string ="";

  constructor(private eS:ExerciseService, private router:Router){}

  ngOnInit(): void {
    this.form = new FormGroup({

      id:new FormControl(),
      nameExercise:new FormControl(),
      series:new FormControl(),
      kilograms:new FormControl(),
      repetitions:new FormControl(),
      dateExercise:new FormControl(),

    });
  }

  aceptar():void{
    this.exercise.id = this.form.value['id'];
    this.exercise.nameExercise= this.form.value['nameExercise'];
    this.exercise.series= this.form.value['series'];
    this.exercise.kilograms= this.form.value['kilograms'];
    this.exercise.repetitions= this.form.value['repetitions'];


    if(this.form.value['nameExercise'].length>0 && this.form.value['series'].length>0){

this.eS.insert(this.exercise).subscribe(data=>{this.eS.list().subscribe(data=>{this.eS.setList(data);})})
this.router.navigate(['exercises']);

    }
    else {

        this.mensaje="COMPLETA LOS CAMPOS SOLICITADOS";

    }


  }


}
