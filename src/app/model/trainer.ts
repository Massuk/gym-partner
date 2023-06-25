import { Gym } from "./gym";
import { Role } from "./role";

export class Trainer {
  idTrainer: number = 0;
  name: String = '';
  lastname: String = '';
  email: String = '';
  password: String = '';
  gender: String = '';
  birthDate: Date = new Date(Date.now());
  cellphone: String = '';
  status: boolean = true;
  role: Role = new Role();
  yearHired: Date = new Date(Date.now());
  gym: Gym = new Gym();
}