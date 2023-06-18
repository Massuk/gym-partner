import { Component } from '@angular/core';
import { NutritionalPlan } from 'src/app/model/nutritional-plan';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-nutritional-plan-insert',
  templateUrl: './nutritional-plan-insert.component.html',
  styleUrls: ['./nutritional-plan-insert.component.scss'],
})
export class NutritionalPlanInsertComponent {
  idNutritionalPlan: number = 0;
  edit: boolean = false;
  form: FormGroup = new FormGroup({});
  nutritionalPlan: NutritionalPlan = new NutritionalPlan();
  minDate: Date = moment().add(0, 'days').toDate();
  constructor(
    private nPS: NutritionalPlanService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idNutritionalPlan = data['id'];
      this.edit = data['id'] != null;
      this.init();
    });
    this.form = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', Validators.required),
      objective: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      recommendations: new FormControl('', Validators.required),
      status: new FormControl('Activo', Validators.required),
    });
  }

  accept(): void {
    this.nutritionalPlan.idNutritionalPlan = this.form.value['id'];
    this.nutritionalPlan.title = this.form.value['title'];
    this.nutritionalPlan.status = this.form.value['status'];
    this.nutritionalPlan.objective = this.form.value['objective'];
    this.nutritionalPlan.description = this.form.value['description'];
    this.nutritionalPlan.startDate = this.form.value['startDate'];
    this.nutritionalPlan.endDate = this.form.value['endDate'];
    this.nutritionalPlan.recommendations = this.form.value['recommendations'];
    this.nutritionalPlan.hide = false;

    if (this.form.valid) {
      if (this.edit) {
        this.nPS.update(this.nutritionalPlan).subscribe(() => {
          this.nPS.list().subscribe((data) => {
            this.nPS.setList(data);
          });
        });
      } else {
        this.nPS.insert(this.nutritionalPlan).subscribe(() => {
          this.nPS.list().subscribe((data) => {
            this.nPS.setList(data);
          });
        });
      }
      this.router.navigate(['/dashboard/nutritional-plans']);
    }
  }

  updateEndDate(event: MatDatepickerInputEvent<Date>) {
    const startDate = event.value;
    if (startDate) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Agrega 6 días a la fecha de inicio
      this.form.controls['endDate'].setValue(endDate);
    }
  }
  init() {
    if (this.edit) {
      this.nPS.listId(this.idNutritionalPlan).subscribe((data) => {
        this.form.patchValue({
          id: data.idNutritionalPlan,
          title: data.title,
          status: data.status,
          objective: data.objective,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          recommendations: data.recommendations
        });
      });
    }
  }

}
