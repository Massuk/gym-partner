import { Client } from "./client";

export class NutritionalPlan {
  idNutritionalPlan: number = 0;
  title: string = '';
  objective: string = '';
  description: string = '';
  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(Date.now());
  recommendations: string = '';
  status: boolean = true;
  hide: boolean = false;
  client: Client = new Client();
}
