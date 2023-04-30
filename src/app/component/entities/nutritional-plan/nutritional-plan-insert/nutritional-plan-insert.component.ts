import { Component } from '@angular/core';
import { NutritionalPlan } from 'src/app/model/nutritionalPlan';
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
  id: number = 0;
  edit: boolean = false;
  form: FormGroup = new FormGroup({});
  nutritionalPlan: NutritionalPlan = new NutritionalPlan();
  mensaje: string = '';
  minFecha: Date = moment().add(0, 'days').toDate();
  constructor(
    private pNS: NutritionalPlanService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edit = data['id'] != null;
      this.init();
    });
    this.form = new FormGroup({
      id: new FormControl(),
      titleNutritionalPlan: new FormControl('', Validators.required),
      statusNutritionalPlan: new FormControl('', Validators.required),
      objectiveNutritionalPlan: new FormControl('', Validators.required),
      descriptionNutritionalPlan: new FormControl('', Validators.required),
      startDateNutritionalPlan: new FormControl('', Validators.required),
      endDateNutritionalPlan: new FormControl('', Validators.required),
      recommendationsNutritionalPlan: new FormControl('', Validators.required),
    });
  }
  accept(): void {

    if (this.form.valid) {
      const formValues = this.form.value;
      const nutritionalPlanValues = {
        id: formValues.id,
        titleNutritionalPlan: formValues.titleNutritionalPlan,
        statusNutritionalPlan: formValues.statusNutritionalPlan,
        objectiveNutritionalPlan: formValues.objectiveNutritionalPlan,
        descriptionNutritionalPlan: formValues.descriptionNutritionalPlan,
        startDateNutritionalPlan: formValues.startDateNutritionalPlan,
        endDateNutritionalPlan: formValues.endDateNutritionalPlan,
        recommendationsNutritionalPlan: formValues.recommendationsNutritionalPlan
      };

      if (this.edit) {
        // guardar lo actualizado
        this.pNS.update(nutritionalPlanValues).subscribe(() => {
          this.pNS.list().subscribe((data) => {
            this.pNS.setList(data);
          });
        });
      } else {
        this.pNS.insert(nutritionalPlanValues).subscribe(() => {
          this.pNS.list().subscribe((data) => {
            this.pNS.setList(data);
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
      this.form.controls['endDateNutritionalPlan'].setValue(endDate);
    }
  }
  init() {
    if (this.edit) {
      this.pNS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          titleNutritionalPlan: new FormControl(data.titleNutritionalPlan),
          statusNutritionalPlan: new FormControl(data.statusNutritionalPlan),
          objectiveNutritionalPlan: new FormControl(
            data.objectiveNutritionalPlan
          ),
          descriptionNutritionalPlan: new FormControl(
            data.descriptionNutritionalPlan
          ),
          startDateNutritionalPlan: new FormControl(
            data.startDateNutritionalPlan
          ),
          endDateNutritionalPlan: new FormControl(data.endDateNutritionalPlan),
          recommendationsNutritionalPlan: new FormControl(
            data.recommendationsNutritionalPlan
          ),
        });
      });
    }
  }

}
