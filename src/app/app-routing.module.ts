import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './component/entities/panel/panel.component';
import { ClientComponent } from './component/entities/client/client.component';
import { GymComponent } from './component/entities/gym/gym.component';
import { GymListComponent } from './component/entities/gym/gym-list/gym-list.component';
import { GymInsertComponent } from './component/entities/gym/gym-insert/gym-insert.component';
import { GymUpdateComponent } from './component/entities/gym/gym-update/gym-update.component';
import { GymDeleteComponent } from './component/entities/gym/gym-delete/gym-delete.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { RegisterComponent } from './component/authentication/register/register.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { AboutComponent } from './component/landing-page/about/about.component';
import { ContactComponent } from './component/landing-page/contact/contact.component';
import { PricingComponent } from './component/landing-page/pricing/pricing.component';
import { IndexComponent } from './component/landing-page/index/index.component';
import { ExerciseComponent } from './component/entities/exercise/exercise.component';
import { ExerciseInsertComponent } from './component/entities/exercise/exercise-insert/exercise-insert.component';
import { NutritionalPlanComponent } from './component/entities/nutritional-plan/nutritional-plan.component';
import { NutritionalPlanInsertComponent } from './component/entities/nutritional-plan/nutritional-plan-insert/nutritional-plan-insert.component';
import { NutritionalPlanListComponent } from './component/entities/nutritional-plan/nutritional-plan-list/nutritional-plan-list.component';

import { TrainingPlansComponent } from './component/entities/training-plans/training-plans.component';
import { TrainingPlansInsertarComponent } from './component/entities/training-plans/training-plans-insert/training-plans-insert.component';
import { FoodsComponent } from './component/entities/foods/foods.component';
import { FoodsInsertComponent } from './component/entities/foods/foods-insert/foods-insert.component';
import { TrainingPlansListarComponent } from './component/entities/training-plans/training-plans-list/training-plans-list.component';
import { RoutineComponent } from './component/entities/routine/routine.component';
import { RoutineInsertComponent } from './component/entities/routine/routine-insert/routine-insert.component';
import { RoutineListComponent } from './component/entities/routine/routine-list/routine-list.component';
import { TrainerComponent } from './component/entities/trainer/trainer.component';
import { TrainerInsertComponent } from './component/entities/trainer/trainer-insert/trainer-insert.component';
import { TrainerListComponent } from './component/entities/trainer/trainer-list/trainer-list.component';
import { NutritionistComponent } from './component/entities/nutritionist/nutritionist.component';
import { NutritionistListComponent } from './component/entities/nutritionist/nutritionist-list/nutritionist-list.component';
import { NutritionistInsertComponent } from './component/entities/nutritionist/nutritionist-insert/nutritionist-insert.component';
import { NutritionistDetailsComponent } from './component/entities/nutritionist/nutritionist-details/nutritionist-details.component';
import { TrainerDetailsComponent } from './component/entities/trainer/trainer-details/trainer-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page/index', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'landing-page',
    component: LandingPageComponent,
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'pricing', component: PricingComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'panel', component: PanelComponent },
      {
        path: 'clients',
        component: ClientComponent,
        children: [
          {
            path: ':id/training-plans',
            component: TrainingPlansComponent,
            children: [
              {
                path: 'insert',
                component: TrainingPlansInsertarComponent,
              },
              {
                path: 'update/:id',
                component: TrainingPlansInsertarComponent,
              },
              {
                path: 'list',
                component: TrainingPlansListarComponent,
              },
            ],
          },
          {
            path: 'nutritional-plans',
            component: NutritionalPlanComponent,
            children: [
              {
                path: 'insert',
                component: NutritionalPlanInsertComponent,
              },
              { path: 'update/:id', component: NutritionalPlanInsertComponent },
              {
                path: 'list',
                component: NutritionalPlanListComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'gyms',
        component: GymComponent,
        children: [
          {
            path: 'list',
            component: GymListComponent,
          },
          {
            path: 'insert',
            component: GymInsertComponent,
          },
          {
            path: 'update/:id',
            component: GymUpdateComponent,
          },
        ],
      },
      {
        path: 'foods',
        component: FoodsComponent,
        children: [
          {
            path: 'insert',
            component: FoodsInsertComponent,
          },
          {
            path: 'edit/:id',
            component: FoodsInsertComponent,
          },
        ],
      },
      {
        path: 'exercises',
        component: ExerciseComponent,
        children: [
          {
            path: 'insert',
            component: ExerciseInsertComponent,
          },
          {
            path: 'update/:id',
            component: ExerciseInsertComponent,
          },
        ],
      },
      {
        path: 'routines',
        component: RoutineComponent,
        children: [
          {
            path: 'insert',
            component: RoutineInsertComponent,
          },
          {
            path: 'update/:id',
            component: RoutineInsertComponent,
          },
          {
            path: 'list',
            component: RoutineListComponent,
          },
        ],
      },
      {
        path: 'trainers',
        component: TrainerComponent,
        children: [
          {
            path: 'list/:id',
            component: TrainerDetailsComponent,
          },
          {
            path: 'insert',
            component: TrainerInsertComponent,
          },
          {
            path: 'update/:id',
            component: TrainerInsertComponent,
          },
        ],
      },
      {
        path: 'nutritionists',
        component: NutritionistComponent,
        children: [
          {
            path: 'list/:id',
            component: NutritionistDetailsComponent,
          },
          {
            path: 'insert',
            component: NutritionistInsertComponent,
          },
          {
            path: 'update/:id',
            component: NutritionistInsertComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
