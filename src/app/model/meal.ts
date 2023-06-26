import { NutritionalPlan } from './nutritional-plan';
import { Routine } from './routine';

export class Meal {
  idMeal: number = 0;
  title: string = '';
  day: string = '';
  type: string = '';
  hide: boolean = false;
  nutritionalPlan: NutritionalPlan = new NutritionalPlan();
}
