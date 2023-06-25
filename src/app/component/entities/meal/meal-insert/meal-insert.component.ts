import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meal } from 'src/app/model/meal';
import { MealService } from 'src/app/service/meal.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-meal-insert',
  templateUrl: './meal-insert.component.html',
  styleUrls: ['./meal-insert.component.scss']
})
export class MealInsertComponent implements OnInit{

  idMeal: number = 0;
  edit: boolean = false;

  form: FormGroup = new FormGroup({});
  meal: Meal = new Meal();


  constructor(
    private mS: MealService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.idMeal = data['id'];
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),

    })
  }

  aceptar(): void {
    this.meal.idMeal = this.form.value['id'];
    this.meal.title = this.form.value['title'];
    this.meal.day= this.form.value['day'];
    this.meal.type = this.form.value['type'];
    this.meal.hide = false;

    if (this.form.valid) {
      if (this.edit) {
        this.mS.update(this.meal).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      else {
        this.mS.insert(this.meal).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        })
      })
      }
      this.router.navigate(['/dashboard/meals'])
    }
  }

  init() {
    if (this.edit) {
      this.mS.listId(this.idMeal).subscribe((data) => {
        this.form.patchValue({
          id: data.idMeal,
          title: data.title,
          day: data.day,
          type: data.type
        });
      });
    }
  }


}
