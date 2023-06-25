import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Routine } from 'src/app/model/routine';
import { RoutineService } from 'src/app/service/routine.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-routine-insert',
  templateUrl: './routine-insert.component.html',
  styleUrls: ['./routine-insert.component.scss']
})
export class RoutineInsertComponent implements OnInit{

  idRoutine: number = 0;
  edit: boolean = false;

  form: FormGroup = new FormGroup({});
  routine: Routine = new Routine();


  constructor(
    private rS: RoutineService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.idRoutine = data['id'];
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),

    })
  }

  aceptar(): void {
    this.routine.idRoutine = this.form.value['id'];
    this.routine.title = this.form.value['title'];
    this.routine.day= this.form.value['day'];
    this.routine.description = this.form.value['description'];
    this.routine.hide = false;

    if (this.form.valid) {
      if (this.edit) {
        this.rS.update(this.routine).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      else {
        this.rS.insert(this.routine).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        })
      })
      }
      this.router.navigate(['/dashboard/routines'])
    }
  }

  init() {
    if (this.edit) {
      this.rS.listId(this.idRoutine).subscribe((data) => {
        this.form.patchValue({
          id: data.idRoutine,
          title: data.title,
          day: data.day,
          description: data.description
        });
      });
    }
  }
}
