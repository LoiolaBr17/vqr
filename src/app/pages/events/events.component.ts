import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { EventsService } from 'src/app/services/events.service';
import { IEventItem } from 'src/interfaces/IEventItem';
import { LCST_KEYS } from '../../../../utils/constants';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  isOpen = false;
  events: IEventItem[] = [];

  constructor(private eventsService: EventsService, private router: Router) {}

  currencyMask(value: number) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  ngOnInit() {
    localStorage.removeItem(LCST_KEYS.EVENTO_ATUAL);

    const observableEvents: Observable<{ [key: number]: IEventItem }> =
      this.eventsService.getEvents();

    observableEvents.subscribe((data) => {
      this.events = Object.values(data);
    });
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  submitForm(formvalue: any) {
    this.eventsService.setEvent(formvalue.value);
    this.isOpen = false;
  }

  enterProject(eventId: number) {
    this.eventsService.setEventSelected(eventId);
    this.router.navigate(['/dashboard']);
  }
}
