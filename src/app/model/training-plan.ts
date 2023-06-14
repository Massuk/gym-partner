export class TrainingPlan {
  idTrainingPlan: number = 0;
  title: string = "";
  description: string = "";
  objective: string = "";
  level: string = "";
  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(Date.now());
  status: string = "";
  hide: boolean = false;
}
