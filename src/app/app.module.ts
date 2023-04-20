import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './component/dashboard/body/body.component';
import { SidenavComponent } from './component//dashboard/sidenav/sidenav.component';
import { PanelComponent } from './component/entities/panel/panel.component';
import { ClientsComponent } from './component/entities/clients/clients.component';
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
import { MatOptionModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule} from '@angular/material/radio'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardActions, MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './component/dashboard/confirmation-dialog/confirmation-dialog.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { EntitiesComponent } from './component/entities/entities.component';
import { FoodsComponent } from './component/entities/foods/foods.component';
import { FoodsListComponent } from './component/entities/foods/foods-list/foods-list.component';
import { FoodsInsertComponent } from './component/entities/foods/foods-insert/foods-insert.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    PanelComponent,
    ClientsComponent,
    GymComponent,
    GymListComponent,
    HeaderComponent,
    GymInsertComponent,
    GymUpdateComponent,
    GymDeleteComponent,
    ConfirmationDialogComponent,
    DashboardComponent,
    AuthenticationComponent,
    EntitiesComponent,
    FoodsComponent,
    FoodsListComponent,
    FoodsInsertComponent
  ],
  imports: [
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
