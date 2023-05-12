import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private initialCredentials: Credentials = { email: '', password: '' };
  private user = new BehaviorSubject<Credentials>(this.initialCredentials);

  constructor() { }

  setUser(email: string, password: string) {
    this.user.next({ email: email, password: password });
    console.log(this.user);
  }
}
