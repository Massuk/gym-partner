module.exports = function () {
  var data = {
    clients: [
      {
        id: 1,
        nameClient: "Miguel Flores",
        personalTrainer: "Omar Moya",
        personalNutritionist: "Nicole Sanchez",
      },
    ],
    gyms: [
      {
        id: 1,
        nameGym: "Smart Fit",
        codeGym: "SMARTFIT",
        rucGym: "20600597940",
        rsGym: "SMARTFIT PERU S.A.C.",
      },
      {
        id: 2,
        nameGym: "Galaxy Fitness",
        codeGym: "GALAXY",
        rucGym: "20102029811",
        rsGym: "FITNESS S.A.C.",
      },
      {
        id: 3,
        nameGym: "Gimnasio B2",
        codeGym: "GYMB2",
        rucGym: "20604750530",
        rsGym: "GYM TRECE S.A.C.",
      },
    ],
    trainingPlans: [
      {
        id: 1,
        title: "Entrenamiento PPL",
        description: "Primer mes utilizando plan de entrenamiento enfocado en rutinas de push, pull, legs",
        objective: "Ganar masa muscular",
        level: "Principiante",
        startDate: "2023-03-10",
        endDate: "2023-04-09",
        enable: "Vencido",
      },
      {
        id: 2,
        title: "Entrenamiento PPL",
        description: "Segundo mes utilizando plan de entrenamiento enfocado en rutinas de push, pull, legs",
        objective: "Ganar masa muscular",
        level: "Intermedio",
        startDate: "2023-04-10",
        endDate: "2023-05-09",
        enable: "Activo",
      },
      {
        id: 3,
        title: "Entrenamiento PPL",
        description: "Primer mes utilizando plan de entrenamiento enfocado en rutinas de push, pull, legs",
        objective: "Ganar masa muscular",
        level: "Principiante",
        startDate: "2023-03-10",
        endDate: "2023-04-9",
        enable: "Vencido",
      }
    ],
    exercises: [
      {
        id:1,
        nameExercise: "Sentadilla Bulgara",
	      series: 4,
	      kilograms: 12,
	      repetitions: 8,
      },
      {
        id:2,
        nameExercise: "Planchas",
	      series: 2,
	      kilograms: 4,
	      repetitions: 2,
      },
      {
        id:3,
        nameExercise: "Abdominales",
	      series: 3,
	      kilograms: 2,
	      repetitions: 5,
      },
      {
        id:4,
        nameExercise: "Sentadilla Normal",
	      series: 5,
	      kilograms: 2,
	      repetitions: 3,
      },
    ],
    nutritionalPlans: [
      {
        id: 1,
        titleNutritionalPlan: "Plan Nutricional de Stan Marsh Semana 1",
        statusNutritionalPlan: "Activo",
        objectiveNutritionalPlan: "Aumentar Masa Muscular",
        descriptionNutritionalPlan:
          "La dieta para aumentar la masa muscular incluye alimentos ricos en proteínas, grasas buenas y carbohidratos complejos ricos en fibras.",
        startDateNutritionalPlan: "2022-04-20",
        endDateNutritionalPlan: "2022-04-26",
        recommendationsNutritionalPlan:
          "Para cumplir el objetivo no debe saltarse las comidas y debe consumir más calorías de lo que gasta.",
      },
    ],
    foods: [
      {
        id:1,
        nameFood: "Pollo",
        portionsFood: "500 g",
        caloriesFood:"100 Kcal",
      },
      {
        id:2,
        nameFood: "Carne",
        portionsFood: "400 g",
        caloriesFood:"200 Kcal",
      },
      {
        id:3,
        nameFood: "Huevo",
        portionsFood: "80 g",
        caloriesFood:"80 Kcal",
      },
      {
        id:4,
        nameFood: "Queso",
        portionsFood: "100 g",
        caloriesFood:"240 Kcal",
      }
    ],

  };
  return data;
};
