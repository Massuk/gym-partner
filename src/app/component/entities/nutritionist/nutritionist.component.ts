import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nutritionist',
  templateUrl: './nutritionist.component.html',
  styleUrls: ['./nutritionist.component.scss'],
})
export class NutritionistComponent {
  ngOnInit(): void {}
  constructor(public route: ActivatedRoute) {}
}
