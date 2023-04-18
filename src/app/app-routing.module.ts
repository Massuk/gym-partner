import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './component/entities/panel/panel.component';
import { ClientsComponent } from './component/entities/clients/clients.component';
import { GymComponent } from './component/entities/gym/gym.component';
import { GymListComponent } from './component/entities/gym/gym-list/gym-list.component';
import { GymInsertComponent } from './component/entities/gym/gym-insert/gym-insert.component';
import { GymUpdateComponent } from './component/entities/gym/gym-update/gym-update.component';
import { GymDeleteComponent } from './component/entities/gym/gym-delete/gym-delete.component';
import { ExerciseComponent } from './component/entities/exercise/exercise.component';
import { ExerciseInsertComponent } from './component/entities/exercise/exercise-insert/exercise-insert.component';

const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: 'panel', component: PanelComponent },
  { path: 'clients', component: ClientsComponent },
  {
    path: 'gym',
    component: GymComponent,
    children: [
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
        component: GymDeleteComponent
      },
    ],
  },
  { path: 'gym-list', component: GymListComponent },

  {
    path:'exercises', component:ExerciseComponent, // es el padre
    children:[
      {
        path:'exercise-insert', component:ExerciseInsertComponent, // es para el hijo insertar
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
