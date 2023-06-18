import { Gym } from './gym';

export class Nutritionist {
  idNutritionist: number = 0;
  name: string = '';
  lastname: string = '';
  gender: string = '';
  birthDate: Date = new Date(Date.now());
  cellphone: number = 0;
  email: string = '';
  dni: string = '';
  status: string = '';
  hide: boolean = false;
  password: string = '';
  salary: number = 0;
  yearHired: Date = new Date(Date.now());
  gym: Gym = new Gym();
}
