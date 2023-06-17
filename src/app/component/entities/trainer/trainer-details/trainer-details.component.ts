import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Trainer } from 'src/app/model/trainer';
import { TrainerService } from 'src/app/service/trainer.service';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.scss']
})
export class TrainerDetailsComponent implements OnInit {
  idTrainer: number = 0;
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
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      lastname: new FormControl(''),
      gender: new FormControl(''),
      birthDate: new FormControl(''),
      cellphone: new FormControl(''),
      email: new FormControl(''),
      dni: new FormControl(''),
      status: new FormControl('Activo'),
      password: new FormControl(''),
      salary: new FormControl(''),
      yearHired: new FormControl('')
    })
  }

  init() {
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
