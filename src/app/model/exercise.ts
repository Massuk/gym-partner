import { Routine } from './routine';

export class Exercise {
  idExercise: number = 0;
  name: string = '';
  series: number = 0;
  kilograms: number = 0;
  repetitions: number = 0;
  routine: Routine = new Routine();
}
