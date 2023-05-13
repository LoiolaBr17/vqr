import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPassComponent } from './pages/add-pass/add-pass.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { LoginComponent } from './pages/login/login.component';
import { ListPassComponent } from './pages/list-pass/list-pass.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'set_pass',
    component: AddPassComponent,
  },
  {
    path: 'list_pass',
    component: ListPassComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
