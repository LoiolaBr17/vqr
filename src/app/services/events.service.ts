import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { eventItem } from 'src/interfaces/eventItem';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private nextId: number = 0;
  private initialCredentials: eventItem[] = [];
  private initialCredential: eventItem = { id: 0, eventName: '', qtdSenhas: 0, valueSenha: 0, boitv: 0 };
  private Events = new BehaviorSubject<eventItem[]>(this.initialCredentials);
  private EventSelected = new BehaviorSubject<eventItem>(this.initialCredential);

  constructor() { }

  setEvent(name: string, qtd: number, value: number, boi_tv: number) {
    const data = { 
      id: this.nextId,
      eventName: name,
      qtdSenhas: qtd,
      valueSenha: value,
      boitv: boi_tv
    }
    this.initialCredentials.push(data);
    this.Events.next(this.initialCredentials);
    this.nextId++;
    console.log(this.Events)
  }

  getEvents() {
    return this.Events.asObservable();
  }

  setEventSelected(event: eventItem) {
    this.EventSelected.next(event);
  }

  getEventSelected() {
    return this.EventSelected.asObservable();
  }
}
