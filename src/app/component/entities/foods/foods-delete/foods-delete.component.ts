import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/service/foods.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-foods-delete',
  templateUrl: './foods-delete.component.html',
  styleUrls: ['./foods-delete.component.scss']
})
export class FoodsDeleteComponent {

  foodId: number=0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fS: FoodService,
    private dialog: MatDialog
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.foodId = +params['id']; // Convierte el parámetro a número
    });
  }
}
