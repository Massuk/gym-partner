import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Nutritionist } from 'src/app/model/nutritionist';
import { NutritionistService } from 'src/app/service/nutritionist.service';

@Component({
  selector: 'app-nutritionist-insert',
  templateUrl: './nutritionist-insert.component.html',
  styleUrls: ['./nutritionist-insert.component.scss'],
})
export class NutritionistInsertComponent {
  idNutritionist: number = 0;
  edit: boolean = false;
  title: string = 'Registrar nutricionista';
  form: FormGroup = new FormGroup({});
  nutritionist: Nutritionist = new Nutritionist();
  maxDate: Date = moment().add(0, 'days').toDate();
  constructor(
    private nS: NutritionistService,
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
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      cellphone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      status: new FormControl('Activo', Validators.required),
      hide: new FormControl('false', Validators.required),
      password: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      yearHired: new FormControl('', Validators.required),
      //gym: new FormControl('', Validators.required),
    });
  }

  accept(): void {
    console.log(this.idNutritionist);
    this.nutritionist.idNutritionist = this.idNutritionist;
    this.nutritionist.name = this.form.value['name'];
    this.nutritionist.lastname = this.form.value['lastname'];
    this.nutritionist.gender = this.form.value['gender'];
    this.nutritionist.birthDate = this.form.value['birthDate'];
    this.nutritionist.cellphone = this.form.value['cellphone'];
    this.nutritionist.email = this.form.value['email'];
    this.nutritionist.dni = this.form.value['dni'];
    this.nutritionist.status = this.form.value['status'];
    this.nutritionist.hide = this.form.value['hide'];
    this.nutritionist.password = this.form.value['password'];
    this.nutritionist.salary = this.form.value['salary'];
    this.nutritionist.yearHired = this.form.value['yearHired'];
    this.nutritionist.gym = this.form.value['gym'];
    if (this.form.valid) {
      if (this.edit) {
        this.nS.update(this.nutritionist).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
        console.log(this.nutritionist);
      } else {
        this.nS.insert(this.nutritionist).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
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
          dni: data.dni,
          status: data.status,
          hide: data.hide,
          password: data.password,
          salary: data.salary,
          yearHired: data.yearHired,
        });
      });
    }
  }
}
