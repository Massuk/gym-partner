import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gym } from 'src/app/model/gym';
import { GymService } from 'src/app/service/gym.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gym-update',
  templateUrl: './gym-update.component.html',
  styleUrls: ['./gym-update.component.scss']
})
export class GymUpdateComponent implements OnInit {

  gym: Gym = new Gym();
  form: FormGroup = new FormGroup({});
  idGym: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gS: GymService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      code: new FormControl('', Validators.required),
      ruc: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]),
      rs: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(params => {
      this.idGym = +params['id']; // Obtener el ID del gimnasio de los parámetros de la URL
      this.loadGymData();
    });
  }

  loadGymData() {
    this.gS.get(this.idGym).subscribe(gym => {
      this.gym = gym;
      this.form.patchValue(this.gym);
    });
  }

  updateGym() {
    if (this.form.valid) {
      const updatedGym: Gym = {
        ...this.gym,
        ...this.form.value
      };

      this.gS.update(updatedGym).subscribe(() => {
        this.router.navigate(['/dashboard/gyms']);
      });
    }
  }
}
