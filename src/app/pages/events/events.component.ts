import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { EventsService } from 'src/app/services/events.service';
import { eventItem } from 'src/interfaces/eventItem';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  isOpen = false;
  events$!: Observable<eventItem[]>;

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.events$ = this.eventsService.getEvents();
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  submitForm(formvalue: any) {
    this.eventsService.setEvent(
      formvalue.value.eventName, 
      formvalue.value.qtdSenhas,
      formvalue.value.valueSenha,
      formvalue.value.boitv
    )
    this.isOpen = false;
  }

  enterProject(event: eventItem) {
    this.eventsService.setEventSelected(event);
    this.router.navigate(['/dashboard']);
  }

}
