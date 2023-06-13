import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gym } from 'src/app/model/gym';
import * as moment from 'moment';
import { GymService } from 'src/app/service/gym.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gym-insert',
  templateUrl: './gym-insert.component.html',
  styleUrls: ['./gym-insert.component.scss'],
})
export class GymInsertComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  gym: Gym = new Gym();
  maxFecha: Date = moment().add(-1, 'days').toDate();

  constructor(private gS: GymService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      nameGym: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      codeGym: new FormControl('', Validators.required),
      rucGym: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]),
      rsGym: new FormControl('', Validators.required),
    });
  }

  insertar(): void {
    this.gym.idGym = this.form.value['id'];
    this.gym.nameGym = this.form.value['nameGym'];
    this.gym.codeGym = this.form.value['codeGym'];
    this.gym.rucGym = this.form.value['rucGym'];
    this.gym.rsGym = this.form.value['rsGym'];

    if (this.form.valid) {
      this.gS.insert(this.gym).subscribe((data) => {
        this.gS.list().subscribe((data) => {
          this.gS.setList(data);
        });
      });
      this.router.navigate(['dashboard/gym']);
    }
  }
}
