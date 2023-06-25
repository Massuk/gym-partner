import { Owner } from './owner';

export class Gym {
  idGym: number = 0;
  name: string = '';
  code: string = '';
  ruc: number = 0;
  rs: string = '';
  hide: boolean = false;
  owner: Owner = new Owner();
}
