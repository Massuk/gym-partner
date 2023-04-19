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
  };
  return data;
};

//"@angular/material/prebuilt-themes/indigo-pink.css", tema original en angular.json
