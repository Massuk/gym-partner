import { Client } from './client';

export class TrainingPlan {
  idTrainingPlan: number = 0;
  title: string = '';
  description: string = '';
  objective: string = '';
  level: string = '';
  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(Date.now());
  status: boolean = true;
  hide: boolean = false;
  client: Client = new Client();
}
