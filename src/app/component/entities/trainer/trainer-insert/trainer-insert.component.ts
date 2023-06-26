import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Gym } from 'src/app/model/gym';
import { Role } from 'src/app/model/role';
import { Trainer } from 'src/app/model/trainer';
import { GymService } from 'src/app/service/gym.service';
import { TrainerService } from 'src/app/service/trainer.service';

@Component({
  selector: 'app-trainer-insert',
  templateUrl: './trainer-insert.component.html',
  styleUrls: ['./trainer-insert.component.scss'],
})
export class TrainerInsertComponent implements OnInit {
  idTrainer: number = 0;
  edit: boolean = false;
  title: string = 'Registrar entrenador';
  form: FormGroup = new FormGroup({});
  trainer: Trainer = new Trainer();
  maxDate: Date = moment().add(0, 'days').toDate();

  constructor(
    private tS: TrainerService,
    private gS: GymService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idTrainer = data['id'];
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      cellphone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      yearHired: new FormControl('', Validators.required),
    });
  }

  accept(): void {
    this.trainer.name = this.form.value['name'];
    this.trainer.lastname = this.form.value['lastname'];
    this.trainer.gender = this.form.value['gender'];
    this.trainer.birthDate = this.form.value['birthDate'];
    this.trainer.cellphone = this.form.value['cellphone'];
    this.trainer.email = this.form.value['email'];
    this.trainer.status = true;
    this.trainer.password = this.form.value['password'];
    this.trainer.yearHired = this.form.value['yearHired'];

    if (this.form.valid) {
      if (this.edit) {
        this.tS.listId(this.idTrainer).subscribe((data) => {
          data.name = this.trainer.name;
          data.lastname = this.trainer.lastname;
          data.gender = this.trainer.gender;
          data.birthDate = this.trainer.birthDate;
          data.cellphone = this.trainer.cellphone;
          data.email = this.trainer.email;
          data.yearHired = this.trainer.yearHired;
          this.tS.update(data).subscribe(() => {
            this.tS
              .list(String(sessionStorage.getItem('username')))
              .subscribe((data) => {
                this.tS.setList(data);
              });
          });
        });
      } else {
        this.gS
          .listGymByUsername(String(sessionStorage.getItem('username')))
          .subscribe((data) => {
            let gym = new Gym();
            let role = new Role();
            gym.idGym = data.idGym;
            gym.name = data.name;
            gym.rs = data.rs;
            gym.ruc = data.ruc;
            gym.code = data.code;
            gym.hide = data.hide;
            gym.owner = data.owner;
            role.idRole = data.owner.role.idRole;
            role.name = data.owner.role.name;
            this.trainer.gym = gym;
            this.trainer.role = role;
            this.tS.insert(this.trainer).subscribe(() => {
              this.tS
                .list(String(sessionStorage.getItem('username')))
                .subscribe((data) => {
                  this.tS.setList(data);
                });
            });
          });
      }
      this.router.navigate(['/dashboard/trainers']);
    }
  }

  init() {
    if (this.edit) {
      this.title = 'Editar entrenador';
      this.tS.listId(this.idTrainer).subscribe((data) => {
        console.log(data);
        this.form.patchValue({
          id: data.idTrainer,
          name: data.name,
          lastname: data.lastname,
          gender: data.gender,
          birthDate: data.birthDate,
          cellphone: data.cellphone,
          email: data.email,
          status: data.status,
          password: data.password,
          yearHired: data.yearHired,
        });
      });
    }
  }
}
