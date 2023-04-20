import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './component/entities/panel/panel.component';
import { ClientsComponent } from './component/entities/clients/clients.component';
import { GymComponent } from './component/entities/gym/gym.component';
import { GymListComponent } from './component/entities/gym/gym-list/gym-list.component';
import { GymInsertComponent } from './component/entities/gym/gym-insert/gym-insert.component';
import { GymUpdateComponent } from './component/entities/gym/gym-update/gym-update.component';
import { GymDeleteComponent } from './component/entities/gym/gym-delete/gym-delete.component';
import { FoodsComponent } from './component/entities/foods/foods.component';

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
  { path: 'foods', component: FoodsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
