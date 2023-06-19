import { Gym } from "./gym";
import { Nutritionist } from "./nutritionist";
import { Trainer } from "./trainer";

export class Client{
  idClient:number = 0;
  name:string = "";
  lastname: string = "";
  gender: string = "";
  cellphone: number = 0;
  hide: boolean = false;
  gym: Gym = new Gym();
  trainer: Trainer = new Trainer();
  nutritionist: Nutritionist = new Nutritionist();
}

/*
export class Client{
  id:number = 0;
  nameClient:string = "";
  personalTrainer: string = "";
  personalNutritionist: string = "";
  trainingPlanName: string = "";
  nutritionalPlanName: string = "";
}

*/
