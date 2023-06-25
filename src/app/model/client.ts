import { Nutritionist } from './nutritionist';
import { Role } from './role';
import { Trainer } from './trainer';

export class Client {
  idClient: number = 0;
  name: String = '';
  lastname: String = '';
  email: String = '';
  password: String = '';
  gender: String = '';
  birthDate: Date = new Date(Date.now());
  cellphone: String = '';
  status: boolean = true;
  role: Role = new Role();
  trainer: Trainer = new Trainer();
  nutritionist: Nutritionist = new Nutritionist();
}
