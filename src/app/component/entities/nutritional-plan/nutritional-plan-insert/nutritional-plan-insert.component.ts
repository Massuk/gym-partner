import { Component } from '@angular/core';
import { NutritionalPlan } from 'src/app/model/nutritional-plan';
import { NutritionalPlanService } from 'src/app/service/nutritional-plan.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-nutritional-plan-insert',
  templateUrl: './nutritional-plan-insert.component.html',
  styleUrls: ['./nutritional-plan-insert.component.scss'],
})
export class NutritionalPlanInsertComponent {
  idClient: number = 0;
  idNutritionalPlan: number = 0;
  edit: boolean = false;
  title: string = 'Registrar plan de nuticion';
  form: FormGroup = new FormGroup({});
  nutritionalPlan: NutritionalPlan = new NutritionalPlan();
  minDate: Date = moment().add(0, 'days').toDate();
  constructor(
    private nPS: NutritionalPlanService,
    private router: Router,
    private route: ActivatedRoute,
    private c: ClientService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idNutritionalPlan = data['id'];
      this.idClient = this.getIdClientFromUrl();
      this.edit = data['id'] != null;
      this.init();
    });
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      objective: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      recommendations: new FormControl('', Validators.required),
      status: new FormControl(true, Validators.required),
    });
  }

  accept(): void {
    this.nutritionalPlan.title = this.form.value['title'];
    this.nutritionalPlan.objective = this.form.value['objective'];
    this.nutritionalPlan.description = this.form.value['description'];
    this.nutritionalPlan.startDate = this.form.value['startDate'];
    this.nutritionalPlan.endDate = this.form.value['endDate'];
    this.nutritionalPlan.recommendations = this.form.value['recommendations'];
    this.nutritionalPlan.status = true;
    this.nutritionalPlan.hide = false;

    if (this.form.valid) {
      if (this.edit) {
        this.nPS.listId(this.idNutritionalPlan).subscribe((data) => {
          data.title = this.nutritionalPlan.title;
          data.objective = this.nutritionalPlan.objective;
          data.description = this.nutritionalPlan.description;
          data.startDate = this.nutritionalPlan.startDate;
          data.endDate = this.nutritionalPlan.endDate;
          data.recommendations = this.nutritionalPlan.recommendations;
          this.nPS.update(data).subscribe(() => {
            this.nPS.list(this.idClient).subscribe((data) => {
              this.nPS.setList(data);
            });
          });
        });
      } else {
        this.c.listId(this.idClient).subscribe((data) => {
          this.nutritionalPlan.client = data;
          this.nPS.insert(this.nutritionalPlan).subscribe(() => {
            this.nPS.list(this.idClient).subscribe((data) => {
              this.nPS.setList(data);
            });
          });
        });
      }
    }
    this.router.navigate([
      '/dashboard/clients/' + this.idClient + '/nutritional-plans',
    ]);
  }

  init() {
    if (this.edit) {
      this.title = 'Editar plan de entrenamiento';
      this.nPS.listId(this.idNutritionalPlan).subscribe((data) => {
        this.form.patchValue({
          id: data.idNutritionalPlan,
          title: data.title,
          status: data.status,
          description: data.description,
          objective: data.objective,
          startDate: data.startDate,
          endDate: data.endDate,
          recommendations: data.recommendations
        });
      });
    }
  }

  getIdClientFromUrl(): number {
    const urlSegments = this.router.url.split('/');
    const index = urlSegments.indexOf('clients');
    if (index !== -1 && index + 1 < urlSegments.length) {
      return +urlSegments[index + 1];
    }
    return 0;
  }

  updateEndDate(event: MatDatepickerInputEvent<Date>) {
    const startDate = event.value;
    if (startDate) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Agrega 6 días a la fecha de inicio
      this.form.controls['endDate'].setValue(endDate);
    }
  }
}
