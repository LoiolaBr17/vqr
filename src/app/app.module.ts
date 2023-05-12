import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// Serviços
import { AuthService } from './services/auth.service';
import { EventsService } from './services/events.service';

// Telas
import { LoginComponent } from './pages/login/login.component';
import { EventsComponent } from './pages/events/events.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddPasswordComponent } from './pages/add-password/add-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    DashboardComponent,
    AddPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [AuthService, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
