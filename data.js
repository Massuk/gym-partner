module.exports = function () {
  var data = {
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
      {
        id: 4,
        nameGym: "Gym Plus",
        codeGym: "GYMPLUS",
        rucGym: "20536570013",
        rsGym: "GYM PLUS S.A.C.",
      },
      {
        id: 5,
        nameGym: "BodyTech",
        codeGym: "BODYTECH",
        rucGym: "20492858766",
        rsGym: "INVERDESA PERU S.A.C.",
      },
      {
        id: 6,
        nameGym: "Sportlife Fitness Club",
        codeGym: "YTBGYM",
        rucGym: "20423621827",
        rsGym: "YTB FITNESS S.A.C.",
      },
      {
        id: 7,
        nameGym: "Gold Gym",
        codeGym: "GOLDGYM",
        rucGym: "20600307194",
        rsGym: "GOLD GYM S.A.C.",
      },
      {
        id: 8,
        nameGym: "X Sport Gym",
        codeGym: "XSPORT",
        rucGym: "20555032146",
        rsGym: "SPORT FITNESS PERU S.A.C",
      },
      {
        id: 9,
        nameGym: "Iron House Gym",
        codeGym: "IRONHOUSE",
        rucGym: "20581234571",
        rsGym: "IRON HOUSE S.A.C.",
      },
      {
        id: 10,
        nameGym: "Fit Stop",
        codeGym: "FITSTOP",
        rucGym: "20452467951",
        rsGym: "FIT STOP S.A.C.",
      },
      {
        id: 11,
        nameGym: "Flex Fitness",
        codeGym: "FLEXFIT",
        rucGym: "20569873691",
        rsGym: "FLEX FITNESS S.A.C.",
      },
      {
        id: 12,
        nameGym: "MegaSport Gym",
        codeGym: "MEGASPORT",
        rucGym: "20601234567",
        rsGym: "MEGASPORT S.A.C.",
      },
      {
        id: 13,
        nameGym: "Oxigeno Gym",
        codeGym: "OXIGENO",
        rucGym: "20156789012",
        rsGym: "OXIGENO FITNESS S.A.C.",
      },
      {
        id: 14,
        nameGym: "Gym Zone",
        codeGym: "GYMZONE",
        rucGym: "20234567891",
        rsGym: "GYM ZONE PERU S.A.C.",
      },
      {
        id: 15,
        nameGym: "Elite Fitness",
        codeGym: "ELITEFIT",
        rucGym: "20493847561",
        rsGym: "ELITE FITNESS S.A.C.",
      },
      {
        id: 16,
        nameGym: "Power House Gym",
        codeGym: "POWERHOUSE",
        rucGym: "20784562139",
        rsGym: "POWER HOUSE FITNESS S.A.C.",
      },
      {
        id: 17,
        nameGym: "Power Fitness",
        codeGym: "POWERFIT",
        rucGym: "20605794315",
        rsGym: "POWER FITNESS S.A.C.",
      },
      {
        id: 18,
        nameGym: "Iron Gym",
        codeGym: "IRONGYM",
        rucGym: "20591486985",
        rsGym: "IRON GYM PERU S.A.C.",
      },
      {
        id: 19,
        nameGym: "The Gym",
        codeGym: "THEGYM",
        rucGym: "20602046701",
        rsGym: "THE GYM PERU S.A.C.",
      },
      {
        id: 20,
        nameGym: "Fitness 24",
        codeGym: "FIT24",
        rucGym: "20601912547",
        rsGym: "FITNESS 24 S.A.C.",
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
        endDate: "2023-04-9",
        enable: "Vencido",
      },
      {
        id: 2,
        title: "Entrenamiento PPL",
        description: "Segundo mes utilizando plan de entrenamiento enfocado en rutinas de push, pull, legs",
        objective: "Ganar masa muscular",
        level: "Intermedio",
        startDate: "2023-04-10",
        endDate: "2023-05-9",
        enable: "Activo",
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
        startDateNutritionalPlan: "2023-04-10",
        endDateNutritionalPlan: "2023-04-16",
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

//"@angular/material/prebuilt-themes/indigo-pink.css", tema original en angular.json
