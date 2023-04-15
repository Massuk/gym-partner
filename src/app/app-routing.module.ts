import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ClientsComponent } from './component/clients/clients.component';
import { GymComponent } from './component/gym/gym.component';
import { GymListComponent } from './component/gym/gym-list/gym-list.component';
import { GymInsertComponent } from './component/gym/gym-insert/gym-insert.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent },
  {
    path: 'gym',
    component: GymComponent,
    children: [
      {
        path: 'gym-insert',
        component: GymInsertComponent,
      },
    ],
  },
  { path: 'gym-list', component: GymListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
