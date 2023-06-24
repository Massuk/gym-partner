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
export class TrainerDetailsComponent {
  idTrainer: number = 0;
  form: FormGroup = new FormGroup({});

  constructor(
    private tS: TrainerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idTrainer = data['id'];
    });

    this.form = new FormGroup({
      name: new FormControl(''),
      lastname: new FormControl(''),
      gender: new FormControl(''),
      birthDate: new FormControl(''),
      cellphone: new FormControl(''),
      email: new FormControl(''),
      yearHired: new FormControl('')
    })
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
          yearHired: data.yearHired
        });
      });
  }
    
}
