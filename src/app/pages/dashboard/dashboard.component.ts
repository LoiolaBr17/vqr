import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { IEventItem } from 'src/interfaces/IEventItem';
import { IPass } from 'src/interfaces/IPass';
import { LCST_KEYS } from 'utils/constants';
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

    const idEvento = Number(localStorage.getItem(LCST_KEYS.EVENTO_ATUAL));

    this.passService.getPasses().subscribe((senhas: any) => {
      console.log(senhas[idEvento] || {});
      this.senhas = senhas[idEvento] || {};
    });
  }

  assignPassword() {
    this.router.navigate(['/set_pass']);
  }

  goToListPassword() {
    this.router.navigate(['/list_pass']);
  }
}
