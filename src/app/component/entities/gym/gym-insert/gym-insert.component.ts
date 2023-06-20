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

  constructor(private gS: GymService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      code: new FormControl('', Validators.required),
      ruc: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]),
      rs: new FormControl('', Validators.required),
    });
  }

  insert(): void {
    console.log('Form values:', this.form.value);
    this.gym.idGym = this.form.value['id'];
    this.gym.name = this.form.value['name'];
    this.gym.code = this.form.value['code'];
    this.gym.ruc = this.form.value['ruc'];
    this.gym.rs = this.form.value['rs'];

    if (this.form.valid) {
      this.gS.insert(this.gym).subscribe((data) => {
        this.gS.list().subscribe((data) => {
          this.gS.setList(data);
        });
      });
      this.router.navigate(['dashboard/gyms']);
    }
  }
}
