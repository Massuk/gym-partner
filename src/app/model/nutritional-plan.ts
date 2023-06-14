export class NutritionalPlan {
  idNutritionalPlan: number = 0;
  title: string = '';
  status: string = '';
  objective: string = '';
  description: string = '';
  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(Date.now());
  recommendations: string = '';
  hide: boolean = false;
}
