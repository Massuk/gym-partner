import { Role } from "./role";

export class Owner {
  idUser: number = 0;
  name: string = '';
  lastName: string = '';
  gender: string = '';
  birthDate: Date = new Date(Date.now());
  cellphone: number = 0;
  email: string = '';
  password: string = '';
  role: Role = new Role();
}
