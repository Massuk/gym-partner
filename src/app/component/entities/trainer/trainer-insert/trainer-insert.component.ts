import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Trainer } from 'src/app/model/trainer';
import { TrainerService } from 'src/app/service/trainer.service';

@Component({
  selector: 'app-trainer-insert',
  templateUrl: './trainer-insert.component.html',
  styleUrls: ['./trainer-insert.component.scss']
})
export class TrainerInsertComponent implements OnInit {
  idTrainer: number = 0;
  edit: boolean = false;

  form: FormGroup = new FormGroup({});
  trainer: Trainer = new Trainer();



  constructor(
    private tS: TrainerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.idTrainer = data['id'];
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      cellphone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      status: new FormControl('Activo', Validators.required),
      password: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      yearHired: new FormControl('', Validators.required),
      gym: new FormControl()
    })
  }

  aceptar(): void {
    this.trainer.idTrainer = this.form.value['id'];
    this.trainer.name = this.form.value['name'];
    this.trainer.lastname = this.form.value['lastname'];
    this.trainer.gender = this.form.value['gender'];
    this.trainer.birthDate = this.form.value['birthDate'];
    this.trainer.cellphone = this.form.value['cellphone'];
    this.trainer.email = this.form.value['email'];
    this.trainer.dni = this.form.value['dni'];
    this.trainer.status = this.form.value['status'];
    this.trainer.hide = false;
    this.trainer.password = this.form.value['password'];
    this.trainer.salary = this.form.value['salary'];
    this.trainer.yearHired = this.form.value['yearHired']
    this.trainer.idRol = 2; //Designar el un numero para el rol trainer
    this.trainer.gym = this.form.value['gym']//Ver la logica para asignar el id del gym creado;

    if (this.form.valid) {
      if (this.edit) {
        this.tS.update(this.trainer).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
      else {
        this.tS.insert(this.trainer).subscribe(() => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        })
      })
      }
      this.router.navigate(['/dashboard/trainers'])
    }
  }

  init() {
    if (this.edit) {
      this.tS.listId(this.idTrainer).subscribe((data) => {
        this.form.patchValue({
          id: data.idTrainer,
          name: data.name,
          lastname: data.lastname,
          gender: data.gender,
          birthDate: data.birthDate,
          cellphone: data.cellphone,
          email: data.email,
          dni: data.dni,
          status: data.status,
          password: data.password,
          salary: data.salary,
          yearHired: data.yearHired
        });
      });
    }
  }

  setCurrentYear() {
    const currentYear = new Date().getFullYear();
    this.form.controls['yearHired'].setValue(currentYear);
  }
}
