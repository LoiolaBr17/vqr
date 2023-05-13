import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { IEventItem } from 'src/interfaces/IEventItem';
import { IPass } from 'src/interfaces/IPass';
import { PassService } from './../../services/pass.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  events$!: Observable<IEventItem>;
  senhas: { [key: number]: IPass } = {};

  constructor(
    private eventsService: EventsService,
    private passService: PassService,
    private router: Router
  ) {}

  ngOnInit() {
    this.events$ = this.eventsService.getEventSelected();

    this.passService.getPasses().subscribe((senhas) => {
      this.senhas = senhas as { [key: number]: IPass };
    });
  }

  assignPassword() {
    this.router.navigate(['/set_pass']);
  }

  goToListPassword() {
    this.router.navigate(['/list_pass']);
  }
}
