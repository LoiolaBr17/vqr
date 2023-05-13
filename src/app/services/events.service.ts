import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEventItem } from 'src/interfaces/IEventItem';
import { LCST_KEYS } from './../../../utils/constants/index';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private initialCredentials: { [key: number]: IEventItem } = JSON.parse(
    localStorage.getItem(LCST_KEYS.EVENTOS) || '{}'
  );
  private initialCredential: IEventItem = {
    id: 0,
    eventName: '',
    qtdSenhas: 0,
    valueSenha: 0,
    boiTv: 0,
  };

  private Events = new BehaviorSubject<{ [key: number]: IEventItem }>(
    this.initialCredentials
  );

  private EventSelected = new BehaviorSubject<IEventItem>(
    this.initialCredential
  );

  constructor() {}

  setEvent(eventData: any) {
    const data = {
      ...eventData,
      id: new Date().getTime(),
    };

    this.initialCredentials[data.id] = data;

    localStorage.setItem(
      LCST_KEYS.EVENTOS,
      JSON.stringify(this.initialCredentials)
    );

    this.Events.next(this.initialCredentials);
  }

  getEvents() {
    return this.Events.asObservable();
  }

  setEventSelected(eventId: number) {
    localStorage.setItem(LCST_KEYS.EVENTO_ATUAL, String(eventId));
    this.EventSelected.next(this.Events.getValue()[eventId]);
  }

  getEventSelected() {
    return this.EventSelected.asObservable();
  }
}
