import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }
  
  submitForm(f: any) {
    this.authService.setUser(f.value.name, f.value.password);
    this.router.navigate(['events']);
  }
}
