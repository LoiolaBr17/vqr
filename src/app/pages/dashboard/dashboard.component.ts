import { Component } from '@angular/core';
import { eventItem } from 'src/interfaces/eventItem';
import { EventsService } from 'src/app/services/events.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  events$!: Observable<eventItem>;

  constructor(
    private eventsService: EventsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.events$ = this.eventsService.getEventSelected();
  }

  assignPassword() {
    this.router.navigate(['/set_password']);
  }
}
