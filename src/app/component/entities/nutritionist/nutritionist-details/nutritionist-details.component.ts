import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NutritionistService } from 'src/app/service/nutritionist.service';

@Component({
  selector: 'app-nutritionist-details',
  templateUrl: './nutritionist-details.component.html',
  styleUrls: ['./nutritionist-details.component.scss'],
})
export class NutritionistDetailsComponent {
  idNutritionist: number = 0;
  form: FormGroup = new FormGroup({});
  constructor(
    private nS: NutritionistService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idNutritionist = data['id'];
    });
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(''),
      lastname: new FormControl(''),
      gender: new FormControl(''),
      birthDate: new FormControl(''),
      cellphone: new FormControl(''),
      email: new FormControl(''),
      dni: new FormControl(''),
      status: new FormControl('Activo'),
      hide: new FormControl('false'),
      password: new FormControl(''),
      salary: new FormControl(''),
      yearHired: new FormControl(''),
      //gym: new FormControl('', Validators.required),
    });
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
