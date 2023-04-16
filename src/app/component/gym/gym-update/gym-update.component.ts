import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gym } from 'src/app/model/gym';
import { GymService } from 'src/app/service/gym.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-gym-update',
  templateUrl: './gym-update.component.html',
  styleUrls: ['./gym-update.component.scss'],
})
export class GymUpdateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  gymToUpdate: Gym = new Gym();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();

  constructor(private gS: GymService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.gS.getGymToUpdate(id).subscribe(
      (gym) => {
        this.gymToUpdate = gym;
        this.form = new FormGroup({
          id: new FormControl(this.gymToUpdate.id, Validators.required),
          nameGym: new FormControl(this.gymToUpdate.nameGym, Validators.required),
          codeGym: new FormControl(this.gymToUpdate.codeGym, Validators.required),
          rucGym: new FormControl(this.gymToUpdate.rucGym, Validators.required),
          rsGym: new FormControl(this.gymToUpdate.rsGym, Validators.required)
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  actualizar(): void {
    if (this.form.value['id'].length > 0 && this.gymToUpdate) {
      this.gS.update(this.gymToUpdate.id, this.form.value).subscribe(() => {
        this.gS.list().subscribe((data) => {
          this.gS.setList(data);
          console.log(data)
        });
        this.router.navigate(['/gym']);
      });
    } else {
      this.mensaje = 'Ingrese el nombre del gimnasio';
    }
  }


}
