import { NgModule } from '@angular/core';
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
      { path: 'clients', component: ClientComponent },
      {
        path: 'gym',
        component: GymComponent,
        children: [
          {
            path: 'gym-list',
            component: GymListComponent,
          },
          {
            path: 'gym-insert',
            component: GymInsertComponent,
          },
          {
            path: 'gym-update/:id',
            component: GymUpdateComponent,
          },
          {
            path: 'gym-delete/:id',
            component: GymDeleteComponent,
          },
        ],
      },
      {
        path: 'foods',
        component: FoodsComponent,
        children: [
          {
            path: 'foods-insert',
            component: FoodsInsertComponent,
          },
          {
            path: 'edicion/:id',
            component: FoodsInsertComponent,
          },
        ],
      },
      {
        path: 'exercises',
        component: ExerciseComponent,
        children: [
          {
            path: 'exercise-insert',
            component: ExerciseInsertComponent,
          },
          {
            path: 'edicion/:id',
            component: ExerciseInsertComponent,
          },
        ],
      },
      {
        path: 'nutritional-plans',
        component: NutritionalPlanComponent,
        children: [
          {
            path: 'nutritional-plans-insert',
            component: NutritionalPlanInsertComponent,
          },
          { path: 'update/:id', component: NutritionalPlanInsertComponent },
          {
            path: 'nutritional-plans-list',
            component: NutritionalPlanListComponent,
          },
        ],
      },
      {
        path: 'trainingPlans',
        component: TrainingPlansComponent,
        children: [
          {
            path: 'tpInsertar',
            component: TrainingPlansInsertarComponent,
          },
          {
            path: 'edicion/:id',
            component: TrainingPlansInsertarComponent,
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
