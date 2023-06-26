import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Gym } from 'src/app/model/gym';
import { Nutritionist } from 'src/app/model/nutritionist';
import { Role } from 'src/app/model/role';
import { GymService } from 'src/app/service/gym.service';
import { NutritionistService } from 'src/app/service/nutritionist.service';

@Component({
  selector: 'app-nutritionist-insert',
  templateUrl: './nutritionist-insert.component.html',
  styleUrls: ['./nutritionist-insert.component.scss'],
})
export class NutritionistInsertComponent implements OnInit {
  idNutritionist: number = 0;
  edit: boolean = false;
  title: string = 'Registrar nutricionista';
  form: FormGroup = new FormGroup({});
  nutritionist: Nutritionist = new Nutritionist();
  maxDate: Date = moment().add(0, 'days').toDate();
  constructor(
    private nS: NutritionistService,
    private gS: GymService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idNutritionist = data['id'];
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
    this.nutritionist.name = this.form.value['name'];
    this.nutritionist.lastname = this.form.value['lastname'];
    this.nutritionist.gender = this.form.value['gender'];
    this.nutritionist.birthDate = this.form.value['birthDate'];
    this.nutritionist.cellphone = this.form.value['cellphone'];
    this.nutritionist.email = this.form.value['email'];
    this.nutritionist.status = true;
    this.nutritionist.password = this.form.value['password'];
    this.nutritionist.yearHired = this.form.value['yearHired'];

    if (this.form.valid) {
      if (this.edit) {
        this.nS.listId(this.idNutritionist).subscribe((data) => {
          data.name = this.nutritionist.name;
          data.lastname = this.nutritionist.lastname;
          data.gender = this.nutritionist.gender;
          data.birthDate = this.nutritionist.birthDate;
          data.cellphone = this.nutritionist.cellphone;
          data.email = this.nutritionist.email;
          data.password = this.nutritionist.password;
          data.yearHired = this.nutritionist.yearHired;
          this.nS.update(data).subscribe(() => {
            this.nS
              .list(String(sessionStorage.getItem('username')))
              .subscribe((data) => {
                this.nS.setList(data);
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
            this.nutritionist.gym = gym;
            this.nutritionist.role = role;
            this.nS.insert(this.nutritionist).subscribe(() => {
              this.nS
                .list(String(sessionStorage.getItem('username')))
                .subscribe((data) => {
                  this.nS.setList(data);
                });
            });
          });
      }
      this.router.navigate(['/dashboard/nutritionists']);
    }
  }

  init() {
    if (this.edit) {
      this.title = 'Editar nutricionista';
      this.nS.listId(this.idNutritionist).subscribe((data) => {
        this.form.patchValue({
          id: data.idNutritionist,
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
