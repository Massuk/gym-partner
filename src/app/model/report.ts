export class TrainersByGymDTO {
  name: string;
  trainerCount: number;
}

export class NutritionistsByGymDTO {
  name: string;
  nutritionistCount: number;
}

export class ClientsByTrainer {
  name: string;
  clientCount: number;
}

export class ClientsByNutritionist {
  name: string;
  clientCount: number;
}

export class CaloriesByNutritionalPlan{
  title: string;
  count: number;
}

export class GymByOwner{
  ownerName: string;
  gymName: string;
}
