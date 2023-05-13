import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

import { IPass } from 'src/interfaces/IPass';
import { LCST_KEYS } from 'utils/constants';
import { PassService } from './../../services/pass.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  eventoCorrenteId = Number(localStorage.getItem(LCST_KEYS.EVENTO_ATUAL));

  pass: { [key: string]: IPass } = {};
  passFilter: { [key: string]: IPass } = {};
  searchText = '';
  senhas_todas_filtro = false;
  senhas_vendidas_filtro = false;
  senhas_livres_filtro = false;

  constructor(
    private location: Location,
    private eventsService: EventsService,
    private passService: PassService,
    private router: Router
  ) {}

  ngOnInit() {
    const idEvento = Number(localStorage.getItem(LCST_KEYS.EVENTO_ATUAL));

    this.passService.getPasses().subscribe((senhas: any) => {
      this.pass = senhas[idEvento] || {};
      this.passFilter = this.pass;
      this.filtrarSenhas();
    });
  }

  assignPassword() {
    this.router.navigate(['/set_pass']);
  }

  filtrarSenhas() {
    this.senhas_todas_filtro = false;
    this.senhas_vendidas_filtro = false;
    this.senhas_livres_filtro = false;

    if (this.searchText === '') {
      this.passFilter = this.pass;
      return;
    }

    let data: { [key: string]: IPass } = {};

    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if (this.pass[key].nome.toString() === this.searchText) {
        data[key] = this.pass[key];
      }
    }

    this.passFilter = data;
  }

  toggleFilter(valor: any) {
    console.log(valor);
    if (valor === 'senhas_todas_filtro') {
      this.senhas_vendidas_filtro = false;
      this.senhas_livres_filtro = false;
      this.applyFilterPassAll();
    }

    if (valor === 'senhas_vendidas_filtro') {
      this.senhas_todas_filtro = false;
      this.senhas_livres_filtro = false;
      this.applyFilterPassSold();
    }

    if (valor === 'senhas_livres_filtro') {
      this.senhas_todas_filtro = false;
      this.senhas_vendidas_filtro = false;
      this.applyFilterPassFree();
    }
  }

  applyFilterPassAll() {
    this.passFilter = this.pass;
    this.searchText = '';
  }

  applyFilterPassSold() {
    let data: { [key: string]: IPass } = {};

    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if (this.pass[key].disponivel.toString() === 'false') {
        data[key] = this.pass[key];
      }
    }

    this.passFilter = data;
  }

  applyFilterPassFree() {
    let data: { [key: string]: IPass } = {};

    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if (this.pass[key].disponivel.toString() === 'true') {
        data[key] = this.pass[key];
      }
    }

    this.passFilter = data;
  }
}
