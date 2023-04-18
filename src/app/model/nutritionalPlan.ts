export class NutritionalPlan {
  id: number = 0;
  titleNutritionalPlan: string = '';
  statusNutritionalPlan: string = '';
  objectiveNutritionalPlan: string = '';
  descriptionNutritionalPlan: string = '';
  startDateNutritionalPlan: Date = new Date(Date.now());
  endDateNutritionalPlan: Date = new Date(Date.now());
  recommendationsNutritionalPlan: string = '';
}
