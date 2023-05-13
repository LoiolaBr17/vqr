import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Serviços
import { AuthService } from './services/auth.service';
import { EventsService } from './services/events.service';
import { PassService } from './services/pass.service';
import { PaymentService } from './services/payment.service';

// Telas
import { AddPassComponent } from './pages/add-pass/add-pass.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { LoginComponent } from './pages/login/login.component';
import { ListPassComponent } from './pages/list-pass/list-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    DashboardComponent,
    AddPassComponent,
    ListPassComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [AuthService, EventsService, PassService, PaymentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
