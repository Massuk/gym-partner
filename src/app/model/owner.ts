import { Role } from "./role";

export class Owner {
  idUser: number = 0;
  name: string = '';
  lastname: string = '';
  gender: string = '';
  birthDate: Date = new Date(Date.now());
  cellphone: number = 0;
  email: string = '';
  password: string = '';
  status: boolean = true;
  role: Role = new Role();
}
