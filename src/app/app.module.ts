import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './component/dashboard/body/body.component';
import { SidenavComponent } from './component//dashboard/sidenav/sidenav.component';
import { PanelComponent } from './component/entities/panel/panel.component';
import { ClientComponent } from './component/entities/client/client.component';
import { GymUpdateComponent } from './component/entities/gym/gym-update/gym-update.component';
import { GymDeleteComponent } from './component/entities/gym/gym-delete/gym-delete.component';
import { GymComponent } from './component/entities/gym/gym.component';
import { GymListComponent } from './component/entities/gym/gym-list/gym-list.component';
import { HeaderComponent } from './component/dashboard/header/header.component';
import { GymInsertComponent } from './component/entities/gym/gym-insert/gym-insert.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardActions, MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogPopupComponent } from './component/dashboard/dialog-popup/dialog-popup.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { EntitiesComponent } from './component/entities/entities.component';
import { RegisterComponent } from './component/authentication/register/register.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { AboutComponent } from './component/landing-page/about/about.component';
import { ContactComponent } from './component/landing-page/contact/contact.component';
import { PricingComponent } from './component/landing-page/pricing/pricing.component';
import { IndexComponent } from './component/landing-page/index/index.component';
import { MatMenuModule } from '@angular/material/menu';

import { TrainingPlansComponent } from './component/entities/training-plans/training-plans.component';
import { NutritionalPlanComponent } from './component/entities/nutritional-plan/nutritional-plan.component';
import { NutritionalPlanListComponent } from './component/entities/nutritional-plan/nutritional-plan-list/nutritional-plan-list.component';
import { NutritionalPlanInsertComponent } from './component/entities/nutritional-plan/nutritional-plan-insert/nutritional-plan-insert.component';
import { NutritionalPlanDeleteComponent } from './component/entities/nutritional-plan/nutritional-plan-delete/nutritional-plan-delete.component';
import { ExerciseComponent } from './component/entities/exercise/exercise.component';
import { ExerciseListComponent } from './component/entities/exercise/exercise-list/exercise-list.component';
import { ExerciseInsertComponent } from './component/entities/exercise/exercise-insert/exercise-insert.component';
import { TrainingPlansListarComponent } from './component/entities/training-plans/training-plans-list/training-plans-list.component';
import { TrainingPlansInsertarComponent } from './component/entities/training-plans/training-plans-insert/training-plans-insert.component';
import { FoodsComponent } from './component/entities/foods/foods.component';
import { FoodsListComponent } from './component/entities/foods/foods-list/foods-list.component';
import { FoodsInsertComponent } from './component/entities/foods/foods-insert/foods-insert.component';
import { TrainingPlansDeleteComponent } from './component/entities/training-plans/training-plans-delete/training-plans-delete.component';
import { ExerciseDeleteComponent } from './component/entities/exercise/exercise-delete/exercise-delete.component';
import { ClientListComponent } from './component/entities/client/client-list/client-list.component';
import { NutritionistComponent } from './component/entities/nutritionist/nutritionist.component';
import { NutritionistListComponent } from './component/entities/nutritionist/nutritionist-list/nutritionist-list.component';
import { NutritionistInsertComponent } from './component/entities/nutritionist/nutritionist-insert/nutritionist-insert.component';
import { NutritionistDeleteComponent } from './component/entities/nutritionist/nutritionist-delete/nutritionist-delete.component';
import { NutritionistDetailsComponent } from './component/entities/nutritionist/nutritionist-details/nutritionist-details.component';
import { TrainerComponent } from './component/entities/trainer/trainer.component';
import { TrainerDeleteComponent } from './component/entities/trainer/trainer-delete/trainer-delete.component';
import { TrainerInsertComponent } from './component/entities/trainer/trainer-insert/trainer-insert.component';
import { TrainerListComponent } from './component/entities/trainer/trainer-list/trainer-list.component';
import { TrainerDetailsComponent } from './component/entities/trainer/trainer-details/trainer-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RoutineComponent } from './component/entities/routine/routine.component';
import { RoutineListComponent } from './component/entities/routine/routine-list/routine-list.component';
import { RoutineInsertComponent } from './component/entities/routine/routine-insert/routine-insert.component';
import { RoutineDeleteComponent } from './component/entities/routine/routine-delete/routine-delete.component';
import { ToastrModule } from 'ngx-toastr';
import { GymDetailsComponent } from './component/entities/gym/gym-details/gym-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    PanelComponent,
    ClientComponent,
    GymComponent,
    GymListComponent,
    HeaderComponent,
    GymInsertComponent,
    GymUpdateComponent,
    GymDeleteComponent,
    DialogPopupComponent,
    DashboardComponent,
    AuthenticationComponent,
    EntitiesComponent,
    RegisterComponent,
    LoginComponent,
    LandingPageComponent,
    AboutComponent,
    ContactComponent,
    PricingComponent,
    IndexComponent,
    LoginComponent,
    EntitiesComponent,
    NutritionalPlanComponent,
    NutritionalPlanListComponent,
    NutritionalPlanInsertComponent,
    NutritionalPlanDeleteComponent,
    NutritionalPlanInsertComponent,
    ExerciseComponent,
    ExerciseListComponent,
    ExerciseInsertComponent,
    EntitiesComponent,
    NutritionalPlanComponent,
    NutritionalPlanListComponent,
    NutritionalPlanInsertComponent,
    ExerciseComponent,
    ExerciseListComponent,
    ExerciseInsertComponent,
    EntitiesComponent,
    TrainingPlansComponent,
    TrainingPlansListarComponent,
    TrainingPlansInsertarComponent,
    EntitiesComponent,
    FoodsComponent,
    FoodsListComponent,
    FoodsInsertComponent,
    TrainingPlansDeleteComponent,
    ExerciseDeleteComponent,
    ClientListComponent,
    NutritionistComponent,
    NutritionistListComponent,
    NutritionistInsertComponent,
    NutritionistDeleteComponent,
    NutritionistDetailsComponent,
    ClientListComponent,
    TrainerComponent,
    TrainerDeleteComponent,
    TrainerInsertComponent,
    TrainerListComponent,
    TrainerDetailsComponent,
    ClientListComponent,
    RoutineComponent,
    RoutineListComponent,
    RoutineInsertComponent,
    RoutineDeleteComponent,
    GymDetailsComponent
  ],
  imports: [
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    HttpClientModule,
    OverlayModule,
    CdkMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    CommonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDividerModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
