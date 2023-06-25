/*import { TrainingPlan } from "./training-plan";*/

import { TrainingPlan } from './training-plan';

export class Routine {
  idRoutine: number = 0;
  title: string = '';
  description: string = '';
  day: string = '';
  hide: boolean = false;
  trainingPlan: TrainingPlan = new TrainingPlan();
}
