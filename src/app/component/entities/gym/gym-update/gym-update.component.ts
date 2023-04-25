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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gS: GymService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot?.params['id'];
    this.form = new FormGroup({
      id: new FormControl(null),
      nameGym: new FormControl('', Validators.required),
      codeGym: new FormControl('', Validators.required),
      rucGym: new FormControl('', Validators.required),
      rsGym: new FormControl('', Validators.required)
    });

    if (id) {
      this.gS.get(id).subscribe(gym => {
        this.gym = gym;
        this.form.patchValue(this.gym);
      });
    }

    // Guardar automáticamente los cambios localmente en el navegador para que no se pierda la información
    // al recargar la página. Esto se cambiará cuando usemos Post
    /*
    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('gym-update-form', JSON.stringify(value));
    });*/
  }

  updateGym() {
    if (this.form.valid) {
      this.gS.update(this.form.value).subscribe(() => {
        this.router.navigate(['/gym']);
      });
    }
  }
}
