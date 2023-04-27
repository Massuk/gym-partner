import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { exercise } from 'src/app/model/exercise';
import { ExerciseService } from 'src/app/service/exercise.service';
import { ActivatedRoute, Params,Router } from '@angular/router';

@Component({
  selector: 'app-exercise-insert',
  templateUrl: './exercise-insert.component.html',
  styleUrls: ['./exercise-insert.component.scss']
})
export class ExerciseInsertComponent implements OnInit{


  id:number = 0;
  edicion:boolean = false;


  form:FormGroup = new FormGroup({});
  exercise:exercise = new exercise();
  mensaje:string ="";

  constructor(
    private eS:ExerciseService,
    private router:Router,
    private route:ActivatedRoute
  ){ }

  ngOnInit(): void {

//modificar
this.route.params.subscribe((data:Params)=>{
  this.id = data['id'];
  this.edicion = data['id'] != null;
  this.init();
});

    this.form = new FormGroup({

      id:new FormControl(),
      nameExercise:new FormControl(),
      series:new FormControl(),
      kilograms:new FormControl(),
      repetitions:new FormControl(),

    });
  }

  aceptar():void{
    this.exercise.id = this.form.value['id'];
    this.exercise.nameExercise= this.form.value['nameExercise'];
    this.exercise.series= this.form.value['series'];
    this.exercise.kilograms= this.form.value['kilograms'];
    this.exercise.repetitions= this.form.value['repetitions'];

    if(this.form.value['nameExercise'].length > 0){
      if(this.edicion) {
        this.eS.update(this.exercise).subscribe(() =>{
            this.eS.list().subscribe((data)=>{
              this.eS.setList(data);
            });
        });
      }
      else {
        this.eS.insert(this.exercise).subscribe((data)=>{
        this.eS.list().subscribe((data)=>{
          this.eS.setList(data);
          })
      })
      }

//el eS llama al insert,  luego lo lista y luego lo setea

// le date la ruta para que navegue para eso debo crear la ruta en el routing
this.router.navigate(['/dashboard/exercises']); // una vez que inserte se ira de nuevo a la ruta padre exercises (lista)
    }
    else {
        this.mensaje='Ingrese el nombre del ejercicio ';
        console.log(this.mensaje);
    }
  }

 //modificar

 init(){
  if(this.edicion){
    this.eS.listId(this.id).subscribe((data)=>{

        this.form= new FormGroup({

          id:new FormControl(data.id),
          nameExercise:new FormControl(data.nameExercise),
          series:new FormControl(data.series),
          kilograms:new FormControl(data.kilograms),
          repetitions:new FormControl(data.repetitions),

        });
    });
  }

 }
}
